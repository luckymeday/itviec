import React, { useState } from 'react';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Details from "./pages/Details";
import { Switch, Route, Redirect } from "react-router-dom";

export default function App() {
  let [user, setUser] = useState({ isAuthenticated: true });

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Jobs} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/jobs" component={Jobs} />

        {/* <Route exact path="/jobs/:id" render={(props) => <Details jobTitle="engineer" props={props}/>}/> */}
        <ProtectedRoute exact path="/jobs/:id" render={(props) => <Details {...props} />} />

      </Switch>
      <footer className="footer">

      </footer>
    </div>
  );
}
