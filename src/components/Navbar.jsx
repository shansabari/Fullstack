import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, LogOut, Search, Menu } from 'lucide-react';
import { Badge, IconButton, Box, Typography, Button } from '@mui/material';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <Box sx={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 4,
            bgcolor: 'white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <Typography variant="h5" component={Link} to="/" sx={{
                fontFamily: 'Playfair Display',
                fontWeight: 700,
                color: 'var(--primary)',
                textDecoration: 'none'
            }}>
                HomeMade Bakes
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <Link to="/products" style={{ fontWeight: 500 }}>Shop</Link>
                {user && user.role === 'customer' && (
                    <>
                        <Link to="/dashboard" style={{ fontWeight: 500, color: 'var(--accent)' }}>Dashboard</Link>
                        <Link to="/my-orders" style={{ fontWeight: 500 }}>Orders</Link>
                    </>
                )}
                {user?.role === 'admin' && <Link to="/admin" style={{ fontWeight: 500, color: 'var(--accent)' }}>Admin Dashboard</Link>}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton component={Link} to="/cart">
                    <Badge badgeContent={0} color="primary">
                        <ShoppingCart size={22} />
                    </Badge>
                </IconButton>

                {user ? (
                    <>
                        <Button
                            component={Link}
                            to={user.role === 'admin' ? '/admin' : '/dashboard'}
                            startIcon={<User size={18} />}
                            sx={{ color: 'var(--text-dark)', textTransform: 'none' }}
                        >
                            {user?.fullName ? user.fullName.split(' ')[0] : 'Account'}
                        </Button>
                        <IconButton onClick={logout}>
                            <LogOut size={20} />
                        </IconButton>
                    </>
                ) : (
                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        sx={{
                            bgcolor: 'var(--primary)',
                            borderRadius: '25px',
                            textTransform: 'none',
                            '&:hover': { bgcolor: 'var(--accent)' }
                        }}
                    >
                        Login
                    </Button>
                )}
            </Box>
        </Box >
    );
};

export default Navbar;
