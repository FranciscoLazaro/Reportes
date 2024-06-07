import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAuth } from '../../../../contexts/AuthContext';
import CarritoPage from '../../../screens/CarritoPage/CarritoPage';
import { useCart } from '../../../../contexts/CartContext';
import CartInstrumento from '../../../../types/CartInstrumento';
import { styled } from '@mui/material/styles';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { addToCart, removeFromCart, cart, clearCart} = useCart();

  const handleCartClick = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const totalItems = cart.reduce((total: number, item: CartInstrumento) => total + item.quantity, 0);

  const StyledAppBar = styled(AppBar)({
    backgroundColor: '#8B4513', // Brown color
  });

  const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    margin: '0 10px',
    '&:hover': {
      color: '#FFD700', // Gold color on hover
    },
  });

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="/">Mi Tienda</StyledLink>
          </Typography>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="/">Inicio</StyledLink>
          </Typography>
          {isAuthenticated && (userRole === 'ADMIN' || userRole === 'OPERADOR') && (
            <>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                <StyledLink to="/categorias">Categorías</StyledLink>
              </Typography>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                <StyledLink to="/instrumentos">Instrumentos</StyledLink>
              </Typography>
            </>
          )}
          {isAuthenticated && userRole === 'ADMIN' && (
            <Typography component="div" sx={{ flexGrow: 1 }}>
              <StyledLink to="/estadisticas">Estadísticas</StyledLink>
            </Typography>
          )}
          {isAuthenticated && userRole === 'VISOR' && (
            <IconButton aria-label="Carrito de Compras" onClick={handleCartClick} color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
          {!isAuthenticated ? (
            <IconButton aria-label="Iniciar Sesión" onClick={handleLoginClick} color="inherit">
              <AccountCircleIcon />
            </IconButton>
          ) : (
            <>
              <IconButton aria-label="Usuario" onClick={handleMenuClick} color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogoutClick}>Cerrar Sesión</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <div style={{ width: 300 }}>
          <List>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Carrito" />
            </ListItem>
            <Divider />
            {isAuthenticated && userRole === 'VISOR' && (
              <CarritoPage carrito={cart} removeFromCart={removeFromCart} clearCart={clearCart} addToCart={addToCart} />
            )}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
