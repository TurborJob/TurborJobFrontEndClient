import {
  configureStore,
} from "@reduxjs/toolkit";
import rootReducer from "./rootReducers";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
