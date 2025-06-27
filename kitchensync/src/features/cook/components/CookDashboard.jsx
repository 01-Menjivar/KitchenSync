import { useCallback, useEffect, useState } from "react";
import Layout from "../../../shared/ui/Layout";
import { useCookStore } from "../store";
import { IconRefresh, IconToolsKitchen, IconBowlSpoon } from '@tabler/icons-react';
import CookStatsPanel from './CookStatsPanel';
import CookOrderCard from './CookOrderCard';

const styles = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const CookDashboard = () => {
    const getOrders = useCookStore(state => state.getOrders);
    const loadDishes = useCookStore(state => state.loadDishes);
    const updateOrderState = useCookStore(state => state.updateOrderState); 
    const orders = useCookStore(state => state.orders);
    const dishes = useCookStore(state => state.dishes);

    const [visibleOrders, setVisibleOrders] = useState({});
    const [orderFilter, setOrderFilter] = useState("ALL");
    const [completionOrder, setCompletionOrder] = useState(() => {
        const savedOrder = localStorage.getItem('cookCompletionOrder');
        return savedOrder ? JSON.parse(savedOrder) : [];
    });

    const fetchData = useCallback(async () => {
        await getOrders();
        await loadDishes();
    }, [getOrders, loadDishes]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const currentCompletedIds = orders.filter(order => order.state === "COMPLETED").map(order => order.id);
        const previousCompletedIds = completionOrder;
        
        const newlyCompleted = currentCompletedIds.filter(id => !previousCompletedIds.includes(id));
        
        if (newlyCompleted.length > 0) {
            const newOrder = [...newlyCompleted, ...completionOrder];
            setCompletionOrder(newOrder);
            localStorage.setItem('cookCompletionOrder', JSON.stringify(newOrder));
        }
    }, [orders, completionOrder]);

    const getFilteredOrders = () => {
        let filteredOrders = orderFilter === "ALL" ? orders : orders.filter((order) => order.state === orderFilter);
        
        return filteredOrders.sort((a, b) => {
            const statePriority = {
                "IN_PROGRESS": 1,
                "READY_TO_SERVE": 2,
                "COMPLETED": 3
            };
            
            const aPriority = statePriority[a.state] || 4;
            const bPriority = statePriority[b.state] || 4;
            
            if (aPriority !== bPriority) {
                return aPriority - bPriority;
            }
            
            if (a.state === "COMPLETED" && b.state === "COMPLETED") {
                const aIndex = completionOrder.indexOf(a.id);
                const bIndex = completionOrder.indexOf(b.id);
                
                if (aIndex !== -1 && bIndex !== -1) {
                    return aIndex - bIndex; 
                }
                if (aIndex !== -1 && bIndex === -1) return -1;
                if (bIndex !== -1 && aIndex === -1) return 1;
                return b.id > a.id ? 1 : -1;
            }
            
            return 0;
        });
    };

    const getStateColors = (state) => {
        switch (state) {
            case "IN_PROGRESS":
                return {
                    bg: "bg-orange-50",
                    border: "border-orange-200",
                    badge: "bg-orange-100 text-orange-800",
                    button: "bg-orange-500 hover:bg-orange-600"
                };
            case "READY_TO_SERVE":
                return {
                    bg: "bg-blue-50",
                    border: "border-blue-200", 
                    badge: "bg-blue-100 text-blue-800",
                    button: "bg-blue-500 hover:bg-blue-600"
                };
            case "COMPLETED":
                return {
                    bg: "bg-green-50",
                    border: "border-green-200",
                    badge: "bg-green-100 text-green-800",
                    button: "bg-green-500 hover:bg-green-600"
                };
            default:
                return {
                    bg: "bg-gray-50",
                    border: "border-gray-200",
                    badge: "bg-gray-100 text-gray-800",
                    button: "bg-gray-500 hover:bg-gray-600"
                };
        }
    };

    const getStateText = (state) => {
        switch (state) {
            case "IN_PROGRESS":
                return "En Progreso";
            case "READY_TO_SERVE":
                return "Listo para Servir";
            case "COMPLETED":
                return "Completado";
            default:
                return state;
        }
    };

    const getPaymentMethodText = (paymentMethod) => {
        switch (paymentMethod) {
            case "CASH":
                return "Efectivo";
            case "CREDIT_CARD":
                return "Tarjeta de Crédito";
            case "DEBIT_CARD":
                return "Tarjeta de Débito";
            case "MOBILE_PAYMENT":
                return "Pago Móvil";
            case "BANK_TRANSFER":
                return "Transferencia Bancaria";
            case "OTHER":
                return "Otro";
            default:
                return paymentMethod;
        }
    };

    const handleUpdateOrderState = async (orderId, newState) => {
        if (newState === "COMPLETED") {
            const newOrder = [orderId, ...completionOrder.filter(id => id !== orderId)];
            setCompletionOrder(newOrder);
            localStorage.setItem('cookCompletionOrder', JSON.stringify(newOrder));
        }
        
        await updateOrderState(orderId, newState);
    };

    return (
        <Layout>
            <style>{styles}</style>
            <div>
                <div className="bg-gradient-to-r from-white via-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-4 rounded-2xl shadow-lg">
                                <IconToolsKitchen stroke={2} className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                                    Dashboard del Cocinero
                                </h1>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <button
                                onClick={fetchData}
                                className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
                            >
                                <IconRefresh stroke={2} className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                Refrescar Datos
                            </button>
                        </div>
                    </div>
                </div>

                <CookStatsPanel 
                    orders={orders}
                    orderFilter={orderFilter}
                    setOrderFilter={setOrderFilter}
                />

                <div className="space-y-6">
                    {getFilteredOrders().length > 0 ? (
                        getFilteredOrders().map((order) => (
                            <CookOrderCard
                                key={order.id}
                                order={order}
                                dishes={dishes}
                                handleUpdateOrderState={handleUpdateOrderState}
                                getStateColors={getStateColors}
                                getStateText={getStateText}
                                getPaymentMethodText={getPaymentMethodText}
                            />
                        ))
                    ) : (
                        <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
                            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <IconBowlSpoon stroke={2} className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No hay órdenes para cocinar</h3>
                            <p className="text-gray-500">Las nuevas órdenes aparecerán aquí </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CookDashboard;