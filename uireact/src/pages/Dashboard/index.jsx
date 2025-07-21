import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { Button, Box, Typography, Grid } from '@mui/material';
import StatsPanel from '@/components/tickets/StatsPanel';
import TicketList from '@/components/tickets/TicketList';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // ������ ����� ���������� (��� ��������� ������� ������ �� API)
    const stats = {
        totalTickets: 42,
        newTickets: 12,
        inProgressTickets: 18,
        completedTickets: 12,
    };

    // ������ ����� ������� (��� ��������� ������� ������ �� API)
    const tickets = [
        {
            id: 1,
            ticketNumber: '2024-056-PC',
            description: '���� ��������� �� ����',
            deviceType: '������� ����',
            status: '����',
            createdAt: '2024-05-15',
        },
        {
            id: 2,
            ticketNumber: '2024-057-Laptop',
            description: '���� �������� �����',
            deviceType: '������',
            status: '��� ��������',
            createdAt: '2024-05-14',
        },
        {
            id: 3,
            ticketNumber: '2024-058-Printer',
            description: '������� �� ����',
            deviceType: '�����',
            status: '�����',
            createdAt: '2024-05-13',
        },
    ];

    const handleCreateTicket = () => {
        navigate('/tickets/new');
    };

    return (
        <div className={styles.dashboard}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    ���� ������
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    ������ �ߡ {user?.name}
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h5">������� �������</Typography>
                        <Button variant="contained" onClick={handleCreateTicket}>
                            ����� ����� �����
                        </Button>
                    </Box>
                    <TicketList tickets={tickets} isAdmin={user?.role === 'admin'} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <StatsPanel stats={stats} />
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;