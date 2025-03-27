import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initTheme } from './store/themeSlice';
import { fetchProducts, loadCart } from './store/productSlice';
import Header from './components/Header';
import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  useEffect(() => {
    dispatch(initTheme());
    dispatch(fetchProducts());
    dispatch(loadCart());
  }, [dispatch]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  return (
    <Router>
      <main className={`app ${theme}`}>
        <div className="container">
          <Header onCartClick={toggleCart} />
          <ProductFilter />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/payment-confirmation" element={<PaymentConfirmationPage />} />
          </Routes>
          <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </main>
    </Router>
  );
}
