import React, { useEffect } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/static/Navbar';
import PostCard from './components/Postcard';
import { SnackbarProvider } from 'notistack';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Landing from './pages/Landing';
import {
  getAllEvents,
  getUserInterestedEvents,
  getUserParticipationEvents,
} from './features/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from './features/userSlice';
import NotificationHandler from './components/static/NotificationHandler';
import {
  setError as setErrorUser,
  setNotification as setNotificationUser,
} from './features/userSlice';
import {
  setError as setErrorEvent,
  setNotification as setNotificationEvent,
} from './features/userSlice';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { setEvents } from './features/eventSlice';

function App() {
  const events = useSelector((state) => state.event.events);
  const user = useSelector((state) => state.user.user);

  // user Error
  const userError = useSelector((state) => state.user.error);
  const userNotification = useSelector((state) => state.user.notification);

  // event Error
  const eventError = useSelector((state) => state.event.error);
  const eventNotification = useSelector((state) => state.event.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("hna")
    if (user) {
      if (events.length === 0) dispatch(getAllEvents({ token: user?.token }));
      else if (!('userParticipate' in events[0]))
        dispatch(getUserParticipationEvents({ token: user?.token }));
      else if (!('userInterested' in events[0]))
        dispatch(getUserInterestedEvents({ token: user?.token }));

      if (!('phone' in user)) {
        dispatch(userProfile({ token: user.token }));
      }
    } else if (events.length !== 0) dispatch(setEvents({ events: [] }));
  }, [user]);

  return (
    <SnackbarProvider maxSnack={5}>
      <div className="App" style={{ backgroundColor: '#EEE2DC' }}>
        <ReactNotification />
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/SignUp">
              <SignUp />
            </Route>
            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Landing">
              <Landing />
            </Route>
            <Route exact path="/profile" Y component={Profile} />
          </Switch>
        </Router>

        {/* add notification handler  globally */}
        {/* notification handler for the user slice */}
        <NotificationHandler
          error={userError}
          setError={setErrorUser}
          notification={userNotification}
          setNotification={setNotificationUser}
        />
        {/* notification handler for the event slice */}
        <NotificationHandler
          error={eventError}
          setError={setErrorEvent}
          notification={eventNotification}
          setNotification={setNotificationEvent}
        />
      </div>
    </SnackbarProvider>
  );
}

export default App;
