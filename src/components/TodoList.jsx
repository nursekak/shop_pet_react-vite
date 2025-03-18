
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, removeTodo, editTodo } from '../store/todoSlice';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const dispatch = useDispatch();
  
  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };
  
  const handleRemove = () => {
    dispatch(removeTodo(todo.id));
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (editText.trim()) {
      dispatch(editTodo({ id: todo.id, text: editText }));
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={handleToggle}
      />
      
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <div className="todo-actions">
            <button onClick={handleSave}>Сохранить</button>
            <button onClick={handleCancel}>Отмена</button>
          </div>
        </div>
      ) : (
        <>
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </span>
          <div className="todo-actions">
            <button onClick={handleEdit}>Изменить</button>
            <button onClick={handleRemove}>Удалить</button>
          </div>
        </>
      )}
    </div>
  );
};

export default function TodoList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.todos);
  
  if (status === 'loading') {
    return <div className="loading">Загрузка...</div>;
  }
  
  if (status === 'failed') {
    return <div className="error">Ошибка: {error}</div>;
  }

  if (items.length === 0) {
    return <div>Нет задач. Добавьте новую задачу!</div>;
  }

  return (
    <div className="todo-list">
      {items.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
