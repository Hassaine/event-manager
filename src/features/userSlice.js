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

export const signUp = createAsyncThunk(
  'user/signUp',
  async ({ username, password, type, birthday, phone, email, sexe}) => {
    console.log(username, password, type, birthday, phone, email, sexe );
    var data = JSON.stringify({ username: username, password: password, type: type, birthday: birthday, phone: phone, email: email, sexe: sexe});
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
    user: null || window.localStorage.getItem("user"),
    status: 'idle',
    error: null,
    notification: null,
  },
  reducers: {},
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [login.pending]: (state, action) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.user = { ...state.user, token: action.payload.authorization };
      window.localStorage.setItem("user", JSON.stringify(state.user));
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
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
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = state => state.counter.value;

export default userSlice.reducer;
