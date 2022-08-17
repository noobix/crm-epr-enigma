import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistCombineReducers,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authUser", "loginUser"],
};
const _persistedReducer = persistCombineReducers(persistConfig, {
  auth: authSlice,
  user: userSlice,
});
const store = configureStore({
  reducer: { _persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export default store;
