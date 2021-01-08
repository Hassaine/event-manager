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
  async ({ token, title, date, description, detail, file }) => {
    var model = JSON.stringify({
      title: title,
      date: date,
      description: description,
      detail: detail,
    });
    var data = new FormData();
    data.append('image', file);
    data.append('event', model);
    var config = {
      method: 'post',
      url: 'http://localhost:3000/events',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: token,
      },
      data: data,
    };
    const response = await axios(config);
    return response.data;
  }
);

export const editEvent = createAsyncThunk(
  'event/edit',
  async ({ id, token, title, date, description, detail, file, photo }) => {
    var model = JSON.stringify({
      id: id,
      title: title,
      date: date,
      description: description,
      detail: detail,
      photo: photo,
    });
    var data = new FormData();
    data.append('image', file);
    data.append('event', model);
    var config = {
      method: 'put',
      url: 'http://localhost:3000/events',
      headers: {
        'Content-Type': 'multipart/form-data',
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

export const removeParticipation = createAsyncThunk(
  'event/removeParticipation',
  async ({ token, id }) => {
    var data = JSON.stringify({
      id: id,
    });
    var config = {
      method: 'delete',
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

export const removeInterest = createAsyncThunk(
  'event/removeInterest',
  async ({ token, id }) => {
    var data = JSON.stringify({
      id: id,
    });
    var config = {
      method: 'delete',
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
    keyword: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setKeywordState: (state, action) => {
      state.keyword = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload.events;
    }
  },
  extraReducers: {
    [getAllEvents.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getAllEvents.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      if (action.payload.length !== 0) state.events = action.payload;
    },
    [getAllEvents.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    //addEvent
    [addEvent.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addEvent.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.events.push(action.payload);
      state.notification = 'Your event has been added !';
    },
    [addEvent.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    //editEvent
    [editEvent.pending]: (state, action) => {
      state.status = 'loading';
    },
    [editEvent.fulfilled]: (state, action) => {
      state.status = 'succeeded';

      //get the updated event
      const eventIndex = state.events.findIndex(
        (event) => event.id === action.payload.id
      );

      state.events[eventIndex] = action.payload;
      state.notification = 'Your event has been updated !';
    },
    [editEvent.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    //add Intrest
    [addInterest.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addInterest.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.events.map((event) => {
        if (event.id === action.payload.id) {
          event.userInterested = true;
          event.nbInterested = event.nbInterested + 1;
        }
      });
      state.notification = 'Your interest has been added !';
    },
    [addInterest.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    //add participation

    [addParticipation.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addParticipation.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.events.map((event) => {
        if (event.id === action.payload.id) {
          event.userParticipate = true;
          event.nbParticipents = event.nbParticipents + 1;
        }
      });
      state.notification = 'Your participation has been added !';
    },
    [addParticipation.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    //remove Particiaption
    [removeParticipation.pending]: (state, action) => {
      state.status = 'loading';
    },
    [removeParticipation.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.events.map((event) => {
        if (event.id === action.payload) {
          event.userParticipate = false;
          event.nbParticipents = event.nbParticipents - 1;
        }
      });
      state.notification = 'Your participation has been removed !';
    },
    [removeParticipation.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    //remove Particiaption
    [removeInterest.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [removeInterest.pending]: (state, action) => {
      state.status = 'loading';
    },
    [removeInterest.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.events.map((event) => {
        if (event.id === action.payload) {
          event.userInterested = false;
          event.nbInterested = event.nbInterested - 1;
        }
      });
      state.notification = 'Your participation has been removed !';
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

export const {
  setError,
  setNotification,
  setKeywordState,
  setEvents
} = eventSlice.actions;

//Selector
export function getParticipations(state) {
  return state.event.events.filter((e) => e.userParticipate === true);
}

export function getInterests(state) {
  return state.event.events.filter((e) => e.userInterested === true);
}

export function getEventsByKeyword(state) {
  if (state.event.keyword === null || state.event.keyword === '')
    return state.event.events;
  else
    return state.event.events.filter(
      (e) =>
        e.title.toLowerCase().includes(state.event.keyword) ||
        e.description.toLowerCase().includes(state.event.keyword) ||
        e.detail.toLowerCase().includes(state.event.keyword)
    );
}

export function getEventsByUserName(state, userName) {
  return state.event.events.filter((e) => e.ownerName === userName);
}

export default eventSlice.reducer;
