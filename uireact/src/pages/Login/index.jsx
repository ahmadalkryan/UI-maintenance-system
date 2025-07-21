import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import styles from './Login.module.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(credentials);
            navigate('/dashboard');
        } catch (err) {
            setError('«”„ «·„” Œœ„ √Ê ﬂ·„… «·„—Ê— €Ì— ’ÕÌÕ…');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                     ”ÃÌ· «·œŒÊ·
                </Typography>
                {error && (
                    <Typography color="error" align="center" gutterBottom>
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="«”„ «·„” Œœ„"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="ﬂ·„… «·„—Ê—"
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'œŒÊ·'}
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default Login;