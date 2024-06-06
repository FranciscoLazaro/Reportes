import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categoria from './Components/screens/Categoria/Categoria';
import Home from './Components/screens/Home/Home';
import Instrumento from './Components/screens/Instrumento/Instrumento';
import Estadisticas from './Components/screens/Estadisticas/Estadisticas';  // Importa el nuevo componente de estadísticas
import Navbar from './Components/ui/common/NavBar/NavBar';
import CarritoPage from './Components/screens/CarritoPage/CarritoPage';
import Login from './Components/screens/Login/Login';
import Register from './Components/screens/Register/Register';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import useCartLogic from './utils/useCartLogic';
import Detalles from './Components/screens/Detalles/Detalles';

const App: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCartLogic();

  return (
    <AuthProvider>
      <Router>
        <Navbar cart={cart} removeFromCart={removeFromCart} clearCart={clearCart}  addToCart={addToCart}/>
        <Routes>
          <Route path="/" element={<Home handleAddToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/carrito"
            element={<PrivateRoute requiredRole="OPERADOR" element={<CarritoPage carrito={cart} removeFromCart={removeFromCart} clearCart={clearCart}  addToCart={addToCart}/>} />}
          />
          <Route
            path="/categorias"
            element={<PrivateRoute requiredRole="ADMIN" element={<Categoria />} />}
          />
          <Route
            path="/instrumentos"
            element={<PrivateRoute requiredRole="ADMIN" element={<Instrumento />} />}
          />
          <Route
            path="/estadisticas"  // Agrega la ruta para estadísticas
            element={<PrivateRoute requiredRole="ADMIN" element={<Estadisticas />} />}
          />
          <Route path="/detalles/:id" element={<Detalles />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
