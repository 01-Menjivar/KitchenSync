import axios from "axios";
import { API_ROUTES } from "../../../shared/constants/api";
import { getAuthConfig } from "../../../shared/utils/apiUtils";

export const getAllOrders = async () =>{
    const url = API_ROUTES.BASE_URL+API_ROUTES.ORDERS.GET_ALL
    const config = getAuthConfig()
    const {data} = await axios.get(url,config)
    return data
}

export const getOrderDishes = async (id) =>{
    const url = API_ROUTES.BASE_URL+API_ROUTES.ORDER_DISHES.GET_BY_ORDER_ID(id)
    const config = getAuthConfig()
    const {data} = await axios.get(url,config)
    return data
}

export const updateOrder = async (id,orderData) =>{
    const url = API_ROUTES.BASE_URL + API_ROUTES.ORDERS.UPDATE(id)
    const config = getAuthConfig()
    const {data} = await axios.put(url,orderData,config)
    return data
}

export const getTableByNumber = async (tableNumber) =>{
    const url = API_ROUTES.BASE_URL + API_ROUTES.TABLES.GET_BY_NUMBER(tableNumber)
    const config = getAuthConfig()
    const {data} = await axios.get(url,config)
    return data
}