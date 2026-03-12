import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            alert('Login failed: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <Container maxWidth="xs" sx={{ py: 10 }}>
            <Paper sx={{ p: 4, borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: 'var(--primary)', fontWeight: 700 }}>Welcome Back</Typography>
                <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 4 }}>Login to your account to order delicious bakes.</Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 4 }}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ bgcolor: 'var(--primary)', py: 1.5, borderRadius: '30px', mb: 3, '&:hover': { bgcolor: 'var(--accent)' } }}
                    >
                        Login
                    </Button>
                </form>

                <Typography variant="body2" align="center">
                    Don't have an account? <MuiLink component={Link} to="/register" sx={{ color: 'var(--primary)', fontWeight: 600 }}>Register here</MuiLink>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;
