import { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import InstrumentoService from '../../../service/InstrumentoService';

import InstrumentoCard from '../../ui/Cards/Instrumento/InstrumentoCard';
import { useCart } from '../../../contexts/CartContext';



const Home = () => {
  const [instrumentos, setInstrumentos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const instrumentoService = new InstrumentoService();
  const url = import.meta.env.VITE_API_URL;
  const { addToCart} = useCart();

  useEffect(() => {
    const fetchInstrumentos = async () => {
      try {
        const instrumentosData = await instrumentoService.getAll(url + '/instrumento');
        if (instrumentosData.length === 0) {
          setError('No se encontraron instrumentos.');
        } else {
          setInstrumentos(instrumentosData);
        }
      } catch (error) {
        setError('Error al obtener los instrumentos.');
        console.error('Error al obtener los instrumentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstrumentos();
  }, [url]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" sx={{ my: 2 }}>
        Instrumentos Disponibles
      </Typography>
      {loading ? (
        <CircularProgress /> 
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {instrumentos.map((instrumento) => (
            <Grid item key={instrumento.id} xs={12} sm={6} md={4}>
              <InstrumentoCard instrumento={instrumento} onAddToCart={() => addToCart(instrumento.id, [instrumento])} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
