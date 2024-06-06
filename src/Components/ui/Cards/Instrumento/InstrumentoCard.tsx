import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon, Info as InfoIcon } from '@mui/icons-material';
import CartInstrumento from '../../../../types/CartInstrumento';

interface InstrumentoCardProps {
  instrumento: CartInstrumento;
  onAddToCart: (instrumento: CartInstrumento) => void;
}

const InstrumentoCard: React.FC<InstrumentoCardProps> = ({ instrumento, onAddToCart }) => {
  const { instrumento: nombreInstrumento, marca, modelo, imagen, precio, descripcion } = instrumento;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ position: 'relative', pt: '56.25%', overflow: 'hidden' }}>
        <img src={imagen} alt={nombreInstrumento} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{nombreInstrumento}</Typography>
        <Typography variant="body2" color="textSecondary">{descripcion}</Typography>
        <Typography variant="body1">Marca: {marca}</Typography>
        <Typography variant="body1">Modelo: {modelo}</Typography>
        <Typography variant="body1" gutterBottom>Precio: ${precio}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          onClick={() => onAddToCart(instrumento)}
          sx={{ marginRight: 'auto' }}
        >
          Agregar al carrito
        </Button>
        <Link to={`/detalles/${instrumento.id}`} style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<InfoIcon />}
            sx={{ marginLeft: 'auto' }}
          >
            Ver detalles
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default InstrumentoCard;
