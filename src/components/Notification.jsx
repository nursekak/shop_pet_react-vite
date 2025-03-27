import { useEffect } from 'react';

export default function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Закрыть через 3 секунды

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      <div className="notification-content">
        <p>{message}</p>
        <button className="close-notification" onClick={onClose}>×</button>
      </div>
    </div>
  );
} 