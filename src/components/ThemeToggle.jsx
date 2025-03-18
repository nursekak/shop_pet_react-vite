
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);
  
  return (
    <button 
      className="theme-toggle" 
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
