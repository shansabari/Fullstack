import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Card, Divider, IconButton, TextField, CircularProgress } from '@mui/material';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await axios.get('/api/cart');
            setCartItems(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleUpdateQuantity = async (id, newQty) => {
        if (newQty < 1) return;
        try {
            await axios.put(`/api/cart/${id}`, { quantity: newQty });
            fetchCart();
        } catch (err) { console.error(err); }
    };

    const handleRemove = async (id) => {
        try {
            await axios.delete(`/api/cart/${id}`);
            fetchCart();
        } catch (err) { console.error(err); }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + shipping;

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;

    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <ShoppingBag /> Your Cart
            </Typography>

            {cartItems.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h6" gutterBottom>Your cart is empty!</Typography>
                    <Button component={Link} to="/products" variant="contained" sx={{ bgcolor: 'var(--primary)', mt: 2 }}>
                        Go Shopping
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        {cartItems.map((item) => {
                            const custom = item.customization ? JSON.parse(item.customization) : {};
                            return (
                                <Card key={item.id} sx={{ p: 2, mb: 2, borderRadius: '15px', position: 'relative' }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={3}>
                                            <img
                                                src={item.image_url ? `http://localhost:5000/uploads/${item.image_url}` : 'https://via.placeholder.com/150'}
                                                alt={item.name}
                                                style={{ width: '100%', borderRadius: '10px' }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6">{item.name}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Flavor: {custom.flavor || 'Default'} | Size: {custom.size || 'N/A'}
                                            </Typography>
                                            {custom.message && (
                                                <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block', mt: 1 }}>
                                                    " {custom.message} "
                                                </Typography>
                                            )}
                                            <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 700 }}>₹{item.price}</Typography>
                                        </Grid>
                                        <Grid item xs={3} sx={{ textAlign: 'right' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
                                                <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}><Minus size={18} /></IconButton>
                                                <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                                                <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}><Plus size={18} /></IconButton>
                                            </Box>
                                            <IconButton color="error" onClick={() => handleRemove(item.id)}>
                                                <Trash2 size={20} />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Card>
                            )
                        })}
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ p: 3, bgcolor: 'white', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                            <Typography variant="h6" gutterBottom>Order Summary</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography color="textSecondary">Subtotal</Typography>
                                <Typography>₹{subtotal}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography color="textSecondary">Shipping</Typography>
                                <Typography>₹{shipping}</Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6" color="var(--primary)">₹{total}</Typography>
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                endIcon={<ArrowRight />}
                                onClick={() => navigate('/checkout')}
                                sx={{ bgcolor: 'var(--primary)', py: 1.5, borderRadius: '30px', '&:hover': { bgcolor: 'var(--accent)' } }}
                            >
                                Checkout
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default Cart;
