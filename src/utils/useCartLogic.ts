import { useState } from 'react';
import CartInstrumento from '../types/CartInstrumento';
import Instrumento from '../types/Instrumento';

const useCartLogic = () => {
  const [cart, setCart] = useState<CartInstrumento[]>([]);


  const addToCart = (productId: number, products: Instrumento[]) => {
    const existingProductIndex = cart.findIndex((item) => item.id === productId);
    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        setCart([...cart, { ...productToAdd, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== id);
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return { cart, addToCart, removeFromCart, clearCart };
};

export default useCartLogic;
