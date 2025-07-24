import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getTicketById, updateTicket } from '../../api/tickets';
import { getTicketTraces, addTicketTrace } from '../../api/ticketTraces';
import { mapTicketStatus, mapStatusToValue } from '../../api/tickets';

const TicketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isMaintenance, isAdmin } = useAuth();
    const [ticket, setTicket] = useState(null);
    const [traces, setTraces] = useState([]);
    const [newStatus, setNewStatus] = useState('');
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                setIsLoading(true);

                // ��� ������ �������
                const ticketData = await getTicketById(id);
                setTicket(ticketData);

                // ��� ��� ������
                const tracesData = await getTicketTraces(id);
                setTraces(tracesData);

                // ����� ������ �������
                setNewStatus(mapTicketStatus(ticketData.ticketStatusId));
            } catch (err) {
                setError('��� �� ����� ������ �������');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTicketData();
    }, [id]);

    const handleStatusChange = async () => {
        if (!newStatus) return;

        try {
            setIsLoading(true);
            setError('');

            // ����� ���� ����
            await addTicketTrace({
                ticketId: id,
                statusId: mapStatusToValue(newStatus),
                note: note,
                userId: user.userId
            });

            // ����� ���� �������
            await updateTicket({
                id: id,
                ticketStatusId: mapStatusToValue(newStatus)
            });

            setSuccess('�� ����� ���� ������� �����!');
            setTimeout(() => {
                setSuccess('');
                navigate(`/ticket/${id}`);
            }, 2000);
        } catch (err) {
            setError('��� �� ����� ���� �������: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="loading">���� ����� ������ �������...</div>;
    }

    if (!ticket) {
        return <div className="error-message">�� ��� ������ ��� �������</div>;
    }

    return (
        <div className="ticket-details-page">
            <h2>������ �������: {ticket.ticketNumber}</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="ticket-info">
                <div className="info-row">
                    <span className="label">�����:</span>
                    <span className="value">{ticket.description}</span>
                </div>

                <div className="info-row">
                    <span className="label">��� ������:</span>
                    <span className="value">{ticket.deviceCategory?.categoryName}</span>
                </div>

                <div className="info-row">
                    <span className="label">���� ������:</span>
                    <span className="value">{ticket.deviceId || '��� ����'}</span>
                </div>

                <div className="info-row">
                    <span className="label">������ �������:</span>
                    <span className="value status">{mapTicketStatus(ticket.ticketStatusId)}</span>
                </div>

                <div className="info-row">
                    <span className="label">����� �������:</span>
                    <span className="value">{new Date(ticket.createdDate).toLocaleString()}</span>
                </div>

                {ticket.attachmentPath && (
                    <div className="info-row">
                        <span className="label">��������:</span>
                        <span className="value">
                            <a
                                href={`https://localhost:7220${ticket.attachmentPath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ��� ������
                            </a>
                        </span>
                    </div>
                )}
            </div>

            {(isMaintenance || isAdmin) && (
                <div className="update-section">
                    <h3>����� ���� �������</h3>

                    <div className="form-group">
                        <label>������ �������:</label>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="New">�����</option>
                            <option value="Pending">��� ��������</option>
                            <option value="Complete">������</option>
                            <option value="Refund">������</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>������:</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            disabled={isLoading}
                            placeholder="���� �������� ���..."
                        />
                    </div>

                    <button
                        onClick={handleStatusChange}
                        disabled={isLoading || !newStatus}
                        className="update-btn"
                    >
                        {isLoading ? '���� �������...' : '����� ������'}
                    </button>
                </div>
            )}

            <div className="ticket-traces">
                <h3>��� ������</h3>

                {traces.length === 0 ? (
                    <p>�� ���� ��� ���� ���� �������</p>
                ) : (
                    <div className="traces-list">
                        {traces.map(trace => (
                            <div key={trace.id} className="trace-item">
                                <div className="trace-header">
                                    <span className="status">{mapTicketStatus(trace.newStatusId)}</span>
                                    <span className="date">{new Date(trace.createdDate).toLocaleString()}</span>
                                </div>
                                <div className="trace-note">{trace.note || '�� ���� �������'}</div>
                                <div className="trace-user">������: {trace.user?.fullName || '������'}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketDetails;