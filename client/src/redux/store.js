import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './user/userSlice.js';
import { persistReducer,persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { getDefaultMiddleware } from '@reduxjs/toolkit'; // Correct import

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: getDefaultMiddleware({
  //   serializableCheck: false
  // }) // Correct usage of getDefaultMiddleware
});

// Assuming you've imported persistStore from redux-persist elsewhere
export const persistor = persistStore(store);
