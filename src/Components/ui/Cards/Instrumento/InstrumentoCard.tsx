import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, Box, Grid } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon, Info as InfoIcon } from '@mui/icons-material';
import CartInstrumento from '../../../../types/CartInstrumento';
import { useAuth } from '../../../../contexts/AuthContext';

interface InstrumentoCardProps {
  instrumento: CartInstrumento;
  onAddToCart: (instrumento: CartInstrumento) => void;
}

const InstrumentoCard: React.FC<InstrumentoCardProps> = ({ instrumento, onAddToCart }) => {
  const { isAuthenticated, userRole } = useAuth();
  const { instrumento: nombreInstrumento, marca, modelo, imagen, precio, descripcion } = instrumento;

  const showAddToCartButton = isAuthenticated && userRole !== 'ADMIN' && userRole !== 'OPERADOR';

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#ecd9af', color: '#4a2e0b' }}>
      <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
        <img src={imagen} alt={nombreInstrumento} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
      <CardContent sx={{ flexGrow: 1, backgroundColor: '#f5deb3' }}>
        <Typography variant="h6">{nombreInstrumento}</Typography>
        <Typography variant="body2" color="textSecondary">{descripcion}</Typography>
        <Typography variant="body1">Marca: {marca}</Typography>
        <Typography variant="body1">Modelo: {modelo}</Typography>
        <Typography variant="body1" gutterBottom>Precio: ${precio}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Grid container spacing={1}>
          {showAddToCartButton && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => onAddToCart(instrumento)}
                fullWidth
                sx={{ backgroundColor: '#4a2e0b', color: '#fff' }}
              >
                Agregar al carrito
              </Button>
            </Grid>
          )}
          <Grid item xs={12}>
            <Link to={`/detalles/${instrumento.id}`} style={{ textDecoration: 'none', width: '100%' }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<InfoIcon />}
                fullWidth
                sx={{ backgroundColor: '#4a2e0b', color: '#fff' }}
              >
                Ver detalles
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default InstrumentoCard;
