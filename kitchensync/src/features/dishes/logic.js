import {
    getAllDishes,
    updateDish,
} from "./services/dishesService";

export const handleToggleDishAvailability = async (dishId, isAvailable) => {
    try {
        const dishesResponse = await getAllDishes();
        const dishes = dishesResponse.data;
        const dish = dishes.find(d => d.id === dishId);

        if (!dish) {
            return { success: false, message: "Platillo no encontrado" };
        }

        const updatedDishData = {
            ...dish,
            isAvailable
        };

        await updateDish(dishId, updatedDishData);
        return {
            success: true,
            message: `Platillo ${isAvailable ? 'habilitado' : 'deshabilitado'} correctamente`
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: `Error al ${isAvailable ? 'habilitar' : 'deshabilitar'} el platillo`
        };
    }
};