import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment, clearError, clearTransaction, resetStatus, selectPaymentStatus, selectPaymentError } from '../store/paymentSlice';
import { clearCart } from '../store/productSlice';
import Notification from './Notification';
import '../styles/PaymentPage.css';

export default function PaymentPage({ total, onBack }) {
  const [showNotification, setShowNotification] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector(selectPaymentStatus);
  const error = useSelector(selectPaymentError);

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(clearCart());
      dispatch(clearTransaction());
      setShowNotification(true);
      setTimeout(() => {
        dispatch(resetStatus());
        onBack();
      }, 3000);
    }
  }, [status, dispatch, onBack]);

  const handlePay = async () => {
    dispatch(clearError());
    await dispatch(processPayment({
      amount: total,
      status: 'success'
    }));
  };

  return (
    <div className="payment-page">
      <div className="payment-content">
        <div className="payment-header">
          <img src="/sber-logo.png" alt="Сбер" className="payment-logo" />
          <h2>Оплата через Сбер</h2>
        </div>

        <div className="payment-details">
          <div className="payment-amount">
            <span>Сумма к оплате:</span>
            <span className="amount">{total} ₽</span>
          </div>
          <div className="payment-info">
            <p>Для оплаты нажмите кнопку "Оплатить"</p>
            <p>После успешной оплаты вы будете перенаправлены обратно</p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          className="pay-button"
          onClick={handlePay}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Обработка...' : 'Оплатить'}
        </button>

        <button className="back-button" onClick={onBack}>
          Вернуться назад
        </button>
      </div>

      {showNotification && (
        <Notification 
          message="Оплата прошла успешно! Спасибо за покупку." 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </div>
  );
} 