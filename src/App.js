import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error from './Components/Error';
import Weather from './Components/Weather';
import CityId from './Components/CityId';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Weather</h1> 
        <Switch>
          <Route path='/' exact component={Weather} /> 
          <Route path='/:id' component={CityId} />
          <Route path='*' component={Error}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
