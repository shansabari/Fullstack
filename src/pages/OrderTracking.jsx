import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Card, Grid, Stepper, Step, StepLabel, Divider, CircularProgress } from '@mui/material';
import { Package, Clock, Truck, Home, CheckCircle } from 'lucide-react';
import axios from 'axios';

const OrderTracking = () => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            const res = await axios.get(`/api/orders/${id}`);
            setOrderData(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const steps = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];
    const activeStep = orderData ? steps.indexOf(orderData.order.status) : 0;

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
    if (!orderData) return <Typography align="center" sx={{ py: 10 }}>Order not found.</Typography>;

    const { order, items } = orderData;

    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h4" gutterBottom>Order Tracking</Typography>
            <Typography variant="subtitle1" color="textSecondary" sx={{ mb: 4 }}>Order #{order.id} • Placed on {new Date(order.created_at).toLocaleString()}</Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 4, mb: 4, borderRadius: '20px' }}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>Live Status</Typography>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Card>

                    <Card sx={{ p: 4, borderRadius: '20px' }}>
                        <Typography variant="h6" gutterBottom>Order Items</Typography>
                        {items.map((item, idx) => {
                            const custom = item.customization ? JSON.parse(item.customization) : {};
                            return (
                                <Box key={idx}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <img
                                                src={item.image_url ? `http://localhost:5000/uploads/${item.image_url}` : 'https://via.placeholder.com/60/9d6b53/white?text=Cake'}
                                                width="60"
                                                height="60"
                                                style={{ borderRadius: '8px', objectFit: 'cover' }}
                                                alt={item.name}
                                            />
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.name} x {item.quantity}</Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {custom.flavor} | {custom.size}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Typography variant="subtitle1">₹{item.price * item.quantity}</Typography>
                                    </Box>
                                    {idx < items.length - 1 && <Divider />}
                                </Box>
                            )
                        })}
                        <Divider sx={{ my: 2, borderWidth: '2px' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6">Total Paid</Typography>
                            <Typography variant="h6" color="var(--primary)">₹{order.total_amount}</Typography>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3, mb: 3, borderRadius: '20px', bgcolor: 'var(--secondary)' }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Home size={20} /> Delivery Address
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                            {order.delivery_address}
                        </Typography>
                    </Card>

                    <Card sx={{ p: 3, borderRadius: '20px' }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Clock size={20} /> Scheduled For
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                            {new Date(order.delivery_date).toDateString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            At {order.delivery_time}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default OrderTracking;
