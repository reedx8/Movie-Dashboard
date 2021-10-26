import React from "react";
import Sidebar from "./components/Sidebar";
import Homepage from "./components/Homepage";
import Moviespage from './components/Moviespage';
import Showspage from './components/Showspage';
import {BrowserRouter as Switch, Route, BrowserRouter} from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <BrowserRouter>
        <Switch>
          <Route path='/' component={Homepage} exact/>
          <Route path='/movies' component={Moviespage} exact/>
          <Route path='/shows' component={Showspage} exact/>
        </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
