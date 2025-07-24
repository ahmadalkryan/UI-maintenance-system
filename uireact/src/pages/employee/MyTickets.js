import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { filterTickets } from '../../api/tickets';
import TicketTable from '../../components/tickets/TicketTable';
import TicketFilter from '../../components/tickets/TicketFilter';
import { mapTicketStatus } from '../../api/tickets';

const MyTickets = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setIsLoading(true);
                // ����� �� ����� ��� ���� ����� �������� ������ ���
                const data = await filterTickets({ userId: user.userId });

                // ����� ���� ������� ��� ��
                const ticketsWithStatus = data.map(ticket => ({
                    ...ticket,
                    statusText: mapTicketStatus(ticket.ticketStatusId)
                }));

                setTickets(ticketsWithStatus);
                setFilteredTickets(ticketsWithStatus);
            } catch (err) {
                setError('��� �� ����� �������');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTickets();
    }, [user]);

    const handleFilter = (filters) => {
        let result = [...tickets];

        if (filters.ticketNumber) {
            result = result.filter(t =>
                t.ticketNumber.includes(filters.ticketNumber)
            );
        }

        if (filters.status) {
            result = result.filter(t =>
                t.statusText === filters.status
            );
        }

        setFilteredTickets(result);
    };

    return (
        <div className="my-tickets-page">
            <h2>������</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="ticket-controls">
                <TicketFilter onFilter={handleFilter} />
            </div>

            {isLoading ? (
                <div className="loading">���� ����� �������...</div>
            ) : (
                <TicketTable tickets={filteredTickets} />
            )}
        </div>
    );
};

export default MyTickets;