import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { getAssignedTickets, ticketStatistics } from '../../api/tickets';
import TicketList from '../../components/tickets/TicketList';
import StatisticsCard from '../../components/common/StatisticsCard';
import TicketFilter from '../../components/tickets/TicketFilter';

const MaintenanceDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [stats, setStats] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        fromDate: '',
        toDate: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const [ticketsData, statsData] = await Promise.all([
                getAssignedTickets(),
                ticketStatistics()
            ]);

            setTickets(ticketsData);
            setStats(statsData);
        };

        fetchData();
    }, []);

    const handleFilter = async (newFilters) => {
        setFilters(newFilters);
        const filteredTickets = await filterTicket(newFilters);
        setTickets(filteredTickets);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>·ÊÕ…  Õﬂ„ ›—Ìﬁ «·’Ì«‰…</Typography>

            {stats && (
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={3}>
                        <StatisticsCard title="≈Ã„«·Ì «· –«ﬂ—" value={stats.total} color="primary" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatisticsCard title="„› ÊÕ…" value={stats.open} color="info" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatisticsCard title="ﬁÌœ «·„⁄«·Ã…" value={stats.inProgress} color="warning" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatisticsCard title="„€·ﬁ…" value={stats.closed} color="success" />
                    </Grid>
                </Grid>
            )}

            <TicketFilter onFilter={handleFilter} />

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>«· –«ﬂ— «·„⁄Ì‰…</Typography>
            <TicketList tickets={tickets} showActions={true} />
        </Container>
    );
};

export default MaintenanceDashboard;