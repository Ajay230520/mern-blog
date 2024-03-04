import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '/src/redux/user/userSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    // other reducers if any
  },
});

export default store;