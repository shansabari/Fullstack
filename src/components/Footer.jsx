import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'var(--primary)', color: 'white', pt: 8, pb: 4, mt: 8 }}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', fontWeight: 700, mb: 3 }}>
                            HomeMade Bakes
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
                            We bring the warmth and taste of homemade bakes to your celebrations. Each product is crafted with love and the finest ingredients to ensure you get the best quality.
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="h6" sx={{ mb: 3 }}>Quick Links</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Link href="/products" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>Shop</Link>
                            <Link href="/cart" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>Cart</Link>
                            <Link href="/login" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>Login</Link>
                            <Link href="/register" sx={{ color: 'white', opacity: 0.8, textDecoration: 'none', '&:hover': { opacity: 1 } }}>Register</Link>
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="h6" sx={{ mb: 3 }}>Categories</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography sx={{ opacity: 0.8 }}>Cakes</Typography>
                            <Typography sx={{ opacity: 0.8 }}>Brownies</Typography>
                            <Typography sx={{ opacity: 0.8 }}>Cupcakes</Typography>
                            <Typography sx={{ opacity: 0.8 }}>Gift Hampers</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" sx={{ mb: 3 }}>Contact Us</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', opacity: 0.8 }}>
                                <MapPin size={18} />
                                <Typography variant="body2">123 Bakery Lane, Sweet City, India</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', opacity: 0.8 }}>
                                <Phone size={18} />
                                <Typography variant="body2">+91 98765 43210</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', opacity: 0.8 }}>
                                <Mail size={18} />
                                <Typography variant="body2">hello@homemadebakes.com</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                            <Instagram size={24} />
                            <Facebook size={24} />
                            <Twitter size={24} />
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.1)' }} />

                <Typography variant="body2" align="center" sx={{ opacity: 0.6 }}>
                    © {new Date().getFullYear()} HomeMade Bakes. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
