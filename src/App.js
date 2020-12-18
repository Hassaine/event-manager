import React from 'react';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import PostCard from './components/Postcard'
import { SnackbarProvider } from "notistack";
import Home from "./pages/Home"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <SnackbarProvider maxSnack={5}>
    <div className="App">
      <Router>
        <Switch>
            <Route path="/SignUp">
              <SignUp />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </div>
    </SnackbarProvider>
  );
}

export default App;
