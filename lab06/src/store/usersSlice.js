import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk: Lấy danh sách người dùng (dùng API public JSONPlaceholder)
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) {
        return rejectWithValue('Fetch users failed');
      }
      const raw = await res.json();
      // Chuẩn hóa dữ liệu cho phù hợp với UI
      const data = Array.isArray(raw)
        ? raw.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            isAdmin: false
          }))
        : [];
      return data;
    } catch (err) {
      return rejectWithValue('Network error');
    }
  }
);

// Trạng thái khởi tạo
const initialState = {
  list: [],
  isLoading: false,
  error: null
};

// Slice quản lý người dùng
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Toggle trạng thái Admin/User
    toggleAdminStatus: (state, action) => {
      const id = action.payload;
      const user = state.list.find((u) => u.id === id);
      if (user) {
        user.isAdmin = !user.isAdmin;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Unexpected error';
      });
  }
});

// Export action
export const { toggleAdminStatus } = usersSlice.actions;

// Selectors
export const selectUsers = (state) => state.users.list;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;

// Export reducer mặc định
export default usersSlice.reducer;
