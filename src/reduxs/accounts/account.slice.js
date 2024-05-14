import { createSlice } from "@reduxjs/toolkit";
import local from "../../utils/localStorage";
import vn from "../../i18n/textJson/vn.json";
import en from "../../i18n/textJson/en.json";

export const dataLang = { en, vn };

const initialState = {
  profile: local.get("profile") ? local.get("profile") : "",
  roles: [],
  userModeView: "User",
  webSocketService: null,
  titleI18n: dataLang[localStorage.getItem("language") || "vn"],
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.profile = local.get("profile");
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setUserModeView: (state, action) => {
      state.userModeView = action.payload;
    },
    setWalletInfo: (state, action) => {
      state.wallet = action.payload;
    },
    setWebSocketService: (state, action) => {
      state.webSocketService = action.payload;
    },
    setWebSocketService: (state, action) => {
      state.webSocketService = action.payload;
    },
    setTitleI18n: (state, action) => {
      state.titleI18n = action.payload;
    },
  },
});

export const {
  getProfile,
  setWeb3Provider,
  setRoles,
  setUserModeView,
  setWebSocketService,
  setTitleI18n,
} = accountSlice.actions;
export default accountSlice.reducer;
