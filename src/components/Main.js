// src/components/Main.js

//Esta estructurado para que se menajen las rutas
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import OfferStatus from '../pages/OfferStatus';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/offer-status" component={OfferStatus} />
      </Switch>
    </main>
  );
};

export default Main;
