import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, TextField, MenuItem, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Card } from '@mui/material';
import { CreditCard, Truck, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        deliveryAddress: '',
        deliveryDate: '',
        deliveryTime: '10:00',
        paymentMethod: 'Online'
    });

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await axios.get('/api/cart');
            if (res.data.length === 0) navigate('/cart');
            setCartItems(res.data);
        } catch (err) { console.error(err); }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = subtotal + 50;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/orders/checkout', {
                ...formData,
                totalAmount: total
            });
            alert('Order placed successfully!');
            navigate(`/order/${res.data.orderId}`);
        } catch (err) {
            alert('Checkout failed: ' + err.response?.data?.message || err.message);
        }
    };

    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>Checkout</Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Card sx={{ p: 4, borderRadius: '20px' }}>
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Truck size={20} /> Delivery Details
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Delivery Address"
                                    multiline
                                    rows={3}
                                    required
                                    value={formData.deliveryAddress}
                                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                                    sx={{ mb: 3 }}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            label="Delivery Date"
                                            InputLabelProps={{ shrink: true }}
                                            required
                                            value={formData.deliveryDate}
                                            onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            select
                                            label="Preferred Time"
                                            value={formData.deliveryTime}
                                            onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                                        >
                                            <MenuItem value="10:00">10:00 AM</MenuItem>
                                            <MenuItem value="12:00">12:00 PM</MenuItem>
                                            <MenuItem value="15:00">03:00 PM</MenuItem>
                                            <MenuItem value="18:00">06:00 PM</MenuItem>
                                            <MenuItem value="20:00">08:00 PM</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CreditCard size={20} /> Payment Method
                            </Typography>
                            <FormControl component="fieldset" sx={{ mt: 2 }}>
                                <RadioGroup
                                    value={formData.paymentMethod}
                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                >
                                    <FormControlLabel value="Online" control={<Radio color="primary" />} label="Online (UPI, Card, Net Banking)" />
                                    <FormControlLabel value="COD" control={<Radio color="primary" />} label="Cash on Delivery (COD)" />
                                </RadioGroup>
                            </FormControl>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Box sx={{ p: 3, bgcolor: 'white', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <Typography variant="h6" gutterBottom>Order Summary</Typography>
                            <Box sx={{ mt: 2 }}>
                                {cartItems.map(item => (
                                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2">{item.name} x {item.quantity}</Typography>
                                        <Typography variant="body2">₹{item.price * item.quantity}</Typography>
                                    </Box>
                                ))}
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography color="textSecondary">Subtotal</Typography>
                                    <Typography>₹{subtotal}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography color="textSecondary">Shipping</Typography>
                                    <Typography>₹50</Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6">Total</Typography>
                                    <Typography variant="h6" color="var(--primary)">₹{total}</Typography>
                                </Box>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ bgcolor: 'var(--primary)', py: 1.5, borderRadius: '30px', '&:hover': { bgcolor: 'var(--accent)' } }}
                                >
                                    Confirm Order
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default Checkout;
