import { createSlice } from "@reduxjs/toolkit";
import { LoginResponse } from "./types/loginUser";

type LocalStorageUser = {
  user: LoginResponse | null;
  token: string | null;
  userType: "SERVER" | "DEVELOPER" | "CONSUMER";
};

const initialState: LocalStorageUser = {
  user: null,
  token: null,
  userType: "CONSUMER",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload || {};

      if (!user || !token) {
        console.error("Invalid payload received:", action.payload);
        return;
      }

      state.token = token;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
