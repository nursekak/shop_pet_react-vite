
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initTheme } from './store/themeSlice';
import { fetchProducts, loadCart } from './store/productSlice';
import Header from './components/Header';
import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
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
    <main className={`app ${theme}`}>
      <div className="container">
        <Header onCartClick={toggleCart} />
        <ProductFilter />
        <ProductList />
        <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </main>
  );
}
