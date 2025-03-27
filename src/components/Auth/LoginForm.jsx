import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../store/userSlice';

export default function LoginForm({ onToggleForm, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const status = useSelector(state => state.user.status);
  const error = useSelector(state => state.user.error);

  useEffect(() => {
    if (status === 'succeeded') {
      onClose(); // Закрываем модальное окно после успешного входа
    }
  }, [status, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    await dispatch(login({ email, password }));
  };

  return (
    <div className="auth-form">
      <h2>Вход</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Вход...' : 'Войти'}
        </button>
      </form>
      <p>
        Нет аккаунта?{' '}
        <button className="link-button" onClick={onToggleForm}>
          Зарегистрироваться
        </button>
      </p>
    </div>
  );
} 