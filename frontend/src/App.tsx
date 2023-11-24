import React from 'react';
import './App.sass';
import {Route, BrowserRouter as Router} from "react-router-dom";

function App() {
  return <Router>
    <div className="App">
      <Route path="/about"></Route>
      <Route path="/users"></Route>
      <Route path="/"></Route>
    </div>
  </Router>
}

export default App;
