import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Error al conectar con el servidor');
      const data = await response.json();
      return data as User[];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ocurrio un error inesperado');
    }
  }
);

const initialState = {
  items: [] as User[],
  loading: false,
  error: null as string | null,
  filters: { name: '', company: '' }
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<{ name: string; company: string }>) => {
      state.filters = action.payload;
      localStorage.setItem('userFilters', JSON.stringify(action.payload));
    },
    hydrateFilters: (state) => {
      const saved = localStorage.getItem('userFilters');
      if (saved) {
        state.filters = JSON.parse(saved);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setFilters, hydrateFilters } = userSlice.actions;
export default userSlice.reducer;