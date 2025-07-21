import React, { createContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, getCurrentUser } from '@/services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const currentUser = getCurrentUser();
            setUser(currentUser);
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const data = await authLogin(credentials);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return data.user;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};