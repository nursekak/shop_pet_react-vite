import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PaymentConfirmation from '../components/PaymentConfirmation';

export default function PaymentConfirmationPage() {
  const [searchParams] = useSearchParams();
  const total = searchParams.get('total');

  const handleSuccess = () => {
    // Отправляем сообщение в родительское окно
    window.opener.postMessage({ type: 'PAYMENT_SUCCESS' }, '*');
    // Закрываем окно
    window.close();
  };

  return (
    <PaymentConfirmation 
      total={parseFloat(total)} 
      onSuccess={handleSuccess}
    />
  );
} 