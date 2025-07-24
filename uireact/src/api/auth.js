 //import API from './api';

//export const login = async (credentials) => {
//    const response = await API.post('/auth/login', credentials);
//    return response.data;
//};

//export const logout = () => {
//    localStorage.removeItem('token');
//};

//export const getCurrentUser = () => {
//    const user = localStorage.getItem('user');
//    return user ? JSON.parse(user) : null;
//};
//import api from './apiConfig';

//export const login = async (credentials) => {
//    try {
//        const response = await api.post('/Auth/login', credentials);
//        return response.data;
//    } catch (error) {
//        throw error.response.data;
//    }
//};

//export const getUserProfile = async () => {
//    try {
//        const response = await api.get('/Auth/profile');
//        return response.data;
//    } catch (error) {
//        throw error.response.data;
//    }
//};
import api from './apiConfig';

export const login = async (username, password) => {
    const response = await api.post('/Auth/login', {
        username,
        password
    });
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/Auth/logout');
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get('/Auth/profile');
    return response.data;
};