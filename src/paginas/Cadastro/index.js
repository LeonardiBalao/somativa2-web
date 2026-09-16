import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      nome: '',
      sobrenome: '',
      nascimento: '',
      mensagem: ''
    };
    this.gravar = this.gravar.bind(this);
  }

  async gravar() {
    try {
      const email = this.state.email.trim();
      const senha = this.state.senha;
      const retorno = await firebase.auth().createUserWithEmailAndPassword(email, senha);
      await firebase.firestore().collection("usuario").doc(retorno.user.uid).set({
        nome: this.state.nome,
        sobrenome: this.state.sobrenome,
        nascimento: this.state.nascimento,
        uid: retorno.user.uid
      });
      this.props.history.push("/principal");
    } catch (error) {
      let state = this.state;
      if (error.code === 'auth/email-already-in-use') {
        state.mensagem = 'Esse e-mail ja esta em uso. Vai no Login.';
      } else {
        state.mensagem = 'Erro no cadastro: ' + error.message;
      }
      this.setState(state);
    }
  }

  render() {
    return (
      <div>
        <h1>Cadastro - Matheus Balão</h1>
        <Link to="/login">Ja tem conta? Login</Link>
        <br /><br />
        <input
          type="text"
          size="20"
          placeholder="e-mail"
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <br />
        <input
          type="password"
          size="20"
          placeholder="senha"
          value={this.state.senha}
          onChange={(e) => this.setState({ senha: e.target.value })}
        />
        <br />
        <input
          type="text"
          size="20"
          placeholder="nome"
          value={this.state.nome}
          onChange={(e) => this.setState({ nome: e.target.value })}
        />
        <br />
        <input
          type="text"
          size="20"
          placeholder="sobrenome"
          value={this.state.sobrenome}
          onChange={(e) => this.setState({ sobrenome: e.target.value })}
        />
        <br />
        <input
          type="date"
          size="20"
          placeholder="data de nascimento"
          value={this.state.nascimento}
          onChange={(e) => this.setState({ nascimento: e.target.value })}
        />
        <br />
        <button onClick={this.gravar}>Cadastrar</button>
        <p>{this.state.mensagem}</p>
      </div>
    );
  }
}

export default Cadastro;
