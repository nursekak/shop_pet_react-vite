import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../../store/userSlice';

export default function RegisterForm({ onToggleForm }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch();
  const status = useSelector(state => state.user.status);
  const error = useSelector(state => state.user.error);

  useEffect(() => {
    if (status === 'succeeded') {
      onToggleForm(); // Переключаемся на форму входа после успешной регистрации
    }
  }, [status, onToggleForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    dispatch(clearError());
    await dispatch(register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    }));
  };

  return (
    <div className="auth-form">
      <h2>Регистрация</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Подтвердите пароль:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
      <p>
        Уже есть аккаунт?{' '}
        <button className="link-button" onClick={onToggleForm}>
          Войти
        </button>
      </p>
    </div>
  );
} 