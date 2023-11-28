import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import swData from './data';
import Card from './components/Card';
import Details from './components/Details';

function App() {
  return (
    <Router>
      <div className="container">
        <div className="row">
          <Switch>
            <Route path="/" exact>
              {swData.map((movie, index) => (
                <Card key={index} movie={movie} />
              ))}
            </Route>
            <Route path="/details/:episode" component={Details} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;