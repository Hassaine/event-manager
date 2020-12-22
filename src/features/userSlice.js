import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { userAPI } from './userAPI'
import axios from 'axios';

// First, create the thunk
export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }) => {
    console.log(username, password);
    var data = JSON.stringify({ username: username, password: password });
    console.log(data);

    var config = {
      method: 'post',
      url: 'http://localhost:3000/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await axios(config);

    return response.headers;
  }
);

export const userProfile = createAsyncThunk(
  'user/userProfile',
  async ({ token }) => {
    var config = {
      method: 'get',
      url: 'http://localhost:3000/users/profile',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const response = await axios(config);

    return response.data;
  }
);

export const editProfile = createAsyncThunk(
  'user/editProfile',
  async ({ username, token, phone, password, email, birthday, type, sexe }) => {
    var data = JSON.stringify({
      username: username,
      password: password,
      type: type,
      birthday: birthday,
      phone: phone,
      email: email,
      sexe: sexe,
    });
    console.log(data);
    var config = {
      method: 'post',
      url: 'http://localhost:3000/users/profile',
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

export const uploadProfilePic = createAsyncThunk(
  'user/uploadProfilePic',
  async ({ token, file }) => {
    var data = new FormData();
    data.append('image', file);
    var config = {
      method: 'post',
      url: 'http://localhost:3000/users/profile/pic',
      headers: {
        Authorization: token,
      },
      data: data,
    };

    const response = await axios(config);

    return response.data;
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async ({ username, password, type, birthday, phone, email, sexe }) => {
    console.log(username, password, type, birthday, phone, email, sexe);
    var data = JSON.stringify({
      username: username,
      password: password,
      type: type,
      birthday: birthday,
      phone: phone,
      email: email,
      sexe: sexe,
    });
    console.log(data);

    var config = {
      method: 'post',
      url: 'http://localhost:3000/users/sign-up',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await axios(config);

    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null || JSON.parse(window.localStorage.getItem('user')),
    status: 'idle',
    error: null,
    notification: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      window.localStorage.removeItem('user');
    },
    clearErrors: (state) => {
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [login.pending]: (state, action) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = { ...state.user, token: action.payload.authorization };
      window.localStorage.setItem('user', JSON.stringify(state.user));
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = "Incorrect Username or Password";
    },

    [signUp.pending]: (state, action) => {
      state.status = 'loading';
    },
    [signUp.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.notification = 'Your accont has been created !';
    },
    [signUp.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    //get userProfile
    [userProfile.pending]: (state, action) => {
      state.status = 'loading';
    },
    [userProfile.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // state.notification = 'Your accont has been created !';
      state.user = { token: state.user.token, ...action.payload };
    },
    [userProfile.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    //update userProfile
    [editProfile.pending]: (state, action) => {
      state.status = 'loading';
    },
    [editProfile.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = { token: state.user.token, ...action.payload };
      state.notification = 'Your profile has been updated successfully';
    },

    [editProfile.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    // upload profile pics
    [uploadProfilePic.pending]: (state, action) => {
      state.status = 'loading';
    },
    [uploadProfilePic.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = {
        ...state.user,
        photosImagePath: action.payload.photosImagePath,
      };
      state.notification = 'Your profile pic has been update';
    },

    [uploadProfilePic.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const {
  setError,
  setNotification,
  clearErrors,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
