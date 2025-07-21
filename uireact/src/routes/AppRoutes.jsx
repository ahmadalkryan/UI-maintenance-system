//import { Routes, Route } from 'react-router-dom';
//import { ROUTES } from './routes';
//import HomePage from '@/pages/Home';
//import LoginPage from '@/pages/Login';
//import DashboardPage from '@/pages/Dashboard';
//import PrivateRoute from '@/components/auth/PrivateRoute';

//function AppRoutes() {
//    return (
//        <Routes>
//            <Route path={ROUTES.HOME} element={<HomePage />} />
//            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
//            <Route
//                path={ROUTES.DASHBOARD}
//                element={
//                    <PrivateRoute>
//                        <DashboardPage />
//                    </PrivateRoute>
//                }
//            />
//        </Routes>
//    );
//}

//export default AppRoutes;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from './routes';
import LoginPage from '@/pages/Login';
import DashboardPage from '@/pages/Dashboard';
import TicketsPage from '@/pages/Tickets';
import TicketForm from '@/components/tickets/TicketForm';
import TicketDetailsPage from '@/pages/TicketDetails';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to={ROUTES.LOGIN} />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />

            <Route path={ROUTES.DASHBOARD} element={
                <PrivateRoute>
                    <DashboardPage />
                </PrivateRoute>
            } />

            <Route path={ROUTES.TICKETS} element={
                <PrivateRoute>
                    <TicketsPage />
                </PrivateRoute>
            } />

            <Route path={ROUTES.NEW_TICKET} element={
                <PrivateRoute>
                    <TicketForm />
                </PrivateRoute>
            } />

            <Route path={ROUTES.TICKET_DETAILS} element={
                <PrivateRoute>
                    <TicketDetailsPage />
                </PrivateRoute>
            } />

            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} />} />
        </Routes>
    );
};

export default AppRoutes;