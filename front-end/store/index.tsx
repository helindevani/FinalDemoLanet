'use client';
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./supplierSlice";
import productReducer from "./productSlice";
import staffReducer from "./staffSlice";
import bookingReducer from "./bookingSlice";
import orderReducer from "./orderSlice";
import connectionReducer from "./connectionSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token", "status"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    category: categoryReducer,
    brand : brandReducer,
    product : productReducer,
    staff : staffReducer,
    booking:bookingReducer,
    order : orderReducer,
    connection : connectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
