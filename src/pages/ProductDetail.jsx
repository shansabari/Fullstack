import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Typography, Button, Box, TextField, MenuItem, Divider, Chip, CircularProgress } from '@mui/material';
import { ShoppingCart, Calendar, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Customization state
    const [quantity, setQuantity] = useState(1);
    const [selectedFlavor, setSelectedFlavor] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [cakeSize, setCakeSize] = useState('0.5kg');

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`/api/products/${id}`);
            setProduct(res.data);
            if (res.data.flavor_options) {
                setSelectedFlavor(res.data.flavor_options.split(',')[0]);
            }
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const customization = {
            flavor: selectedFlavor,
            message: customMessage,
            size: cakeSize
        };

        try {
            await axios.post('/api/cart', {
                productId: product.id,
                quantity,
                customization
            });
            alert('Added to cart!');
            navigate('/cart');
        } catch (err) {
            alert('Failed to add to cart: ' + err.response?.data?.message || err.message);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
    if (!product) return <Typography align="center" sx={{ py: 10 }}>Product not found.</Typography>;

    return (
        <Container sx={{ py: 8 }}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                        <img
                            src={product.image_url ? `https://fullstackbackend-h6xy.onrender.com/uploads/${product.image_url}` : 'https://via.placeholder.com/600x600?text=Bakery+Item'}
                            alt={product.name}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Chip label={product.category_name} sx={{ mb: 2, bgcolor: 'var(--secondary)', color: 'var(--primary)', fontWeight: 600 }} />
                    <Typography variant="h3" gutterBottom sx={{ color: 'var(--text-dark)' }}>{product.name}</Typography>
                    <Typography variant="h4" color="var(--accent)" sx={{ mb: 3, fontWeight: 700 }}>₹{product.price}</Typography>

                    <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                        {product.description}
                    </Typography>

                    <Divider sx={{ mb: 4 }} />

                    {/* Customization Options */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Customize Your Order</Typography>

                        <Grid container spacing={2}>
                            {product.category_name === 'Cakes' && (
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Select Weight"
                                        value={cakeSize}
                                        onChange={(e) => setCakeSize(e.target.value)}
                                        sx={{ mb: 2 }}
                                    >
                                        <MenuItem value="0.5kg">0.5 kg</MenuItem>
                                        <MenuItem value="1kg">1 kg</MenuItem>
                                        <MenuItem value="1.5kg">1.5 kg</MenuItem>
                                        <MenuItem value="2kg">2 kg</MenuItem>
                                    </TextField>
                                </Grid>
                            )}

                            {product.flavor_options && (
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Choose Flavor"
                                        value={selectedFlavor}
                                        onChange={(e) => setSelectedFlavor(e.target.value)}
                                        sx={{ mb: 2 }}
                                    >
                                        {product.flavor_options.split(',').map(flavor => (
                                            <MenuItem key={flavor} value={flavor.trim()}>{flavor.trim()}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            )}
                        </Grid>

                        <TextField
                            fullWidth
                            label="Custom Message (Optional)"
                            placeholder="e.g. Happy Birthday Rahul!"
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            multiline
                            rows={2}
                            sx={{ mt: 2 }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <TextField
                            label="Qty"
                            type="number"
                            size="small"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                            sx={{ width: '80px' }}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCart />}
                            onClick={handleAddToCart}
                            sx={{
                                bgcolor: 'var(--primary)',
                                px: 6,
                                py: 1.5,
                                borderRadius: '30px',
                                flex: 1,
                                '&:hover': { bgcolor: 'var(--accent)' }
                            }}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetail;
