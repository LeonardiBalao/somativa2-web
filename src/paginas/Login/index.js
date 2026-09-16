import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      mensagem: ''
    };
    this.acessar = this.acessar.bind(this);
  }

  async acessar() {
    try {
      await firebase.auth().signInWithEmailAndPassword(
        this.state.email,
        this.state.senha
      );
      this.props.history.push("/principal");
    } catch (error) {
      let state = this.state;
      state.mensagem = 'Usuário não está cadastrado';
      this.setState(state);
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <Link to="/cadastro">Criar conta</Link>
        <br /><br />
        <input
          type="text"
          size="20"
          placeholder="e-mail"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <br />
        <input
          type="password"
          size="20"
          placeholder="senha"
          onChange={(e) => this.setState({ senha: e.target.value })}
        />
        <br />
        <button onClick={this.acessar}>Acessar</button>
        <p>{this.state.mensagem}</p>
      </div>
    );
  }
}

export default Login;
