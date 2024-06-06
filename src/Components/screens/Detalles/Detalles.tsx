import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import InstrumentoService from '../../../service/InstrumentoService';
import Instrumento from '../../../types/Instrumento';

const Detalles: React.FC = () => {
    const [instru, setInstrumento] = useState<Instrumento>();
    const instrumentoService = new InstrumentoService();
    const { id } = useParams<{ id: string }>();
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchInstrumento = async () => {
            try {
                if (id) {
                    const instrumentoId = parseInt(id, 10);
                    const fetchedInstrumento = await instrumentoService.get(url + '/instrumento', instrumentoId);
                    setInstrumento(fetchedInstrumento);
                }
            } catch (error) {
                console.error('Error al obtener el instrumento:', error);
            }
        };

        fetchInstrumento();
    }, [id, instrumentoService]);

    const handleGenerarPDF = async () => {
        try {
            const response = await fetch(`${url}/reporte/pdf/${id}`);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                window.open(url);
            } else {
                console.error('Error al generar el PDF:', response.statusText);
            }
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    };
    

    if (!instru) {
        return <Typography variant="body1">Cargando detalles del instrumento...</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        {instru.instrumento}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            image={instru.imagen}
                            alt={instru.instrumento}
                            sx={{ height: 'auto', maxHeight: 500 }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <CardContent>
                            <Box mb={2}>
                                <Typography variant="h6">Descripción</Typography>
                                <Typography variant="body1">{instru.descripcion}</Typography>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="h6">Detalles</Typography>
                                <Typography variant="body1">Marca: {instru.marca}</Typography>
                                <Typography variant="body1">Modelo: {instru.modelo}</Typography>
                                <Typography variant="body1">Precio: ${instru.precio}</Typography>
                                {instru.costoEnvio && (
                                    <Typography variant="body1">Costo de envío: {instru.costoEnvio}</Typography>
                                )}
                                {instru.cantidadVendida && (
                                    <Typography variant="body1">Cantidad vendida: {instru.cantidadVendida}</Typography>
                                )}
                                {instru.categoria?.denominacion && (
                                    <Typography variant="body1">Categoría: {instru.categoria.denominacion}</Typography>
                                )}
                                <Grid item xs={12}>
                                    <Button sx={{mt:2}} variant="contained" onClick={handleGenerarPDF}>Generar PDF</Button>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Detalles;
