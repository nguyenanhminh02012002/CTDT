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
    isSuccessData: false,
  },
  reducers: {
    isShowModal(state) {
      state.isShowAddPermission = !state.isShowAddPermission;
      // state.isSuccessData = false;
    },
    successData(state) {
      state.isSuccessData = !state.isSuccessData;
    },
  },
});
export const actionIsShowAddPermission = addPermission.actions;

const addUnit = createSlice({
  name: "unit",
  initialState: {
    isShowAddUnit: false,
    isSuccessData: false,
  },
  reducers: {
    isShowModal(state) {
      state.isShowAddUnit = !state.isShowAddUnit;
    },
    isSuccessData(state) {
      state.isSuccessData = !state.isSuccessData;
    },
  },
});

export const actionAddUnit = addUnit.actions;

const addUser = createSlice({
  name: "user",
  initialState: {
    isShowAddUser: false,
    isSuccessData: false,
  },
  reducers: {
    isShowModal(state) {
      state.isShowAddUser = !state.isShowAddUser;
    },
    isSuccessData(state) {
      state.isSuccessData = !state.isSuccessData;
    },
  },
});

export const actionAddUser = addUser.actions;

const store = configureStore({
  reducer: {
    logout: logout.reducer,
    addPermission: addPermission.reducer,
    addUnit: addUnit.reducer,
    addUser: addUser.reducer,
  },
});

export default store;
