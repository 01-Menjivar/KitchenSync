import axios from 'axios'
import { API_ROUTES } from "../../../shared/constants/api.js";
import { getAuthConfig } from '../../../shared/utils/apiUtils';

export const createDish = async (dishesArray) => {
    const url = API_ROUTES.BASE_URL + API_ROUTES.DISHES.CREATE;
    const config = getAuthConfig();
    const response = await axios.post(url, dishesArray, config);
    return response.data;
}

export const getAllDishes = async () => {
    const url = API_ROUTES.BASE_URL + API_ROUTES.DISHES.GET_ALL
    const response = await axios.get(url);
    return response.data;
};


export const updateDish = async (dishId, dishData) => {
    const url = API_ROUTES.BASE_URL + API_ROUTES.DISHES.UPDATE(dishId);
    const config = getAuthConfig();
    const response = await axios.put(url, dishData, config);
    return response.data;
}

export const deleteDish = async (dishId) => {
    const url = API_ROUTES.BASE_URL + API_ROUTES.DISHES.DELETE(dishId);
    const config = getAuthConfig();
    const response = await axios.delete(url, config);
    return response.data;
}