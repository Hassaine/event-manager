import React from 'react';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import PostCard from './components/Postcard'
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
              <PostCard />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
