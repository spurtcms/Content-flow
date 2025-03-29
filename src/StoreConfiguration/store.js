import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer,} from 'redux-persist'
import rootReducer from './rootReducers';
import storage from "./customStorage";



const persistConfig = {
  key: "root",
  storage,
  blacklist: ["register","err"],
  timeout: 10000,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
          ignoredPaths: ['register', "err"],
        },
      }),
  });
}


export function persistAppStore(store) {
  return persistStore(store);
}


