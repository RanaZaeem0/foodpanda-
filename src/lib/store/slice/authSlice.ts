import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface UserData {
    user_id: number;
    username?: string | null;
    email?: string | null;
    name?: string | null;
    image?: string | null;

  }
  
interface AuthState {
  userData: UserData | null; // Or undefined if it can be undefined
  status: boolean;
}

const initialState: AuthState = {
  userData: null,
  status: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
      state.status = true;
    },
    logout: (state) => {
      state.userData = null;
      state.status = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;