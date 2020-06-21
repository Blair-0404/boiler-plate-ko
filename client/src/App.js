import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import './App.css';
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}>
            {/*<LandingPage />*/}
          </Route>
          <Route exact path="/login" component={LoginPage}>
            {/*<LoginPage />*/}
          </Route>
          <Route exact path="/register" component={RegisterPage}>
            {/*<RegisterPage />*/}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}




export default App;
