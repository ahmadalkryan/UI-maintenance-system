


//import api from './apiConfig';

//export const getAllTickets = async () => {
//    const response = await api.get('/Ticket/GetAllTickets');
//    return response.data;
//};

//export const createTicket = async (ticketData) => {
//    const formData = new FormData();
//    formData.append('Description', ticketData.description);
//    formData.append('DeviceCategoryId', ticketData.deviceCategoryId);
//    if (ticketData.attachment) {
//        formData.append('Attachment', ticketData.attachment);
//    }

//    const response = await api.post('/Ticket/InsertTicket', formData, {
//        headers: {
//            'Content-Type': 'multipart/form-data',
//        },
//    });
//    return response.data;
//};

//export const getTicketByNumber = async (ticketNumber) => {
//    const response = await api.get(`/Ticket/GetTicketByNumber?number=${ticketNumber}`);
//    return response.data;
//};






/************* */
//export const getAllTickets = async (page = 1, pageSize = 10) => {
//    const response = await api.get('/Ticket/GetAllTickets', {
//        params: { page, pageSize }
//    });
//    return response.data;
//};
//export const getTicketByNumber = async (number) => {
//    const response = await api.get('/Ticket/GetTicketByNumber', {
//        params: { number }
//    });
//    return response.data;
//};
//export const deleteTicket = async (id) => {
//    const response = await api.delete('/Ticket/DeleteTicket', {
//        params: { id }
//    });
//    return response.data;
//};

//export const updateTicket = async (updateData) => {
//    const response = await api.put('/Ticket/UpdateTicket', updateData);
//    return response.data;
//};

//export const filterTickets = async (filters) => {
//    const response = await api.get('/Ticket/FilterTicket', {
//        params: filters
//    });
//    return response.data;
//};

//export const getTicketStatistics = async () => {
//    const response = await api.get('/Ticket/TicketStatistics');
//    return response.data;
//};

//export const filterTicketsByDate = async (dateFilters) => {
//    const response = await api.get('/Ticket/FilterTicketByDate', {
//        params: dateFilters
//    });
//    return response.data;
//};


import api from './apiConfig';


export const getAllTickets = async () => {
    const response = await api.get('/Ticket/GetAllTickets');
    return response.data;
};

export const getTicketById = async (id) => {
    const response = await api.get('/Ticket/GetTicketById', {
        params: { id }
    });
    return response.data;
};

export const updateTicket = async (updateData) => {
    const response = await api.put('/Ticket/UpdateTicket', updateData);
    return response.data;
};




export const createTicket = async (ticketData) => {
    const formData = new FormData();

    // ÅÖÇİÉ ÇáÍŞæá ÇáÅÌÈÇÑíÉ
    formData.append('Description', ticketData.description);
    formData.append('DeviceCategoryId', ticketData.deviceCategoryId);

    // ÅÖÇİÉ ÇáÍŞæá ÇáÇÎÊíÇÑíÉ
    if (ticketData.deviceId) formData.append('DeviceId', ticketData.deviceId);
    if (ticketData.attachment) formData.append('Attachment', ticketData.attachment);

    const response = await api.post('/Ticket/InsertTicket', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};


export const filterTickets = async (filters) => {
    // ÊÍæíá ÇáÍÇáÉ Åáì ÇáÊÚÏÇÏ ÇáÑŞãí ÅĞÇ ßÇäÊ äÕíÉ
    if (filters._status && typeof filters._status === 'string') {
        const statusMap = {
            'New': 0,
            'Pending': 1,
            'Complete': 2,
            'Refund': 3
        };
        filters._status = statusMap[filters._status];
    }

    // ÊÍæíá ÇáÊÇÑíÎ Åáì ÕíÛÉ ISO ÅĞÇ ßÇä ßÇÆä Date
    if (filters.CreatedDate instanceof Date) {
        filters.CreatedDate = filters.CreatedDate.toISOString();
    }

    const response = await api.get('/Ticket/FilterTicket', {
        params: filters
    });
    return response.data;
};

export const filterTicketsByDate = async (dateFilters) => {
    // ÇáÊÍŞŞ ãä æÌæÏ ÇáÊæÇÑíÎ æÊÍæíáåÇ Åáì ISO
    const params = {};

    if (dateFilters.startDate) {
        params.startDate = dateFilters.startDate instanceof Date
            ? dateFilters.startDate.toISOString()
            : dateFilters.startDate;
    }

    if (dateFilters.endDate) {
        params.endDate = dateFilters.endDate instanceof Date
            ? dateFilters.endDate.toISOString()
            : dateFilters.endDate;
    }

    const response = await api.get('/Ticket/FilterTicketByDate', {
        params
    });
    return response.data;
};
export const getTicketStatistics = async () => {
    const response = await api.get('/Ticket/TicketStatistics');
    return {
        totalTickets: response.data.TotalTickets,
        pendingTickets: response.data.PendingTickets,
        completeTickets: response.data.CompleteTickets,
        refundTickets: response.data.refundTickets
    };
};


export const mapTicketStatus = (status) => {
    const statusMap = {
        0: 'New',
        1: 'Pending',
        2: 'Complete',
        3: 'Refund'
    };
    return statusMap[status] || 'Unknown';
};

export const mapStatusToValue = (status) => {
    const statusMap = {
        'New': 0,
        'Pending': 1,
        'Complete': 2,
        'Refund': 3
    };
    return statusMap[status] || 0;
};