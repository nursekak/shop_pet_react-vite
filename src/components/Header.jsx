import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItemsCount } from '../store/productSlice';
import { selectCurrentUser, logout } from '../store/userSlice';
import ThemeToggle from './ThemeToggle';
import AuthModal from './Auth/AuthModal';

export default function Header({ onCartClick }) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const cartItemsCount = useSelector(selectCartItemsCount);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <header className="shop-header">
      <div className="logo">
        <h1>МойМагазин</h1>
      </div>
      <div className="header-actions">
        <ThemeToggle />
        {currentUser ? (
          <div className="user-info">
            <span>Привет, {currentUser.name}!</span>
            <button onClick={handleLogout} className="logout-btn">
              Выйти
            </button>
          </div>
        ) : (
          <button 
            className="login-btn"
            onClick={() => setIsAuthModalOpen(true)}
          >
            Войти
          </button>
        )}
        <button className="cart-button" onClick={onCartClick}>
          <span className="cart-icon">🛒</span>
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </button>
      </div>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}
