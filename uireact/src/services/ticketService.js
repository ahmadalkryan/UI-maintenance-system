import API from './api';

export const createTicket = async (ticketData) => {
    const formData = new FormData();

    formData.append('description', ticketData.description);
    formData.append('deviceType', ticketData.deviceType);
    if (ticketData.deviceId) formData.append('deviceId', ticketData.deviceId);

    if (ticketData.attachments) {
        for (let i = 0; i < ticketData.attachments.length; i++) {
            formData.append('attachments', ticketData.attachments[i]);
        }
    }

    const response = await API.post('/tickets', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getTickets = async (isAdmin = false) => {
    const endpoint = isAdmin ? '/tickets' : '/tickets/my';
    const response = await API.get(endpoint);
    return response.data;
};

export const getTicketDetails = async (ticketId) => {
    const response = await API.get(`/tickets/${ticketId}`);
    return response.data;
};

export const updateTicketStatus = async (ticketId, status) => {
    const response = await API.patch(`/tickets/${ticketId}/status`, { status });
    return response.data;
};

export const addTicketNote = async (ticketId, note) => {
    const response = await API.post(`/tickets/${ticketId}/notes`, { content: note });
    return response.data;
};