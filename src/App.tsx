import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Categoria from './Components/screens/Categoria/Categoria';
import Home from './Components/screens/Home/Home';
import Instrumento from './Components/screens/Instrumento/Instrumento';
import Estadisticas from './Components/screens/Estadisticas/Estadisticas';
import Navbar from './Components/ui/common/NavBar/NavBar';

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
        <Navbar cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} addToCart={addToCart} />
        <Routes>
          <Route path="/" element={<Home handleAddToCart={addToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/categorias"
            element={<PrivateRoute allowedRoles={["ADMIN", "OPERADOR"]} element={<Categoria />} />}
          />
          <Route
            path="/instrumentos"
            element={<PrivateRoute allowedRoles={["ADMIN", "OPERADOR"]} element={<Instrumento />} />}
          />
          <Route
            path="/estadisticas"
            element={<PrivateRoute allowedRoles={["ADMIN"]} element={<Estadisticas />} />}
          />

          <Route path="/detalles/:id" element={<Detalles />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
