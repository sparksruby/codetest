// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductScreen } from './screens/ProductScreen';
import { CartScreen } from './screens/CartScreen';
import { OrderScreen } from './screens/OrderScreen';
import { OrderConfirmationScreen } from './screens/OrderConfirmation';

// Types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  color: string;
  quantity: number;
  image: string;
}

export interface OrderInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  shipmentMethod: 'free' | 'paid';
  paymentMethod: 'cash' | 'kbz';
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    shipmentMethod: 'free',
    paymentMethod: 'cash'
  });
  const [orderNumber, setOrderNumber] = useState<string>('');

  const addToCart = (quantity: number, image: string) => {
    const newItem: CartItem = {
      id: '1',
      name: 'Meryl Lounge Chair',
      price: 169.99,
      color: 'Lydia bright green',
      quantity,
      image
    };
    setCartItems([newItem]);
  };

  const updateCartQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems([]);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const completeOrder = () => {
    const orderNum = Math.random().toString(36).substr(2, 8).toUpperCase();
    setOrderNumber(orderNum);
  };

  const resetApp = () => {
    setCartItems([]);
    setOrderInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      shipmentMethod: 'free',
      paymentMethod: 'cash'
    });
    setOrderNumber('');
  };

  const commonProps = {
    cartItems,
    orderInfo,
    orderNumber,
    setOrderInfo,
    getCartTotal,
    getCartItemCount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    completeOrder,
    resetApp
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductScreen {...commonProps} />} />
        <Route path="/cart" element={<CartScreen {...commonProps} />} />
        <Route path="/order" element={<OrderScreen {...commonProps} />} />
        <Route path="/confirmation" element={<OrderConfirmationScreen {...commonProps} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
