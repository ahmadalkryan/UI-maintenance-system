import API from './api';

export const login = async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};