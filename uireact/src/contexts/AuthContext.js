import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../api/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (credentials) => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
        localStorage.removeItem('authToken');
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const userData = await getCurrentUser();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Failed to fetch user', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const isEmployee = user?.role === 'Employee';
    const isMaintenance = user?.role === 'Maintenance';
    const isAdmin = user?.role === 'Admin';

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout: handleLogout,
            isEmployee,
            isMaintenance,
            isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);