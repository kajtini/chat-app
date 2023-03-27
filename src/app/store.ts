import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import modalReducer from "../features/modal/modalSlice";
import loadingReducer from "../features/loading/loadingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
