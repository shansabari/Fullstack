import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, Box, TextField, MenuItem, Slider } from '@mui/material';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [search, setSearch] = useState('');
    const [priceRange, setPriceRange] = useState([0, 2000]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            let url = `/api/products?search=${search}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
            const res = await axios.get(url);
            setProducts(res.data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6 }}>Our Sweet Collection</Typography>

            <Grid container spacing={4}>
                {/* Filters Sidebar */}
                <Grid item xs={12} md={3}>
                    <Box sx={{ p: 3, bgcolor: 'white', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" gutterBottom>Filters</Typography>

                        <TextField
                            fullWidth
                            label="Search"
                            size="small"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            fullWidth
                            label="Search"
                            size="small"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{ mb: 3 }}
                        />

                        <Typography gutterBottom>Price Range (₹)</Typography>
                        <Slider
                            value={priceRange}
                            onChange={(e, newVal) => setPriceRange(newVal)}
                            valueLabelDisplay="auto"
                            min={0}
                            max={2000}
                            sx={{ color: 'var(--primary)', mb: 3 }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={fetchProducts}
                            sx={{ bgcolor: 'var(--primary)', '&:hover': { bgcolor: 'var(--accent)' } }}
                        >
                            Apply Filters
                        </Button>
                    </Box>
                </Grid>

                {/* Products Grid */}
                <Grid item xs={12} md={9}>
                    <Grid container spacing={3}>
                        {products.length === 0 ? (
                            <Typography sx={{ m: 4 }}>No products found matching your criteria.</Typography>
                        ) : (
                            products.map(product => (
                                <Grid item xs={12} sm={6} md={4} key={product.id}>
                                    <Card sx={{
                                        borderRadius: '15px',
                                        transition: 'all 0.3s ease',
                                        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }
                                    }}>
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image={product.image_url ? `https://fullstackbackend-h6xy.onrender.com/uploads/${product.image_url}` : 'https://via.placeholder.com/300x200?text=Bakery+Item'}
                                            alt={product.name}
                                        />
                                        <CardContent>
                                            <Typography variant="caption" color="var(--primary-light)" sx={{ fontWeight: 600 }}>{product.category_name}</Typography>
                                            <Typography variant="h6" noWrap gutterBottom>{product.name}</Typography>
                                            <Typography variant="subtitle1" color="var(--accent)" sx={{ fontWeight: 700 }}>₹{product.price}</Typography>
                                            <Button
                                                component={Link}
                                                to={`/product/${product.id}`}
                                                fullWidth
                                                variant="outlined"
                                                sx={{ mt: 2, borderRadius: '20px', borderColor: 'var(--primary)', color: 'var(--primary)', '&:hover': { bgcolor: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' } }}
                                            >
                                                View Details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductList;
