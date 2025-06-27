import { create } from "zustand";
import { getAllOrders, getOrderDishes, updateOrder, getTableByNumber} from "./services/cookServices";

export const useCookStore = create((set, get) => ({
    orders: [],
    isLoadingOrders: false,
    isLoadingDishes: false,
    feedback: null,
    dishes: {},

    getOrders: async () => {
        set({ isLoadingOrders: true });
        try {
            const response = await getAllOrders();
            const ordersArray = Array.isArray(response.data.content) ? response.data.content : [];
            set({ orders: ordersArray });
        } catch (error) {
            set({ feedback: { type: "error", message: "Error al cargar las órdenes" } });
            console.error("Error fetching orders:", error);
        } finally {
            set({ isLoadingOrders: false });
        }
    },

    getDishes: async (orderId) => {
        set({ isLoadingDishes: true });
        try {
            const response = await getOrderDishes(orderId); 
            const dishesArray = Array.isArray(response.data) ? response.data : []; 
            set((state) => ({
                dishes: {
                    ...state.dishes,
                    [orderId]: dishesArray,
                },
            }));
            return dishesArray; 
        } catch (error) {
            set({ feedback: { type: "error", message: "Error al cargar los platillos de la orden" } });
            console.error("Error fetching dishes for order:", error);
            return []; 
        } finally {
            set({ isLoadingDishes: false });
        }
    },

    loadDishes: async () => {
        set({ isLoadingDishes: true });
        try {
            const { orders } = get();

            const dishesResponses = await Promise.all(
                orders.map(async (order) => {
                    try {
                        const response = await getOrderDishes(order.id);
                        const dishesArray = Array.isArray(response.data) ? response.data : [];
                        return { orderId: order.id, dishes: dishesArray };
                    } catch (err) {
                        console.error(`Error fetching dishes for order ${order.id}:`, err);
                        return { orderId: order.id, dishes: [] }; // fallbacks seguros
                    }
                })
            );
            const updatedDishes = dishesResponses.reduce((acc, { orderId, dishes }) => {
                acc[orderId] = dishes;
                return acc;
            }, {});
    
            set({ dishes: updatedDishes });
    
        } catch (error) {
            set({ feedback: { type: "error", message: "Error al cargar los platillos" } });
            console.error("Error loading dishes:", error);
        } finally {
            set({ isLoadingDishes: false });
        }
    },
    
    updateOrderState: async (orderId, newState) => {
        try {
          const state = get();
          const orderToUpdate = state.orders.find((order) => order.id === orderId);
          if (!orderToUpdate) throw new Error("Orden no encontrada");
      
          const tableResponse = await getTableByNumber(orderToUpdate.tableNumber);
          const tableId = tableResponse?.data?.id;
          if (!tableId) throw new Error("No se pudo obtener el ID de la mesa");
      
          const updateData = {
            table: tableId,
            state: newState,
            totalAmount: orderToUpdate.totalAmount,
            paymentMethod: orderToUpdate.paymentMethod,
          };
      
          const {data} = await updateOrder(orderId, updateData);
      
          set((state) => ({
            orders: state.orders.map((order) =>
                order.id === orderId
                  ? {
                      ...order,
                      state: data.state,
                      totalAmount: data.totalAmount,
                      paymentMethod: data.paymentMethod,
                    }
                  : order
              ),              
            feedback: { type: "success", message: "Estado actualizado correctamente" },
          }));
        } catch (error) {
          console.error("Error al actualizar la orden:", error);
          set({ feedback: { type: "error", message: "No se pudo actualizar la orden" } });
        }
      },
      

    clearFeedback: () => set({ feedback: null }),


}));