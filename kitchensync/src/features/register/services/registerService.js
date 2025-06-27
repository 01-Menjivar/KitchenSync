import axios from 'axios';
import { API_ROUTES } from '../../../shared/constants/api';
import { getAuthConfig } from '../../../shared/utils/apiUtils.js';

const baseUrl = `${API_ROUTES.BASE_URL}${API_ROUTES.AUTH.REGISTER}`;

export const register = async (credentials) => {
    const config = getAuthConfig();
    const response = await axios.post(baseUrl, credentials, config);
    return response
}