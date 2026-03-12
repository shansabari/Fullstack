import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Typography, Box, Button, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ShoppingBag, Heart, MapPin, Settings, Clock, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CustomerDashboard = () => {
    const { user } = useAuth();
    const [recentOrders, setRecentOrders] = useState([]);
    const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0 });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await axios.get('/api/orders/my-orders');
            setRecentOrders(res.data.slice(0, 3));
            setStats({
                totalOrders: res.data.length,
                pendingOrders: res.data.filter(o => o.status !== 'Delivered').length
            });
        } catch (err) { console.error(err); }
    };

    return (
        <Container sx={{ py: 6 }}>
            <Grid container spacing={4}>
                {/* Sidebar / Profile Info */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 4, borderRadius: '20px', textAlign: 'center' }}>
                        <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: 'var(--primary)' }}>
                            <User size={50} />
                        </Avatar>
                        <Typography variant="h5" gutterBottom>{user?.fullName}</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>{user?.email}</Typography>
                        <Divider sx={{ my: 2 }} />
                        <List>
                            <ListItem button component={Link} to="/dashboard">
                                <ListItemIcon><User size={20} /></ListItemIcon>
                                <ListItemText primary="Dashboard" />
                                <ChevronRight size={16} />
                            </ListItem>
                            <ListItem button component={Link} to="/products">
                                <ListItemIcon><ShoppingBag size={20} /></ListItemIcon>
                                <ListItemText primary="Shop" />
                                <ChevronRight size={16} />
                            </ListItem>
                            <ListItem button component={Link} to="/my-orders">
                                <ListItemIcon><Clock size={20} /></ListItemIcon>
                                <ListItemText primary="My Orders" />
                                <ChevronRight size={16} />
                            </ListItem>
                        </List>
                    </Card>
                </Grid>

                {/* Main Content */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" gutterBottom>Welcome back, {user?.fullName ? user.fullName.split(' ')[0] : 'Guest'}!</Typography>

                    {/* Stats */}
                    <Grid container spacing={2} sx={{ mb: 4, mt: 2 }}>
                        <Grid item xs={6} sm={4}>
                            <Card sx={{ p: 3, bgcolor: 'var(--secondary)', textAlign: 'center' }}>
                                <Typography variant="h4" color="var(--primary)">{stats.totalOrders}</Typography>
                                <Typography variant="body2">Total Orders</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Card sx={{ p: 3, bgcolor: 'rgba(210, 105, 30, 0.1)', textAlign: 'center' }}>
                                <Typography variant="h4" color="var(--accent)">{stats.pendingOrders}</Typography>
                                <Typography variant="body2">Active Orders</Typography>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Recent Orders */}
                    <Card sx={{ p: 3, borderRadius: '20px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6">Recent Orders</Typography>
                            <Button component={Link} to="/my-orders" size="small">View All</Button>
                        </Box>
                        {recentOrders.length === 0 ? (
                            <Typography color="textSecondary">No orders yet.</Typography>
                        ) : (
                            recentOrders.map(order => (
                                <Box key={order.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, borderBottom: '1px solid #f0f0f0' }}>
                                    <Box>
                                        <Typography variant="subtitle2">Order #{order.id}</Typography>
                                        <Typography variant="caption" color="textSecondary">{new Date(order.created_at).toLocaleDateString()}</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="subtitle2">₹{order.total_amount}</Typography>
                                        <Typography variant="caption" sx={{ color: order.status === 'Delivered' ? 'success.main' : 'var(--accent)' }}>{order.status}</Typography>
                                    </Box>
                                    <Button component={Link} to={`/order/${order.id}`} size="small">Track</Button>
                                </Box>
                            ))
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CustomerDashboard;
