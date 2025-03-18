
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Имитируем API для задач
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Асинхронные действия
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    // Имитация API запроса
    await delay(1000);
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  }
);

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false
      };
      state.items.push(newTodo);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
    clearTodos: (state) => {
      state.items = [];
      localStorage.setItem('todos', JSON.stringify(state.items));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addTodo, toggleTodo, editTodo, removeTodo, clearTodos } = todoSlice.actions;

export default todoSlice.reducer;
