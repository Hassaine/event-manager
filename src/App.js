import React, { useEffect } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/static/Navbar';
import PostCard from './components/Postcard';
import { SnackbarProvider } from 'notistack';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Landing from './pages/Landing'
import { getAllEvents, getUserInterestedEvents, getUserParticipationEvents } from './features/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/static/Footer';


function App() {

  const events = useSelector(state => state.event.events)
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();


  useEffect(() => {

    if (events.length === 0) dispatch(getAllEvents({ token: user?.token }));
    else if (!('userParticipate' in events[0]))
      dispatch(getUserParticipationEvents({ token: user?.token }));
    else if (!('userInterested' in events[0]))
      dispatch(getUserInterestedEvents({ token: user?.token }));

  }, [events, user]);


  return (
    <SnackbarProvider maxSnack={5}>
      <div className="App" style={{ backgroundColor: "#EEE2DC" }}>
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
      </div>
    </SnackbarProvider>
  );
}

export default App;
