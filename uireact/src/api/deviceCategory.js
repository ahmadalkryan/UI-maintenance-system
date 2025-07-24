//import api from './apiConfig';

//export const getAllDeviceCategories = async () => {
//    const response = await api.get('/DeviceCategory/GetAll');
//    return response.data;
//};

//export const getCategoryById = async (id) => {
//    const response = await api.get(`/DeviceCategory/GetById?id=${id}`);
//    return response.data;
//};

import api from './apiConfig';

export const getAllDeviceCategories = async () => {
    const response = await api.get('/DeviceCategory/GetAll');
    return response.data;
};

export const getCategoryById = async (id) => {
    const response = await api.get(`/DeviceCategory/GetById?id=${id}`);
    return response.data;
};