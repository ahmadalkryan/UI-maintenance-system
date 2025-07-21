import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const statusColors = {
    new: 'primary',
    'in-progress': 'warning',
    completed: 'success',
    rejected: 'error',
};

const TicketList = ({ tickets, isAdmin }) => {
    const navigate = useNavigate();

    if (!tickets || tickets.length === 0) {
        return <Typography>�� ���� ����� �����</Typography>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>��� �������</TableCell>
                        <TableCell>��� ������</TableCell>
                        <TableCell>�����</TableCell>
                        <TableCell>������</TableCell>
                        <TableCell>�������</TableCell>
                        {isAdmin && <TableCell>��������</TableCell>}
                        <TableCell>���������</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell>{ticket.ticketNumber}</TableCell>
                            <TableCell>{ticket.deviceType}</TableCell>
                            <TableCell>
                                {ticket.description.length > 50
                                    ? `${ticket.description.substring(0, 50)}...`
                                    : ticket.description}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={ticket.status}
                                    color={statusColors[ticket.status] || 'default'}
                                />
                            </TableCell>
                            <TableCell>
                                {new Date(ticket.createdAt).toLocaleDateString()}
                            </TableCell>
                            {isAdmin && <TableCell>{ticket.userName}</TableCell>}
                            <TableCell>
                                <Button
                                    size="small"
                                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                                >
                                    ������
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TicketList;