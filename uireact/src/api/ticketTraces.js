//import api from './apiConfig';

//export const getTicketTraces = async (ticketId) => {
//    const response = await api.get(`/TicketTrace/GetByTicketId?ticketId=${ticketId}`);
//    return response.data;
//};

//export const addTicketTrace = async (traceData) => {
//    const response = await api.post('/TicketTrace/Add', {
//        TicketId: traceData.ticketId,
//        NewStatusId: traceData.statusId,
//        Note: traceData.note,
//    });
//    return response.data;
//};


import api from './apiConfig';

export const getTicketTraces = async (ticketId) => {
    const response = await api.get(`/TicketTrace/GetByTicketId?ticketId=${ticketId}`);
    return response.data;
};

export const addTicketTrace = async (traceData) => {
    const response = await api.post('/TicketTrace/Add', {
        TicketId: traceData.ticketId,
        StatusID: traceData.statusId, // „·«ÕŸ…:  €ÌÌ— «·«”„ ·Ìÿ«»ﬁ «·»«ﬂ ≈‰œ
        Note: traceData.note,
        UserId: traceData.userId // ≈÷«›… Õﬁ· «·„” Œœ„
    });
    return response.data;
};