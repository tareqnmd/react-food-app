import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';
import Foods from './Components/Foods/Foods';
import CartReview from './Components/CartReview/CartReview';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Route exact path="/">
            <Foods></Foods>
          </Route>
          <Route path="/home">
            <Foods></Foods>
          </Route>
          <Route path="/cart">
            <CartReview></CartReview>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
