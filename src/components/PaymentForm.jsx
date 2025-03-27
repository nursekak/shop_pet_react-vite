import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../store/productSlice';
import Notification from './Notification';

export default function PaymentForm({ total, onClose }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPaymentStatus = () => {
      const paymentStatus = localStorage.getItem('paymentStatus');
      if (paymentStatus === 'success') {
        // Очищаем корзину
        dispatch(clearCart());
        // Показываем уведомление
        setShowNotification(true);
        // Закрываем форму
        onClose();
        // Удаляем статус из localStorage
        localStorage.removeItem('paymentStatus');
      }
    };

    // Проверяем статус каждую секунду
    const interval = setInterval(checkPaymentStatus, 1000);
    return () => clearInterval(interval);
  }, [dispatch, onClose]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateCard = () => {
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Номер карты должен содержать 16 цифр');
      return false;
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiryDate)) {
      setError('Неверный формат срока действия карты');
      return false;
    }

    if (cvv.length !== 3) {
      setError('CVV должен содержать 3 цифры');
      return false;
    }

    if (cardholderName.trim().length < 2) {
      setError('Введите имя владельца карты');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (validateCard()) {
      // Открываем страницу подтверждения в новом окне
      const paymentWindow = window.open(
        `/payment-confirmation?total=${total}`,
        'PaymentConfirmation',
        'width=600,height=700,menubar=no,toolbar=no,location=no,status=no'
      );

      // Проверяем, что окно успешно открылось
      if (!paymentWindow) {
        setError('Пожалуйста, разрешите всплывающие окна для этого сайта');
      }
    }
  };

  return (
    <>
      <div className="payment-form">
        <h2>Введите данные карты</h2>
        <div className="payment-amount">
          Сумма к оплате: <span>{total} ₽</span>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Номер карты:</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Срок действия:</label>
              <input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cardholderName">Владелец карты:</label>
            <input
              type="text"
              id="cardholderName"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="IVAN IVANOV"
              required
            />
          </div>

          <button type="submit">
            Продолжить
          </button>
        </form>
      </div>
      {showNotification && (
        <Notification 
          message="Оплата прошла успешно! Спасибо за покупку." 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </>
  );
} 