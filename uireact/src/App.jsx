import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/auth/Login';
import CreateTickets from './pages/employee/CreateTickets';
import MyTickets from './pages/employee/MyTickets';
import AssignedTickets from './pages/maintenance/AssignedTickets';
import TicketDetails from './pages/maintenance/TicketDetails';
import AllTickets from './pages/admin/AllTickets';
import Dashboard from './pages/admin/Dashboard';
import Layout from './components/layout/Layout';

const PrivateRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route index element={
                    <PrivateRoute roles={['Employee']}>
                        <MyTickets />
                    </PrivateRoute>
                } />
                <Route path="create-ticket" element={
                    <PrivateRoute roles={['Employee']}>
                        <CreateTickets />
                    </PrivateRoute>
                } />
                <Route path="ticket/:id" element={
                    <PrivateRoute roles={['Employee', 'Maintenance', 'Admin']}>
                        <TicketDetails />
                    </PrivateRoute>
                } />
                <Route path="maintenance" element={
                    <PrivateRoute roles={['Maintenance', 'Admin']}>
                        <AssignedTickets />
                    </PrivateRoute>
                } />
                <Route path="admin" element={
                    <PrivateRoute roles={['Admin']}>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="admin/all-tickets" element={
                    <PrivateRoute roles={['Admin']}>
                        <AllTickets />
                    </PrivateRoute>
                } />
            </Route>
        </Routes>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
}

export default App;
























//export default App
//import React from 'react';
//import AppRoutes from '@/routes/AppRoutes';
//import Header from '@/components/layout/Header';
//import Footer from '@/components/layout/Footer';
//import { ToastContainer } from 'react-toastify';
//import { useTheme } from '@/contexts/ThemeContext';

//function App() {
//    const { theme } = useTheme();

//    return (
//        <div className={`app ${theme}`}>
//            <Header />
//            <main className="container">
//                <AppRoutes />
//            </main>
//            <Footer />
//            <ToastContainer position="top-right" rtl={true} />
//        </div>
//    );
//}

//export default App;
//import React from 'react';
//import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { AuthProvider, useAuth } from './contexts/AuthContext';
//import DashboardLayout from './components/layout/DashboardLayout';
//import Login from './pages/auth/Login';

//// ’›Õ«  «·„ÊŸ›
//import EmployeeDashboard from './pages/employee/Dashboard';
//import CreateTicket from './pages/employee/CreateTicket';
//import MyTickets from './pages/employee/employeeDashboard';

//// ’›Õ«  «·’Ì«‰…
//import MaintenanceDashboard from './pages/maintenance/Dashboard';
//import TicketDetail from './pages/maintenance/TicketDetail';

//// ’›Õ«  «·„œÌ—
//import AdminDashboard from './pages/admin/Dashboard';

//const PrivateRoute = ({ children, requiredRole }) => {
//    const { user } = useAuth();

//    if (!user) return <Navigate to="/login" />;

//    if (requiredRole && user.role !== requiredRole) {
//        return <Navigate to="/not-authorized" />;
//    }

//    return <DashboardLayout>{children}</DashboardLayout>;
//};

//const AppRoutes = () => {
//    return (
//        <Routes>
//            <Route path="/login" element={<Login />} />

//            {/* „”«—«  «·„ÊŸ› */}
//            <Route path="/employee" element={
//                <PrivateRoute requiredRole="employee">
//                    <EmployeeDashboard />
//                </PrivateRoute>
//            } />
//            <Route path="/employee/create" element={
//                <PrivateRoute requiredRole="employee">
//                    <CreateTicket />
//                </PrivateRoute>
//            } />
//            <Route path="/employee/tickets" element={
//                <PrivateRoute requiredRole="employee">
//                    <MyTickets />
//                </PrivateRoute>
//            } />

//            {/* „”«—«  ›—Ìﬁ «·’Ì«‰… */}
//            <Route path="/maintenance" element={
//                <PrivateRoute requiredRole="maintenance">
//                    <MaintenanceDashboard />
//                </PrivateRoute>
//            } />
//            <Route path="/maintenance/ticket/:ticketNumber" element={
//                <PrivateRoute requiredRole="maintenance">
//                    <TicketDetail />
//                </PrivateRoute>
//            } />

//            {/* „”«—«  «·„œÌ— */}
//            <Route path="/admin" element={
//                <PrivateRoute requiredRole="admin">
//                    <AdminDashboard />
//                </PrivateRoute>
//            } />

//            <Route path="*" element={<Navigate to="/login" />} />
//        </Routes>
//    );
//};

//function App() {
//    return (
//        <AuthProvider>
//            <Router>
//                <AppRoutes />
//            </Router>
//        </AuthProvider>
//    );
//}

//export default App;