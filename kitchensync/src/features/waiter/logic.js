import {
    createOrder,
    getOrdersByWaiter,
    getAllOrders,
    updateOrder,
    deleteOrder,
    getOrderDishes,
    addDishToOrder,
    updateOrderDish,
    removeOrderDish
} from './services/orderService.js';

const handleApiRequest = async (apiCall, successTransform, errorMessage) => {
    try {
        const response = await apiCall();
        return successTransform(response);
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || errorMessage
        };
    }
};

export const handleCreateOrder = async (orderData) => {
    return handleApiRequest(
        () => createOrder(orderData),
        (response) => ({
            success: true,
            data: response.data,
            message: response.message || "Orden creada exitosamente"
        }),
        "Error al crear la orden"
    );
};

export const handleGetOrdersByWaiter = async (waiterId, limit = 1000) => {
    return handleApiRequest(
        () => getOrdersByWaiter(waiterId, limit),
        (response) => ({
            success: true,
            data: response.data || [],
            message: response.message
        }),
        "Error al cargar las órdenes"
    );
};

export const handleGetAllOrders = async () => {
    return handleApiRequest(
        () => getAllOrders(),
        (response) => ({
            success: true,
            data: response.data.content || [],
            message: response.message
        }),
        "Error al cargar todas las órdenes"
    );
};

export const handleUpdateOrder = async (orderId, orderData) => {
    return handleApiRequest(
        () => updateOrder(orderId, orderData),
        (response) => ({
            success: true,
            data: response.data,
            message: response.message || "Orden actualizada correctamente"
        }),
        "Error al actualizar la orden"
    );
};

export const handleDeleteOrder = async (orderId) => {
    return handleApiRequest(
        () => deleteOrder(orderId),
        (response) => {
            return {
                success: true,
                message: response?.message || "Orden eliminada correctamente"
            };
        },
        "Error al eliminar la orden"
    );
};

export const handleGetOrderDishes = async (orderId) => {
    return handleApiRequest(
        () => getOrderDishes(orderId),
        (response) => ({
            success: true,
            data: response.data || [],
            message: response.message
        }),
        "Error al cargar los platillos de la orden"
    );
};

export const handleAddDishToOrder = async (orderDishData) => {
    return handleApiRequest(
        () => addDishToOrder(orderDishData),
        (response) => ({
            success: true,
            data: response.data,
            message: response.message || "Platillo agregado a la orden"
        }),
        "Error al agregar platillo a la orden"
    );
};

export const handleUpdateOrderDish = async (orderDishId, updateData) => {
    return handleApiRequest(
        () => updateOrderDish(orderDishId, updateData),
        (response) => ({
            success: true,
            data: response.data,
            message: response.message || "Platillo actualizado"
        }),
        "Error al actualizar platillo"
    );
};

export const handleRemoveOrderDish = async (orderDishId) => {
    return handleApiRequest(
        () => removeOrderDish(orderDishId),
        (response) => ({
            success: true,
            message: response.message || "Platillo eliminado de la orden"
        }),
        "Error al eliminar platillo de la orden"
    );
};