import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { ArrowRight, Star, Clock, Truck } from 'lucide-react';

const Home = () => {
    return (
        <Box>
            {/* Hero Section */}
            <Box sx={{
                height: '80vh',
                bgcolor: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <Container>
                    <Grid container alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography variant="h2" gutterBottom sx={{ color: 'var(--primary)' }}>
                                    Freshly Baked with Love
                                </Typography>
                                <Typography variant="h5" sx={{ mb: 4, color: 'var(--text-light)', fontWeight: 400 }}>
                                    Delicious homemade cakes, brownies, and treats delivered straight to your doorstep.
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/products"
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowRight />}
                                    sx={{
                                        bgcolor: 'var(--primary)',
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: '30px',
                                        fontSize: '1.1rem',
                                        '&:hover': { bgcolor: 'var(--accent)' }
                                    }}
                                >
                                    Browse Shop
                                </Button>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
                {/* Background Decoration */}
                <Box sx={{
                    position: 'absolute',
                    right: '-10%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '60%',
                    height: '100%',
                    bgcolor: 'var(--primary-light)',
                    borderRadius: '50%',
                    opacity: 0.1,
                    zIndex: 0
                }} />
            </Box>

            {/* Features Section */}
            <Container sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {[
                        { icon: <Star />, title: 'Premium Quality', desc: 'We use the finest organic ingredients for our bakes.' },
                        { icon: <Clock />, title: 'Freshly Baked', desc: 'Every order is baked fresh just before delivery.' },
                        { icon: <Truck />, title: 'Fast Delivery', desc: 'Same day delivery available for selected areas.' }
                    ].map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Box sx={{ textAlign: 'center', p: 4, borderRadius: '20px', '&:hover': { bgcolor: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' } }}>
                                <Box sx={{ color: 'var(--primary)', mb: 2 }}>{feature.icon}</Box>
                                <Typography variant="h6" gutterBottom>{feature.title}</Typography>
                                <Typography color="textSecondary">{feature.desc}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Categories Section */}
            <Box sx={{ bgcolor: 'white', py: 8 }}>
                <Container>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>Our Categories</Typography>
                    <Grid container spacing={3}>
                        {[
                            { name: 'Cakes', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80' },
                            { name: 'Brownies', img: 'https://images.unsplash.com/photo-1541696497-3958aadc3ff8?auto=format&fit=crop&w=800&q=80' },
                            { name: 'Cupcakes', img: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80' },
                            { name: 'Gifts', img: 'https://images.unsplash.com/photo-1549462184-b09ad0a4460c?auto=format&fit=crop&w=800&q=80' }
                        ].map((cat, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card sx={{ borderRadius: '15px', overflow: 'hidden', position: 'relative' }}>
                                    <CardMedia component="img" height="300" image={cat.img} alt={cat.name} />
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        p: 3,
                                        bgcolor: 'rgba(0,0,0,0.4)',
                                        color: 'white',
                                        textAlign: 'center'
                                    }}>
                                        <Typography variant="h6">{cat.name}</Typography>
                                        <Button component={Link} to="/products" sx={{ color: 'white', textTransform: 'none' }}>View All</Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
