import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/static/Navbar';
import PostCard from './components/Postcard';
import { SnackbarProvider } from 'notistack';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Profile from './pages/Profile';
import Landing from './pages/Landing'

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <div className="App">
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
