import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Chip, Button, Grid, CircularProgress } from '@mui/material';
import { Clock, CheckCircle, Truck, Package, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('/api/orders/my-orders');
            setOrders(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Order Placed': return <Package size={18} />;
            case 'Preparing': return <Clock size={18} />;
            case 'Out for Delivery': return <Truck size={18} />;
            case 'Delivered': return <CheckCircle size={18} />;
            default: return <Package size={18} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Order Placed': return 'primary';
            case 'Preparing': return 'warning';
            case 'Out for Delivery': return 'info';
            case 'Delivered': return 'success';
            default: return 'default';
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>My Orders</Typography>

            {orders.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h6">You haven't placed any orders yet.</Typography>
                    <Button component={Link} to="/products" variant="outlined" sx={{ mt: 2 }}>Start Browsing</Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {orders.map(order => (
                        <Grid item xs={12} key={order.id}>
                            <Card sx={{ p: 3, borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                <Box>
                                    <Typography variant="subtitle2" color="textSecondary">Order #{order.id}</Typography>
                                    <Typography variant="h6">₹{order.total_amount}</Typography>
                                    <Typography variant="caption" color="textSecondary">{new Date(order.created_at).toLocaleDateString()}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Chip
                                        icon={getStatusIcon(order.status)}
                                        label={order.status}
                                        color={getStatusColor(order.status)}
                                        variant="outlined"
                                    />
                                    <Button
                                        component={Link}
                                        to={`/order/${order.id}`}
                                        endIcon={<ChevronRight />}
                                        sx={{ textTransform: 'none' }}
                                    >
                                        Track Order
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default OrderHistory;
