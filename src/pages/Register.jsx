import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Link as MuiLink, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            alert('Registration failed: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper sx={{ p: 4, borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: 'var(--primary)', fontWeight: 700 }}>Join Our Bakery</Typography>
                <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 4 }}>Create an account to start ordering.</Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                helperText="Minimum 6 characters recommended"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                multiline
                                rows={2}
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ bgcolor: 'var(--primary)', py: 1.5, borderRadius: '30px', mt: 4, mb: 3, '&:hover': { bgcolor: 'var(--accent)' } }}
                    >
                        Register
                    </Button>
                </form>

                <Typography variant="body2" align="center">
                    Already have an account? <MuiLink component={Link} to="/login" sx={{ color: 'var(--primary)', fontWeight: 600 }}>Login here</MuiLink>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Register;
