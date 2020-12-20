import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllEvents = createAsyncThunk(
  'event/getAll',
  async ({token}) => {
    var config = {
      method: 'get',
      url: 'http://localhost:3000/events',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    };
    const response = await axios(config);
    return response;
  }
);

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    event: null,
    error: null,
    notification: null,
  },
  reducers: {},
  extraReducers: {
    [getAllEvents.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getAllEvents.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.event = { ...state.event, events: action.payload };
    },
    [getAllEvents.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default eventSlice.reducer;