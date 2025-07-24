import React from 'react';
import { Link } from 'react-router-dom';

const TicketTable = ({ tickets, showActions = false }) => {
    if (tickets.length === 0) {
        return <div className="no-tickets">·«  ÊÃœ  –«ﬂ— ·⁄—÷Â«</div>;
    }

    return (
        <div className="ticket-table-container">
            <table className="ticket-table">
                <thead>
                    <tr>
                        <th>—ﬁ„ «· –ﬂ—…</th>
                        <th>«·Ê’›</th>
                        <th>‰Ê⁄ «·ÃÂ«“</th>
                        <th>«·Õ«·…</th>
                        <th> «—ÌŒ «·≈‰‘«¡</th>
                        {showActions && <th>«·≈Ã—«¡« </th>}
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td className="ticket-number">{ticket.ticketNumber}</td>
                            <td className="ticket-description">
                                {ticket.description.length > 50
                                    ? `${ticket.description.substring(0, 50)}...`
                                    : ticket.description}
                            </td>
                            <td className="device-category">
                                {ticket.deviceCategory?.categoryName || '€Ì— „Õœœ'}
                            </td>
                            <td className="ticket-status">
                                <span className={`status-badge ${ticket.statusText.toLowerCase()}`}>
                                    {ticket.statusText}
                                </span>
                            </td>
                            <td className="created-date">
                                {new Date(ticket.createdDate).toLocaleDateString()}
                            </td>
                            {showActions && (
                                <td className="actions">
                                    <Link to={`/ticket/${ticket.id}`} className="view-btn">
                                        ⁄—÷ «· ›«’Ì·
                                    </Link>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TicketTable;