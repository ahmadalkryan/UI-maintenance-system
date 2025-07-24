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

                // Ã·» »Ì«‰«  «· –ﬂ—…
                const ticketData = await getTicketById(id);
                setTicket(ticketData);

                // Ã·» ”Ã· «·  »⁄
                const tracesData = await getTicketTraces(id);
                setTraces(tracesData);

                //  ⁄ÌÌ‰ «·Õ«·… «·Õ«·Ì…
                setNewStatus(mapTicketStatus(ticketData.ticketStatusId));
            } catch (err) {
                setError('›‘· ›Ì  Õ„Ì· »Ì«‰«  «· –ﬂ—…');
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

            // ≈÷«›…   »⁄ ÃœÌœ
            await addTicketTrace({
                ticketId: id,
                statusId: mapStatusToValue(newStatus),
                note: note,
                userId: user.userId
            });

            //  ÕœÌÀ Õ«·… «· –ﬂ—…
            await updateTicket({
                id: id,
                ticketStatusId: mapStatusToValue(newStatus)
            });

            setSuccess(' „  ÕœÌÀ Õ«·… «· –ﬂ—… »‰Ã«Õ!');
            setTimeout(() => {
                setSuccess('');
                navigate(`/ticket/${id}`);
            }, 2000);
        } catch (err) {
            setError('›‘· ›Ì  ÕœÌÀ Õ«·… «· –ﬂ—…: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div className="loading">Ã«—Ì  Õ„Ì· »Ì«‰«  «· –ﬂ—…...</div>;
    }

    if (!ticket) {
        return <div className="error-message">·„ Ì „ «·⁄ÀÊ— ⁄·Ï «· –ﬂ—…</div>;
    }

    return (
        <div className="ticket-details-page">
            <h2> ›«’Ì· «· –ﬂ—…: {ticket.ticketNumber}</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="ticket-info">
                <div className="info-row">
                    <span className="label">«·Ê’›:</span>
                    <span className="value">{ticket.description}</span>
                </div>

                <div className="info-row">
                    <span className="label">‰Ê⁄ «·ÃÂ«“:</span>
                    <span className="value">{ticket.deviceCategory?.categoryName}</span>
                </div>

                <div className="info-row">
                    <span className="label">„⁄—› «·ÃÂ«“:</span>
                    <span className="value">{ticket.deviceId || '€Ì— „Õœœ'}</span>
                </div>

                <div className="info-row">
                    <span className="label">«·Õ«·… «·Õ«·Ì…:</span>
                    <span className="value status">{mapTicketStatus(ticket.ticketStatusId)}</span>
                </div>

                <div className="info-row">
                    <span className="label"> «—ÌŒ «·≈‰‘«¡:</span>
                    <span className="value">{new Date(ticket.createdDate).toLocaleString()}</span>
                </div>

                {ticket.attachmentPath && (
                    <div className="info-row">
                        <span className="label">«·„—›ﬁ« :</span>
                        <span className="value">
                            <a
                                href={`https://localhost:7220${ticket.attachmentPath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ⁄—÷ «·„—›ﬁ
                            </a>
                        </span>
                    </div>
                )}
            </div>

            {(isMaintenance || isAdmin) && (
                <div className="update-section">
                    <h3> ÕœÌÀ Õ«·… «· –ﬂ—…</h3>

                    <div className="form-group">
                        <label>«·Õ«·… «·ÃœÌœ…:</label>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            disabled={isLoading}
                        >
                            <option value="New">ÃœÌœ…</option>
                            <option value="Pending">ﬁÌœ «·„⁄«·Ã…</option>
                            <option value="Complete">„ﬂ „·…</option>
                            <option value="Refund">„—›Ê÷…</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>„·«ÕŸ…:</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            disabled={isLoading}
                            placeholder="√œŒ· „·«ÕŸ« ﬂ Â‰«..."
                        />
                    </div>

                    <button
                        onClick={handleStatusChange}
                        disabled={isLoading || !newStatus}
                        className="update-btn"
                    >
                        {isLoading ? 'Ã«—Ì «· ÕœÌÀ...' : ' ÕœÌÀ «·Õ«·…'}
                    </button>
                </div>
            )}

            <div className="ticket-traces">
                <h3>”Ã· «·  »⁄</h3>

                {traces.length === 0 ? (
                    <p>·« ÌÊÃœ ”Ã·   »⁄ ·Â–Â «· –ﬂ—…</p>
                ) : (
                    <div className="traces-list">
                        {traces.map(trace => (
                            <div key={trace.id} className="trace-item">
                                <div className="trace-header">
                                    <span className="status">{mapTicketStatus(trace.newStatusId)}</span>
                                    <span className="date">{new Date(trace.createdDate).toLocaleString()}</span>
                                </div>
                                <div className="trace-note">{trace.note || '·«  ÊÃœ „·«ÕŸ« '}</div>
                                <div className="trace-user">»Ê«”ÿ…: {trace.user?.fullName || '„” Œœ„'}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketDetails;