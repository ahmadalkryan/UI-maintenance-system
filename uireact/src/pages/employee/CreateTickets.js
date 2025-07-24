import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../../api/tickets';
import { getAllDeviceCategories } from '../../api/deviceCategory';
import TicketForm from '../../components/tickets/TicketForm';

const CreateTickets = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllDeviceCategories();
                setCategories(data);
            } catch (err) {
                setError('��� �� ����� ����� �������');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (ticketData) => {
        try {
            setIsLoading(true);
            setError('');

            const response = await createTicket(ticketData);

            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError('��� �� ����� �������: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="loading">���� �������...</div>;
    }

    return (
        <div className="create-ticket-page">
            <h2>����� ����� ����� �����</h2>

            {error && <div className="error-message">{error}</div>}
            {success && (
                <div className="success-message">
                    �� ����� ������� �����! ��� ������ ��� ���� �������...
                </div>
            )}

            <TicketForm
                categories={categories}
                onSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </div>
    );
};

export default CreateTickets;