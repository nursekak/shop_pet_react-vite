import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/productSlice';
import '../styles/PaymentConfirmation.css';

export default function PaymentConfirmation({ total, onSuccess }) {
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handlePay = async () => {
    try {
      // Имитация процесса оплаты
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Очищаем корзину
      dispatch(clearCart());
      
      // Устанавливаем статус успешной оплаты
      setPaymentStatus('success');
      
      // Сохраняем статус в localStorage
      localStorage.setItem('paymentStatus', 'success');
      
      // Вызываем callback успешной оплаты
      if (onSuccess) {
        onSuccess();
      }
      
      // Закрываем окно через 2 секунды
      setTimeout(() => {
        window.close();
      }, 2000);
    } catch (err) {
      setError('Произошла ошибка при обработке платежа');
      setPaymentStatus('error');
    }
  };

  return (
    <div className="payment-confirmation">
      <div className="payment-content">
        <img src="/sber-logo.png" alt="Сбербанк" className="bank-logo" />
        
        <div className="payment-amount">
          Сумма к оплате: <span>{total} ₽</span>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        {paymentStatus === 'success' ? (
          <div className="success-message">
            Оплата прошла успешно!
          </div>
        ) : (
          <button 
            onClick={handlePay}
            className="pay-button"
            disabled={paymentStatus === 'processing'}
          >
            {paymentStatus === 'processing' ? 'Обработка...' : 'Оплатить'}
          </button>
        )}
      </div>
    </div>
  );
} 