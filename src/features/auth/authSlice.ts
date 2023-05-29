import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { login, logout } from './authAPI';

export interface AuthState {
    user: any,
    isAuthenticated: boolean,

}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
  'auth/login',
  async () => {
    const response = await login();
    return response;
  }
);

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async () => {
      const response = await logout();
      return response;
    }
  );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  loginSuccess: (state, action: PayloadAction<string>) => {
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  loginFailed: (state, action: PayloadAction<string>) => {
    state.user = null;
    state.isAuthenticated = false;
  },
  logoutSuccess: (state) => {
    state.user = null;
    state.isAuthenticated = false;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
