import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { filterTickets } from '../../api/tickets';
import TicketTable from '../../components/tickets/TicketTable';
import TicketFilter from '../../components/tickets/TicketFilter';
import { mapTicketStatus } from '../../api/tickets';

const AssignedTickets = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                setIsLoading(true);
                // Ã·» Ã„Ì⁄ «· –«ﬂ— (√Ê «· –«ﬂ— «·„Œ’’… ··„” Œœ„ «·Õ«·Ì)
                const data = await filterTickets({});

                //  ÕÊÌ· Õ«·… «· –ﬂ—… ≈·Ï ‰’
                const ticketsWithStatus = data.map(ticket => ({
                    ...ticket,
                    statusText: mapTicketStatus(ticket.ticketStatusId)
                }));

                setTickets(ticketsWithStatus);
                setFilteredTickets(ticketsWithStatus);
            } catch (err) {
                setError('›‘· ›Ì  Õ„Ì· «· –«ﬂ—');
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

        if (filters.startDate) {
            result = result.filter(t =>
                new Date(t.createdDate) >= new Date(filters.startDate)
            );
        }

        if (filters.endDate) {
            result = result.filter(t =>
                new Date(t.createdDate) <= new Date(filters.endDate)
            );
        }

        setFilteredTickets(result);
    };

    return (
        <div className="assigned-tickets-page">
            <h2>«· –«ﬂ— «·„Œ’’…</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="ticket-controls">
                <TicketFilter onFilter={handleFilter} showDateFilter={true} />
            </div>

            {isLoading ? (
                <div className="loading">Ã«—Ì  Õ„Ì· «· –«ﬂ—...</div>
            ) : (
                <TicketTable tickets={filteredTickets} showActions={true} />
            )}
        </div>
    );
};

export default AssignedTickets;