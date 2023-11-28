import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import swData from './data';
import Card from './components/Card';

function renderMovieCards() {
  return swData.map((movie, index) => (
    <Card key={index} movie={movie} />
  ));
}

function App() {
  return (
    <div className="container">
      <div className="row">
        {renderMovieCards()}
      </div>
    </div>
  );
}

export default App;