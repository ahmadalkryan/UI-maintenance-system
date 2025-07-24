import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { login } from '../../api/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(username, password);
            localStorage.setItem('authToken', response.token);

            const userData = await authLogin();

            // ����� �������� ����� ��� ����
            if (userData.role === 'Employee') {
                navigate('/');
            } else if (userData.role === 'Maintenance') {
                navigate('/maintenance');
            } else {
                navigate('/admin');
            }
        } catch (err) {
            setError('��� ����� ������ ������ ������ �� ��������');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>����� ������</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">��� ��������</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">���� ������</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">����� ������</button>
                </form>

                <div className="login-footer">
                    <p>����� ������ �������� ������ LDAP ������ �������</p>
                </div>
            </div>
        </div>
    );
};

export default Login;