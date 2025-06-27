import { useState, useEffect, useMemo } from "react";
import { useWaiterStore } from "../store";
import { useTableStore } from "../../tables/store";
import { useAuthStore } from "../../auth/store";
import IconButton from "../../../shared/ui/IconButton";
import { IconRefresh } from '@tabler/icons-react';
import { updateTable } from "../../tables/services/tableService";

import OrderCard from "../../../shared/ui/OrderCard";
import CompletedOrderCard from "../../../shared/ui/CompletedOrderCard";
import LoadingSpinner from "../../../shared/ui/LoadingSpinner";
import OrdersSection from "../../../shared/ui/OrderSection";

const COMPLETION_ORDER_KEY = 'waiter_completion_order';

const MyOrders = () => {
    const myOrders = useWaiterStore(state => state.myOrders);
    const isLoadingOrders = useWaiterStore(state => state.isLoadingOrders);
    const loadMyOrders = useWaiterStore(state => state.loadMyOrders);
    const updateOrder = useWaiterStore(state => state.updateOrder);
    const deleteOrder = useWaiterStore(state => state.deleteOrder);
    const loadOrderDishes = useWaiterStore(state => state.loadOrderDishes);
    const orderDishes = useWaiterStore(state => state.orderDishes);
    const loadingDishes = useWaiterStore(state => state.loadingDishes);
    const tables = useTableStore(state => state.tables);
    const loadTables = useTableStore(state => state.loadTables);
    const waiterId = useAuthStore(state => state.user?.decodedToken?.id);

    const [updatingOrder, setUpdatingOrder] = useState(null);
    const [deletingOrder, setDeletingOrder] = useState(null);
    const [expandedOrders, setExpandedOrders] = useState(new Set());

    const safeMyOrders = useMemo(() => Array.isArray(myOrders) ? myOrders : [], [myOrders]);

    const getCompletionOrder = () => {
        try {
            const stored = localStorage.getItem(COMPLETION_ORDER_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            return [];
        }
    };

    const saveCompletionOrder = (orderIds) => {
        try {
            localStorage.setItem(COMPLETION_ORDER_KEY, JSON.stringify(orderIds));
        } catch (error) {
        }
    };

    const addCompletedOrder = (orderId) => {
        const currentOrder = getCompletionOrder();
        const newOrder = [orderId, ...currentOrder.filter(id => id !== orderId)];
        saveCompletionOrder(newOrder);
    };

    useEffect(() => {
        const cleanCompletionOrder = () => {
            const currentOrder = getCompletionOrder();
            const existingOrderIds = safeMyOrders.map(order => order.id);
            const cleanedOrder = currentOrder.filter(id => existingOrderIds.includes(id));
            
            if (cleanedOrder.length !== currentOrder.length) {
                saveCompletionOrder(cleanedOrder);
            }
        };

        if (safeMyOrders.length > 0) {
            cleanCompletionOrder();
        }
    }, [safeMyOrders]);

    useEffect(() => {
        const activeOrders = safeMyOrders.filter(order => 
            order.state === 'IN_PROGRESS' || order.state === 'READY_TO_SERVE'
        );
        
        activeOrders.forEach(order => {
            if (!orderDishes[order.id]) {
                loadOrderDishes(order.id);
            }
        });
    }, [safeMyOrders, loadOrderDishes, orderDishes]);

    const handleRefreshOrders = () => {
        if (waiterId) {
            loadMyOrders(waiterId);
        }
    };

    const toggleOrderExpansion = (orderId) => {
        const newExpanded = new Set(expandedOrders);
        if (newExpanded.has(orderId)) {
            newExpanded.delete(orderId);
        } else {
            newExpanded.add(orderId);
            if (!orderDishes[orderId]) {
                loadOrderDishes(orderId);
            }
        }
        setExpandedOrders(newExpanded);
    };

    const handleCompleteOrder = async (order) => {
        if (!waiterId) return;
    
        setUpdatingOrder(order.id);
    
        try {
            const table = tables.find(t => t.number === order.tableNumber);
            const result = await updateOrder(order.id, {
                table: table?.id, 
                waiterId: waiterId,
                state: 'COMPLETED',
                totalAmount: order.totalAmount,
                paymentMethod: order.paymentMethod
            });
            
            if (result.success) {
                addCompletedOrder(order.id);
                
                const tableNumber = getTableNumber(order);
                await handleTableUpdate(tableNumber);
                
                setTimeout(() => {
                    loadMyOrders(waiterId);
                }, 500);
            }
        } catch (error) {
        } finally {
            setUpdatingOrder(null);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        setDeletingOrder(orderId);
        
        try {
            const orderToDelete = safeMyOrders.find(order => order.id === orderId);
            const tableNumber = orderToDelete ? getTableNumber(orderToDelete) : null;
            
            const result = await deleteOrder(orderId, waiterId);
            
            if (result.success) {
                await handleTableUpdate(tableNumber);
                await loadMyOrders(waiterId);
            }
        } catch (error) {
        } finally {
            setDeletingOrder(null);
        }
    };

    const getTableNumber = (order) => {
        if (order.table && order.table.number) {
            return order.table.number;
        }
        if (order.tableNumber) {
            return order.tableNumber;
        }
        return 'N/A';
    };

    const handleTableUpdate = async (tableNumber) => {
        if (tableNumber && tableNumber !== 'N/A') {
            try {
                await updateTable(tableNumber, { state: 'AVAILABLE' });
                setTimeout(() => {
                    loadTables();
                }, 500);
            } catch (tableError) {
            }
        }
    };

    const sortCompletedOrders = (orders) => {
        const completionOrder = getCompletionOrder();
        
        return orders.sort((a, b) => {
            const aIndex = completionOrder.indexOf(a.id);
            const bIndex = completionOrder.indexOf(b.id);
            
            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex; 
            }
            
            if (aIndex !== -1 && bIndex === -1) return -1;
            if (aIndex === -1 && bIndex !== -1) return 1;
            
            const aTime = new Date(a.updatedAt || a.createdAt || 0);
            const bTime = new Date(b.updatedAt || b.createdAt || 0);
            return bTime - aTime;
        });
    };

    if (isLoadingOrders) {
        return (
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-12 border-2 border-gray-200">
                <LoadingSpinner />
            </div>
        );
    }

    const activeOrders = safeMyOrders.filter(order => 
        order.state === 'IN_PROGRESS' || order.state === 'READY_TO_SERVE'
    );
    
    const completedOrders = sortCompletedOrders(
        safeMyOrders.filter(order => order.state === 'COMPLETED')
    );

    return (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border-2 border-gray-200">
            {/* Header mejorado */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-100">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                        Mis Órdenes
                    </h2>
                    <p className="text-gray-600 text-lg">
                        {safeMyOrders.length} {safeMyOrders.length === 1 ? 'orden' : 'órdenes'} en total
                    </p>
                </div>
                <IconButton
                    onClick={handleRefreshOrders}
                    disabled={!waiterId || isLoadingOrders}
                    variant="secondary"
                    size="md"
                    isLoading={isLoadingOrders}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 h-12 w-12 rounded-xl"
                >
                    <IconRefresh size={20} className={isLoadingOrders ? "animate-spin" : ""} />
                </IconButton>
            </div>

            {safeMyOrders.length === 0 ? (
                <div className="text-center py-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        No tienes órdenes
                    </h3>
                    <p className="text-gray-600 text-lg">
                        Las órdenes que crees aparecerán aquí
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {activeOrders.length > 0 && (
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200 shadow-lg">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                    Órdenes Activas ({activeOrders.length})
                                </h3>
                            </div>
                            <OrdersSection className="bg-transparent border-0 p-0 shadow-none">
                                <div className="space-y-4">
                                    {activeOrders.map((order) => (
                                        <div key={order.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] border border-orange-200">
                                            <OrderCard
                                                order={order}
                                                isUpdating={updatingOrder === order.id}
                                                isDeleting={deletingOrder === order.id}
                                                onCompleteOrder={handleCompleteOrder}
                                                onDeleteOrder={handleDeleteOrder}
                                                orderDishes={orderDishes}
                                                loadingDishes={loadingDishes}
                                                onToggleExpansion={toggleOrderExpansion}
                                                isExpanded={expandedOrders.has(order.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </OrdersSection>
                        </div>
                    )}

                    {completedOrders.length > 0 && (
                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200 shadow-lg">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    Órdenes Completadas ({completedOrders.length})
                                </h3>
                            </div>
                            <OrdersSection 
                                maxHeight="max-h-96"
                                className="bg-transparent border-0 p-0 shadow-none"
                            >
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {completedOrders.map((order) => {
                                        return (
                                            <div 
                                                key={order.id}
                                                className="bg-white rounded-xl border-2 border-green-400 ring-2 ring-green-300 ring-opacity-50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01]"
                                            >
                                                <CompletedOrderCard 
                                                    order={order}
                                                    className="border-0 shadow-none bg-transparent"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </OrdersSection>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyOrders;