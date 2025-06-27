import axios from 'axios'
import {API_ROUTES} from "../../../shared/constants/api.js";
import { getAuthConfig } from '../../../shared/utils/apiUtils';

export const createTable = async (tableData) => {
    const url = API_ROUTES.BASE_URL + API_ROUTES.TABLES.CREATE;
    const config = getAuthConfig();
    const response = await axios.post(url, tableData, config);
    return response.data;
}

export const getAllTables = async () => {
    const url = API_ROUTES.BASE_URL + API_ROUTES.TABLES.GET_ALL;
    const config = getAuthConfig();
    const response = await axios.get(url, config);
    return response.data;
}

export const getTableByNumber = async (tableNumber) => {
    const url = API_ROUTES.BASE_URL + API_ROUTES.TABLES.GET_BY_NUMBER(tableNumber);
    const config = getAuthConfig();
    const response = await axios.get(url, config);
    return response.data;
}

export const updateTable = async (tableNumber, updatedTable) => {
    const url = API_ROUTES.BASE_URL + API_ROUTES.TABLES.UPDATE(tableNumber);
    const config = getAuthConfig();
    const response = await axios.put(url, updatedTable, config);
    return response.data;
}

export const deleteTable = async(tableNumber) => {
    const url = API_ROUTES.BASE_URL + API_ROUTES.TABLES.DELETE(tableNumber);
    const config = getAuthConfig();
    const response = await axios.delete(url, config);
    return response.data;
}