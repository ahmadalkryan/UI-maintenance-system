import React, { useState } from 'react';

const TicketFilter = ({ onFilter, showDateFilter = false }) => {
    const [ticketNumber, setTicketNumber] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const filters = {};
        if (ticketNumber) filters.ticketNumber = ticketNumber;
        if (status) filters.status = status;
        if (startDate) filters.startDate = startDate;
        if (endDate) filters.endDate = endDate;

        onFilter(filters);
    };

    const handleReset = () => {
        setTicketNumber('');
        setStatus('');
        setStartDate('');
        setEndDate('');
        onFilter({});
    };

    return (
        <form onSubmit={handleSubmit} className="ticket-filter">
            <div className="filter-row">
                <div className="filter-group">
                    <label>��� �������</label>
                    <input
                        type="text"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        placeholder="���� ���� �������..."
                    />
                </div>

                <div className="filter-group">
                    <label>������</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">���� �������</option>
                        <option value="New">�����</option>
                        <option value="Pending">��� ��������</option>
                        <option value="Complete">������</option>
                        <option value="Refund">������</option>
                    </select>
                </div>

                {showDateFilter && (
                    <>
                        <div className="filter-group">
                            <label>�� �����</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div className="filter-group">
                            <label>��� �����</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </>
                )}
            </div>

            <div className="filter-actions">
                <button type="submit" className="filter-btn">�����</button>
                <button type="button" className="reset-btn" onClick={handleReset}>����� �����</button>
            </div>
        </form>
    );
};

export default TicketFilter;