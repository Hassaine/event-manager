import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllEvents = createAsyncThunk(
  'event/getAll',
  async ({ token }) => {
    var config = {
      method: 'get',
      url: 'http://localhost:3000/events',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
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
      detail: detail,
    });
    var config = {
      method: 'post',
      url: 'http://localhost:3000/events',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: data,
    };
    const response = await axios(config);
    return response.data;
  }
);

export const addInterest = createAsyncThunk(
  'event/addInterest',
  async ({ token, id }) => {
    var data = JSON.stringify({
      id: id,
    });
    var config = {
      method: 'post',
      url: 'http://localhost:3000/interests',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: data,
    };
    const response = await axios(config);
    return response.data;
  }
);

export const addParticipation = createAsyncThunk(
  'event/addParticipation',
  async ({ token, id }) => {
    var data = JSON.stringify({
      id: id,
    });
    var config = {
      method: 'post',
      url: 'http://localhost:3000/participations',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      data: data,
    };
    const response = await axios(config);
    return response.data;
  }
);

export const getUserParticipationEvents = createAsyncThunk(
  'event/getUserParticipationEvents',
  async ({ token }) => {
    var config = {
      method: 'get',
      url: 'http://localhost:3000/users/participations',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
    const response = await axios(config);

    return response.data;
  }
);

export const getUserInterestedEvents = createAsyncThunk(
  'event/getUserInterestedEvents',
  async ({ token }) => {
    var config = {
      method: 'get',
      url: 'http://localhost:3000/users/intrests',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
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
      state.events.map((event) => {
        if (event.id === action.payload.id) {
          event.userInterested = !event.userInterested;
        }
      });
      state.notification = 'Your interest has been added !';
    },
    [addInterest.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [getUserParticipationEvents.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getUserParticipationEvents.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.events.map((e) => {
        e.userParticipate = false;
        action.payload.map((ev) => {
          if (ev.event.id === e.id) e.userParticipate = true;
        });
      });
    },
    [getUserParticipationEvents.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [getUserInterestedEvents.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getUserInterestedEvents.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.events.map((e) => {
        e.userInterested = false;
        action.payload.map((ev) => {
          if (ev.event.id === e.id) e.userInterested = true;
        });
      });
    },
    [getUserInterestedEvents.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

//Selector
export function getParticipations(state) {
  return state.event.events.filter((e) => e.userParticipate === true);
}

export function getInterests(state) {
  return state.event.events.filter((e) => e.userInterested === true);
}

export default eventSlice.reducer;
