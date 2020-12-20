import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import eventReducer from '../features/eventSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
  },
});
