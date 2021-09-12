import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import JoinRoom from "./pages/call/JoinRoom";
import Header from "./components/Header";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/newcall" component={JoinRoom} />
      </Switch>
    </Router>
  );
};

export default App;
