import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity, 
  clearCart,
  selectCart,
  selectCartTotal
} from '../store/productSlice';
import { selectPaymentStatus } from '../store/paymentSlice';
import PaymentForm from './PaymentForm';

export default function ShoppingCart({ isOpen, onClose }) {
  const [showPayment, setShowPayment] = useState(false);
  const cartItems = useSelector(selectCart);
  const cartTotal = useSelector(selectCartTotal);
  const paymentStatus = useSelector(selectPaymentStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (paymentStatus === 'succeeded') {
      // Закрываем корзину после успешной оплаты
      onClose();
    }
  }, [paymentStatus, onClose]);
  
  if (!isOpen) return null;
  
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };
  
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };
  
  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePayment = () => {
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };
  
  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Корзина</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {showPayment ? (
          <PaymentForm total={cartTotal} onClose={handleClosePayment} />
        ) : (
          <>
            {cartItems.length === 0 ? (
              <div className="empty-cart">Ваша корзина пуста</div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.title} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h3>{item.title}</h3>
                        <div className="cart-item-price">{item.price} ₽</div>
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-control">
                          <button onClick={() => handleDecrement(item.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleIncrement(item.id)}>+</button>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => handleRemove(item.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Итого:</span>
                    <span>{cartTotal} ₽</span>
                  </div>
                  <div className="cart-actions">
                    <button className="clear-cart-btn" onClick={handleClearCart}>
                      Очистить корзину
                    </button>
                    <button className="checkout-btn" onClick={handlePayment}>
                      Оформить заказ
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
