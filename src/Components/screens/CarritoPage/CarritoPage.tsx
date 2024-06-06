import React, { useState, useEffect } from 'react';
import CheckoutMP from '../CheckoutMP/CheckoutMP';
import { PedidoPost } from '../../../types/PedidoPost';
import PedidoDetalleService from '../../../service/PedidoDetalleService';
import PedidoService from '../../../service/PedidoService';
import { PedidoDetallePost } from '../../../types/PedidoDetallePost';
import CartInstrumento from '../../../types/CartInstrumento';
import { Button, Grid, Typography, ListItem, ListItemSecondaryAction, ListItemText, IconButton, Container } from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import PedidoDetalle from '../../../types/PedidoDetalle';

interface CarritoPageProps {
  carrito: CartInstrumento[];
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  addToCart: (instrumentoId: number, products: CartInstrumento[]) => void;
}

const CarritoPage: React.FC<CarritoPageProps> = ({ carrito, removeFromCart, clearCart, addToCart }) => {
  const [cantidadItems, setCantidadItems] = useState<{ [key: number]: number }>({});
  const [montoCarrito, setMontoCarrito] = useState<number>(0);
  const [finalizado, setFinalizado] = useState<boolean>(false);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(false);
  const pedidoDetalleService = new PedidoDetalleService();
  const pedidoService = new PedidoService();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const initialCantidad = carrito.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {} as { [key: number]: number });
    setCantidadItems(initialCantidad);
    setIsCartEmpty(carrito.length === 0);
  }, [carrito]);

  useEffect(() => {
    const total = carrito.reduce((acc, item) => acc + item.quantity * item.precio, 0);
    setMontoCarrito(total);
  }, [carrito]);

  const handleFinalizarCompra = async () => {
    const detallesPedido: { id: number }[] = [];
  
    for (const item of carrito) {
      const cantidad = cantidadItems[item.id] || 0;
      if (cantidad > 0) {
        const pedidoDetalle: PedidoDetallePost = {
          cantidad,
          idInstrumento: item.id
        };
        const response = await pedidoDetalleService.post(url + '/pedidoDetalle', pedidoDetalle) as PedidoDetalle;
        detallesPedido.push({ id: response.id });
      }
    }
  
    const totalPedido = carrito.reduce((total, item) => total + (item.precio * (cantidadItems[item.id] || 0)), 0);
  
    const pedido: PedidoPost = {
      totalPedido,
      pedidosDetalle: detallesPedido.map(detalle => detalle.id)
    };
  
    await pedidoService.post(url + '/pedido', pedido);
  
    setMontoCarrito(totalPedido);
    setFinalizado(true);
  };
  

  const handleVaciarCarrito = () => {
    clearCart();
    setIsCartEmpty(true);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant='h6' sx={{mt: 2}}>Carrito de Compras</Typography>
        </Grid>
        <Grid item container direction="column" spacing={1}>
          {isCartEmpty ? (
            <Grid item>
              <Typography variant="body1">El carrito está vacío</Typography>
            </Grid>
          ) : (
            carrito.map((item) => (
              <ListItem key={item.id} sx={{ width: '100%' }}>
                <ListItemText primary={`${item.instrumento} - $${item.precio}`} secondary={`Cantidad: ${item.quantity}`} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => removeFromCart(item.id)}><RemoveIcon /></IconButton>
                  <IconButton onClick={() => addToCart(item.id, carrito)}><AddIcon /></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          )}
        </Grid>
        <Grid item>
          <Typography variant="body1" gutterBottom>Total: ${montoCarrito}</Typography>
        </Grid>
        {!isCartEmpty && (
          <Grid item>
            <Button
              onClick={handleVaciarCarrito}
              variant="outlined"
              startIcon={<DeleteIcon />}
              sx={{ width: '100%' }}
            >
              Vaciar Carrito
            </Button>
          </Grid>
        )}
        {!finalizado ? (
          <Grid item>
            <Button
              disabled={isCartEmpty}
              onClick={handleFinalizarCompra}
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
            >
              Finalizar Compra
            </Button>
          </Grid>
        ) : (
          <Grid item>
            <CheckoutMP montoCarrito={montoCarrito} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CarritoPage;
