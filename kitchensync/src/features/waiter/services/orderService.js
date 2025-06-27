import axios from 'axios';
import { API_ROUTES } from '../../../shared/constants/api.js';
import { getAuthConfig } from '../../../shared/utils/apiUtils.js';

export const createOrder = async (orderData) => {
    const url = `${API_ROUTES.BASE_URL}/kitchen/orders/create`;
    const config = getAuthConfig();
   
    const formattedData = {
        table: orderData.table,
        waiterId: parseInt(orderData.waiterId),
        state: orderData.state || "IN_PROGRESS",
        totalAmount: parseFloat(orderData.totalAmount),
        paymentMethod: orderData.paymentMethod || "CASH",
        orderDishes: orderData.orderDishes
    };
   
    Object.entries(formattedData).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
            throw new Error(`Campo requerido '${key}' está vacío`);
        }
    }); 
   
    const response = await axios.post(url, formattedData, config);
    return response.data;
};

export const getOrdersByWaiter = async (waiterId, limit = 1000) => {
    const url = API_ROUTES.BASE_URL+API_ROUTES.ORDERS.GET_BY_WAITER(waiterId) + `?limit=${limit}`;
    const config = getAuthConfig();
    const response = await axios.get(url, config);
    return response.data;
};

export const getAllOrders = async ()=> {
    const url = API_ROUTES.BASE_URL + API_ROUTES.ORDERS.GET_ALL;
    const config = getAuthConfig();
    const response = await axios.get(url, config);
    return response.data;
}

export const updateOrder = async (orderId, orderData) => {
    const url = `${API_ROUTES.BASE_URL}/kitchen/orders/update?id=${orderId}`;
    const config = getAuthConfig();
   
    const formattedData = {
        ...orderData,
        waiterId: parseInt(orderData.waiterId),
        totalAmount: parseFloat(orderData.totalAmount)
    };
    const response = await axios.put(url, formattedData, config);
    return response.data;
};

export const deleteOrder = async (orderId) => {
    const url = `${API_ROUTES.BASE_URL}/kitchen/orders/delete?id=${orderId}`;
    const config = getAuthConfig(); 
    try {
        const response = await axios.delete(url, config);
        return response.data;
    } catch (error) {
        console.error('[ORDER SERVICE] Error al eliminar orden:', error.response?.data || error.message);
        throw error;
    }
};

export const getOrderDishes = async (orderId) => {
    const url = `${API_ROUTES.BASE_URL}/kitchen/orderDishes/orderId?orderId=${orderId}`;
    const config = getAuthConfig();
    const response = await axios.get(url, config);
    return response.data;
};

export const addDishToOrder = async (orderDishData) => {
    const url = `${API_ROUTES.BASE_URL}/kitchen/orderDishes`;
    const config = getAuthConfig();
   
    const formattedData = {
        orderId: orderDishData.orderId,
        dishId: orderDishData.dishId,
        quantity: parseInt(orderDishData.quantity)
    };
   
    const response = await axios.post(url, formattedData, config);
    return response.data;
};

export const updateOrderDish = async (orderDishId, updateData) => {
    const url = `${API_ROUTES.BASE_URL}/kitchen/orderDishes/${orderDishId}`;
    const config = getAuthConfig();
    const response = await axios.patch(url, updateData, config);
    return response.data;
};

export const removeOrderDish = async (orderDishId) => {
    const url = `${API_ROUTES.BASE_URL}/kitchen/orderDishes/delete?id=${orderDishId}`;
    const config = getAuthConfig();
    const response = await axios.delete(url, config);
    return response.data;
};