
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../store/productSlice';
import ThemeToggle from './ThemeToggle';

export default function Header({ onCartClick }) {
  const cartItemsCount = useSelector(selectCartItemsCount);
  
  return (
    <header className="shop-header">
      <div className="logo">
        <h1>МойМагазин</h1>
      </div>
      <div className="header-actions">
        <ThemeToggle />
        <button className="cart-button" onClick={onCartClick}>
          <span className="cart-icon">🛒</span>
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
