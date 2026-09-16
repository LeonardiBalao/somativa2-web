import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Cadastro from './paginas/Cadastro';
import Login from './paginas/Login';
import Principal from './paginas/Principal';

const Rotas = () => {
  return (
    <BrowserRouter>
      <Route exact={true} path="/" component={Login} />
      <Route exact={true} path="/cadastro" component={Cadastro} />
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/principal" component={Principal} />
    </BrowserRouter>
  );
}

export default Rotas;
