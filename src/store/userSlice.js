import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Имитация API запросов
const mockApi = {
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new Error('Неверный email или пароль');
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    const { password, ...userWithoutPassword } = userData;
    return userWithoutPassword;
  },
  
  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return null;
  }
};

export const login = createAsyncThunk(
  'user/login',
  async (credentials) => {
    const user = await mockApi.login(credentials);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (userData) => {
    const user = await mockApi.register(userData);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    await mockApi.logout();
    localStorage.removeItem('currentUser');
    return null;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    status: 'idle',
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.currentUser = null;
      });
  }
});

export const { clearError } = userSlice.actions;

export const selectCurrentUser = state => state.user.currentUser;
export const selectUserStatus = state => state.user.status;
export const selectUserError = state => state.user.error;

export default userSlice.reducer; 