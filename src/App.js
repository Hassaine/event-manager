import React from 'react';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
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
              <div>i am the pricipal page</div>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
