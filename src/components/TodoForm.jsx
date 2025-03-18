
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, clearTodos } from '../store/todoSlice';

export default function TodoForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };
  
  const handleClearAll = () => {
    dispatch(clearTodos());
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите новую задачу"
      />
      <div className="form-actions">
        <button type="submit">Добавить</button>
        <button type="button" onClick={handleClearAll}>Очистить все</button>
      </div>
    </form>
  );
}
