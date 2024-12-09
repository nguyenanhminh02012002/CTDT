import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const logout = createSlice({
  name: "logout",
  initialState: {
    isLogout: false,
  },
  reducers: {
    logout(state) {
      state.isLogout = true;
    },
    login(state) {
      state.isLogout = false;
    },
  },
});

export const actionLogout = logout.actions;

const addPermission = createSlice({
  name: "permission",
  initialState: {
    isShowAddPermission: false,
  },
  reducers: {
    isShowModal(state) {
      state.isShowAddPermission = !state.isShowAddPermission;
    },
  },
});

export const actionIsShowAddPermission = addPermission.actions;

const store = configureStore({
  reducer: { logout: logout.reducer, showAddPermission: addPermission.reducer },
});

export default store;
