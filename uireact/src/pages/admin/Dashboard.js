import React, { useState, useEffect } from 'react';
import { getTicketStatistics } from '../../api/tickets';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true);
                const data = await getTicketStatistics();
                setStats(data);
            } catch (err) {
                setError('›‘· ›Ì  Õ„Ì· «·≈Õ’«∆Ì« ');
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const chartData = stats ? {
        labels: ['≈Ã„«·Ì «· –«ﬂ—', 'ÃœÌœ…', 'ﬁÌœ «·„⁄«·Ã…', '„ﬂ „·…', '„—›Ê÷…'],
        datasets: [
            {
                label: '⁄œœ «· –«ﬂ—',
                data: [
                    stats.totalTickets,
                    stats.newTickets || 0,
                    stats.pendingTickets,
                    stats.completeTickets,
                    stats.refundTickets
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
            },
        ],
    } : null;

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '≈Õ’«∆Ì«  «· –«ﬂ—',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    return (
        <div className="dashboard-page">
            <h2>·ÊÕ…  Õﬂ„ «·„”ƒÊ·</h2>

            {error && <div className="error-message">{error}</div>}

            {isLoading ? (
                <div className="loading">Ã«—Ì  Õ„Ì· «·≈Õ’«∆Ì« ...</div>
            ) : stats ? (
                <div className="dashboard-content">
                    <div className="stats-cards">
                        <div className="stat-card total">
                            <h3>≈Ã„«·Ì «· –«ﬂ—</h3>
                            <p>{stats.totalTickets}</p>
                        </div>

                        <div className="stat-card new">
                            <h3>ÃœÌœ…</h3>
                            <p>{stats.newTickets || 0}</p>
                        </div>

                        <div className="stat-card pending">
                            <h3>ﬁÌœ «·„⁄«·Ã…</h3>
                            <p>{stats.pendingTickets}</p>
                        </div>

                        <div className="stat-card completed">
                            <h3>„ﬂ „·…</h3>
                            <p>{stats.completeTickets}</p>
                        </div>

                        <div className="stat-card refund">
                            <h3>„—›Ê÷…</h3>
                            <p>{stats.refundTickets}</p>
                        </div>
                    </div>

                    <div className="chart-container">
                        <Bar data={chartData} options={options} />
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Dashboard;