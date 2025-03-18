
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import boots from './boots.png';
import jeans from './jeans.png';
// Имитация запроса к API для получения списка товаров
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    // Имитируем задержку сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Получаем товары из localStorage или используем дефолтные
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [
      { id: 1, title: 'Смартфон', price: 12990, image: jeans, description: 'Современный смартфон с отличной камерой', category: 'Электроника' },
      { id: 2, title: 'Ноутбук', price: 45990, image: boots, description: 'Мощный ноутбук для работы и игр', category: 'Электроника' },
      { id: 3, title: 'Наушники', price: 2990, image: boots, description: 'Беспроводные наушники с хорошим звуком', category: 'Электроника' },
      { id: 4, title: 'Футболка', price: 1499, image: jeans, description: 'Хлопковая футболка', category: 'Одежда' },
      { id: 5, title: 'Джинсы', price: 2999, image: jeans, description: 'Классические джинсы', category: 'Одежда' },
      { id: 6, title: 'Кроссовки', price: 3499, image: boots, description: 'Спортивные кроссовки', category: 'Обувь' }
    ];
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    cart: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filter: '',
    currentCategory: 'all'
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    loadCart: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        state.cart = JSON.parse(savedCart);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity,
  clearCart,
  setFilter,
  setCategory,
  loadCart
} = productSlice.actions;

export const selectProducts = state => {
  const { items, filter, currentCategory } = state.products;
  
  return items
    .filter(product => 
      (currentCategory === 'all' || product.category === currentCategory) &&
      (filter === '' || product.title.toLowerCase().includes(filter.toLowerCase()))
    );
};

export const selectCart = state => state.products.cart;
export const selectCartTotal = state => 
  state.products.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartItemsCount = state => 
  state.products.cart.reduce((count, item) => count + item.quantity, 0);

export default productSlice.reducer;
