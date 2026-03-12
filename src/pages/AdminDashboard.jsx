import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Card, Button, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem } from '@mui/material';
import { Edit, Trash2, Plus, ExternalLink, Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [tab, setTab] = useState(0);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Dialog states
    const [openProduct, setOpenProduct] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '', description: '', price: '', category_id: '', weight_qty: '', flavor_options: '', stock_availability: '', image: null
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch products
            axios.get('/api/products')
                .then(res => setProducts(res.data))
                .catch(err => console.error("Error fetching products:", err));

            // Fetch categories
            axios.get('/api/products/categories')
                .then(res => setCategories(res.data))
                .catch(err => console.error("Error fetching categories:", err));

            // Fetch orders (this might fail if not admin, but shouldn't block others)
            axios.get('/api/orders/admin/all')
                .then(res => setOrders(res.data))
                .catch(err => console.error("Error fetching orders:", err));

        } catch (err) { console.error(err); }
    };

    const handleOpenAddProduct = () => {
        setCurrentProduct(null);
        setProductForm({
            name: '',
            description: '',
            price: '',
            category_id: '',
            weight_qty: '',
            flavor_options: '',
            stock_availability: '',
            image: null
        });
        setOpenProduct(true);
    };

    const handleUpdateOrderStatus = async (id, newStatus) => {
        try {
            await axios.put(`/api/orders/status/${id}`, { status: newStatus });
            fetchData();
        } catch (err) { console.error(err); }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(productForm).forEach(key => {
            if (key === 'image') {
                if (productForm[key]) formData.append('image', productForm[key]);
            } else if (productForm[key] !== '' && productForm[key] !== null && productForm[key] !== undefined) {
                formData.append(key, productForm[key]);
            }
        });

        try {
            if (currentProduct) {
                await axios.put(`/api/products/${currentProduct.id}`, formData);
            } else {
                await axios.post('/api/products', formData);
            }
            setOpenProduct(false);
            fetchData();
        } catch (err) { alert(err.message); }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/products/${id}`);
            fetchData();
        } catch (err) { console.error(err); }
    };

    return (
        <Container sx={{ py: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4">Admin Dashboard</Typography>
                <Button variant="contained" startIcon={<Plus />} onClick={handleOpenAddProduct} sx={{ bgcolor: 'var(--primary)' }}>
                    Add New Product
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                        <ShoppingCart size={32} />
                        <Typography variant="h4">{orders.length}</Typography>
                        <Typography variant="body2">Total Orders</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'secondary.main', color: 'white' }}>
                        <Package size={32} />
                        <Typography variant="h4">{products.length}</Typography>
                        <Typography variant="body2">Products</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
                        <TrendingUp size={32} />
                        <Typography variant="h4">₹{orders.reduce((a, b) => a + parseFloat(b.total_amount), 0).toFixed(0)}</Typography>
                        <Typography variant="body2">Total Revenue</Typography>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ p: 3, textAlign: 'center', bgcolor: 'info.main', color: 'white' }}>
                        <Users size={32} />
                        <Typography variant="h4">Admin</Typography>
                        <Typography variant="body2">Role</Typography>
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                    <Tab label="Orders Management" />
                    <Tab label="Products Management" />
                </Tabs>
            </Box>

            {tab === 0 && (
                <TableContainer component={Card} sx={{ borderRadius: '15px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>#{order.id}</TableCell>
                                    <TableCell>{order.customer_name}</TableCell>
                                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>₹{order.total_amount}</TableCell>
                                    <TableCell>
                                        <TextField
                                            select
                                            size="small"
                                            value={order.status}
                                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                        >
                                            <MenuItem value="Order Placed">Order Placed</MenuItem>
                                            <MenuItem value="Preparing">Preparing</MenuItem>
                                            <MenuItem value="Out for Delivery">Out for Delivery</MenuItem>
                                            <MenuItem value="Delivered">Delivered</MenuItem>
                                        </TextField>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton component={Link} to={`/order/${order.id}`}><ExternalLink size={18} /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {tab === 1 && (
                <TableContainer component={Card} sx={{ borderRadius: '15px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>₹{product.price}</TableCell>
                                    <TableCell>{product.stock_availability}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => { setCurrentProduct(product); setProductForm({ ...product, image: null }); setOpenProduct(true); }}><Edit size={18} /></IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteProduct(product.id)}><Trash2 size={18} /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Product Dialog */}
            <Dialog open={openProduct} onClose={() => setOpenProduct(false)} fullWidth maxWidth="sm">
                <form onSubmit={handleProductSubmit}>
                    <DialogTitle>{currentProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogContent sx={{ pt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Product Name" required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Description" multiline rows={3} value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Price" type="number" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth select label="Category" value={productForm.category_id} onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}>
                                    <MenuItem value="">None</MenuItem>
                                    {categories.map(cat => (
                                        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Weight/Qty" value={productForm.weight_qty} onChange={(e) => setProductForm({ ...productForm, weight_qty: e.target.value })} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Stock" type="number" value={productForm.stock_availability} onChange={(e) => setProductForm({ ...productForm, stock_availability: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Flavor Options (Comma separated)" value={productForm.flavor_options} onChange={(e) => setProductForm({ ...productForm, flavor_options: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <input type="file" onChange={(e) => setProductForm({ ...productForm, image: e.target.files[0] })} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={() => setOpenProduct(false)}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ bgcolor: 'var(--primary)' }}>Save Product</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default AdminDashboard;
