import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            toast.error(error.response.data.message || 'ÍÏË ÎØÃ ãÇ');
        } else {
            toast.error('ÊÚĞÑ ÇáÇÊÕÇá ÈÇáÎÇÏã');
        }
        return Promise.reject(error);
    }
);

export default API;