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
    return response.data;
  }
);

export const addEvent = createAsyncThunk(
  'event/add',
  async ({ token, title, date, description, detail }) => {
    var data = JSON.stringify({
      title: title,
      date: date,
      description: description,
      detail: detail
    });
    var config = {
      method: 'post',
      url: 'http://localhost:3000/events',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: data
    };
    const response = await axios(config);
    return response.data;
  }
);

export const addInterest = createAsyncThunk(
  'event/addInterest',
  async ({ token, id }) => {
    console.log(id)
    var data = JSON.stringify({
      id: id
    });
    var config = {
      method: 'post',
      url: 'http://localhost:3000/interests',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: data
    };
    const response = await axios(config);
    return response.data;
  }
);

export const addParticipation = createAsyncThunk(
  'event/addParticipation',
  async ({ token, id }) => {
    console.log(id)
    var data = JSON.stringify({
      id: id
    });
    var config = {
      method: 'post',
      url: 'http://localhost:3000/participations',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: data
    };
    const response = await axios(config);
    return response.data;
  }
);


export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
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
      state.events = state.events.concat(action.payload);
    },
    [getAllEvents.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [addEvent.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addEvent.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.notification = 'Your event has been added !';
    },
    [addEvent.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [addInterest.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addInterest.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.notification = 'Your interest has been added !';
    },
    [addInterest.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [addParticipation.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addParticipation.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.notification = 'Your participation has been added !';
    },
    [addParticipation.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default eventSlice.reducer;