import React from "react";
import Sidebar from "./components/Sidebar";

import Homepage from "./components/Homepage";
import Moviespage from "./components/Moviespage";
import Showspage from "./components/Showspage";
import Authorspage from "./components/Authorspage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// The dashboards entry point, displays each of the pages depending on which route is selected by user
function App() {
  return (
    <div className="App">
      {/* <Sidebar /> */}
      {/* <Homepage /> */}
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/movies" component={Moviespage} exact />
          <Route path="/shows" component={Showspage} exact />
          <Route path="/authors" component={Authorspage} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
