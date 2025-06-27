import { create } from "zustand";
import { useTableStore } from "../tables/store.js";
import { useDishStore } from "../dishes/store.js";
import {
    handleCreateOrder,
    handleUpdateOrder,
    handleDeleteOrder,
    handleGetAllOrders,
    handleGetOrderDishes,
    handleAddDishToOrder
} from "./logic.js"

export const useWaiterStore = create((set, get) => ({
    orders: [],
    myOrders: [],
    currentOrder: null,
    isLoadingOrders: false,
    cartItems: [],
    selectedTable: null,
    feedback: null,
    currentView: "orders",
    orderDishes: {},
    loadingDishes: {},
    isLoadingTableOrder: false,

    loadMyOrders: async (waiterId) => {
        if (!waiterId) {
            set({
                feedback: { type: "error", message: "ID de mesero requerido" },
                myOrders: []
            });
            return;
        }

        set({ isLoadingOrders: true, feedback: null });
        const result = await handleGetAllOrders();
        if (result.success) {
            let ordersArray = [];
            
            if (Array.isArray(result.data)) {
                ordersArray = result.data;
            } else if (result.data && result.data.content && Array.isArray(result.data.content)) {
                ordersArray = result.data.content;
            }
            
            set({
                myOrders: ordersArray,
            });
        } else {
            set({
                myOrders: [],
                feedback: { type: "error", message: result.message }
            });
        }

        set({ isLoadingOrders: false });
    },

    loadTableOrder: async (tableNumber) => {
        set({ isLoadingTableOrder: true });
        
        try {
            const { myOrders } = get();
            
            const tableOrder = myOrders.find(order => {
                const orderTableNumber = order.table?.number || order.tableNumber;
                return orderTableNumber === tableNumber && 
                       (order.state === 'IN_PROGRESS' || order.state === 'READY_TO_SERVE');
            });

            if (tableOrder) {
                set({ currentOrder: tableOrder });
                
                await get().loadOrderDishes(tableOrder.id);
            } else {
                set({ 
                    currentOrder: null,
                    feedback: { type: "error", message: "No se encontró orden activa para esta mesa" }
                });
            }
        } catch (error) {
            set({ 
                currentOrder: null,
                feedback: { type: "error", message: "Error al cargar la orden de la mesa" }
            });
        } finally {
            set({ isLoadingTableOrder: false });
        }
    },

    getDishPrice: (dishId) => {
        try {
            const dishStore = useDishStore.getState();
            const dish = dishStore.dishes.find(d => d.id === dishId);
            return dish?.price || 0;
        } catch (error) {
            return 0;
        }
    },

    setCartFromOrder: (order) => {
        const { orderDishes } = get();
        const dishes = orderDishes[order.id] || [];
        
        const cartItems = dishes.map(orderDish => {
            const price = get().getDishPrice(orderDish.dishId);
            
            return {
                dish: {
                    id: orderDish.dishId,
                    name: orderDish.name || 'Platillo sin nombre',
                    price: price,
                    description: orderDish.description || '',
                    category: orderDish.category || '',
                    imageUrl: orderDish.imageUrl || ''
                },
                quantity: orderDish.quantity,
                isNew: false,
                orderDishId: orderDish.id
            };
        });

        set({ cartItems });
    },

    addOrderDishToOrder: async (orderDishData) => {
        try {
            const result = await handleAddDishToOrder(orderDishData);
            
            if (result.success) {
                await get().loadOrderDishes(orderDishData.orderId);

                const { currentOrder } = get();
                if (currentOrder && currentOrder.id === orderDishData.orderId) {
                    get().setCartFromOrder(currentOrder);
                }
            }
            
            return result;
        } catch (error) {
            return { success: false, message: 'Error al agregar platillo a la orden' };
        }
    },

    loadOrderDishes: async (orderId) => {
        const { loadingDishes } = get();
        if (loadingDishes[orderId]) {
            return;
        }

        set({
            loadingDishes: { ...loadingDishes, [orderId]: true }
        });

        try {
            const result = await handleGetOrderDishes(orderId);
            
            if (result.success) {
                const { orderDishes } = get();
                set({
                    orderDishes: {
                        ...orderDishes,
                        [orderId]: result.data || []
                    }
                });
            } else {
                const { orderDishes } = get();
                set({
                    orderDishes: {
                        ...orderDishes,
                        [orderId]: []
                    }
                });
            }
        } catch (error) {
            const { orderDishes } = get();
            set({
                orderDishes: {
                    ...orderDishes,
                    [orderId]: []
                }
            });
        } finally {
            const { loadingDishes } = get();
            set({
                loadingDishes: { ...loadingDishes, [orderId]: false }
            });
        }
    },

    createOrder: async (orderData) => {
        const result = await handleCreateOrder(orderData);

        if (result.success) {
            set({
                cartItems: [],
                currentOrder: result.data
            });
            
            if (orderData.waiterId) {
                await get().loadMyOrders(orderData.waiterId);
            }

            setTimeout(async () => {
                const tableStore = useTableStore.getState();
                await tableStore.loadTables();
            }, 1000);
        }

        return result;
    },

    updateOrder: async (orderId, orderData) => {
        const result = await handleUpdateOrder(orderId, orderData);

        if (result.success) {
            const { currentOrder } = get();
            if (currentOrder && currentOrder.id === orderId) {
                set({
                    currentOrder: {
                        ...currentOrder,
                        ...orderData,
                        id: orderId
                    }
                });
            }
            
            if (orderData.waiterId) {
                await get().loadMyOrders(orderData.waiterId);
            }

            if (orderData.state === 'COMPLETED') {
                setTimeout(async () => {
                    const tableStore = useTableStore.getState();
                    await tableStore.loadTables();
                }, 1000);
            }
        }

        return result;
    },

    deleteOrder: async (orderId, waiterId = null) => {
        const result = await handleDeleteOrder(orderId);

        if (result.success) {
            
            if (waiterId) {
                await get().loadMyOrders(waiterId);
            }

            const { orderDishes } = get();
            const newOrderDishes = { ...orderDishes };
            delete newOrderDishes[orderId];
            set({ orderDishes: newOrderDishes });

            const { currentOrder } = get();
            if (currentOrder && currentOrder.id === orderId) {
                set({ currentOrder: null, cartItems: [] });
            }

            setTimeout(async () => {
                const tableStore = useTableStore.getState();
                await tableStore.loadTables();
            }, 1000);
        }

        return result;
    },

    addToCart: (dish, quantity = 1) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(item => item.dish.id === dish.id);

        let newCartItems;
        if (existingItem) {
            newCartItems = cartItems.map(item =>
                item.dish.id === dish.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {

            const { currentOrder } = get();
            newCartItems = [...cartItems, { 
                dish, 
                quantity, 
                isNew: currentOrder ? true : false 
            }];
        }
        
        set({ cartItems: newCartItems });
    },

    removeFromCart: (dishId) => {
        const { cartItems } = get();
        const newCartItems = cartItems.filter(item => item.dish.id !== dishId);
        set({ cartItems: newCartItems });
    },

    updateCartItemQuantity: (dishId, quantity) => {
        if (quantity <= 0) {
            get().removeFromCart(dishId);
            return;
        }
        
        const { cartItems } = get();
        const newCartItems = cartItems.map(item =>
            item.dish.id === dishId ? { ...item, quantity } : item
        );
        set({ cartItems: newCartItems });
    },

    clearCart: () => set({ cartItems: [] }),
    setSelectedTable: (table) => set({ selectedTable: table }),
    clearSelectedTable: () => set({ selectedTable: null }),
    setCurrentOrder: (order) => set({ currentOrder: order }),
    setCurrentView: (view) => set({ currentView: view }),
    clearCurrentOrder: () => set({ currentOrder: null, cartItems: [] }),
    setFeedback: (feedback) => set({ feedback }),
    clearFeedback: () => set({ feedback: null }),

    getOrderTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => {
            return total + (item.dish.price * item.quantity);
        }, 0);
    }
}));