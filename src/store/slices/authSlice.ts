import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthTokens, AuthState } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  mfaPending: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setTokens(state, action: PayloadAction<AuthTokens>) {
      state.tokens = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setMfaPending(state, action: PayloadAction<boolean>) {
      state.mfaPending = action.payload;
    },
    login(state, action: PayloadAction<{ user: User; tokens: AuthTokens }>) {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
      state.mfaPending = false;
      state.error = null;
    },
    logout() {
      return initialState;
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
