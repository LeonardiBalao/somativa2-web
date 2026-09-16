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
      const retorno = await firebase.auth().createUserWithEmailAndPassword(
        this.state.email,
        this.state.senha
      );
      await firebase.firestore().collection("usuario").doc(retorno.user.uid).set({
        nome: this.state.nome,
        sobrenome: this.state.sobrenome,
        nascimento: this.state.nascimento,
        uid: retorno.user.uid
      });
      let state = this.state;
      state.mensagem = 'Cadastro feito!';
      this.setState(state);
      this.props.history.push("/login");
    } catch (error) {
      let state = this.state;
      state.mensagem = 'Erro no cadastro: ' + error.message;
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
        <input
          type="text"
          size="20"
          placeholder="nome"
          onChange={(e) => this.setState({ nome: e.target.value })}
        />
        <br />
        <input
          type="text"
          size="20"
          placeholder="sobrenome"
          onChange={(e) => this.setState({ sobrenome: e.target.value })}
        />
        <br />
        <input
          type="date"
          size="20"
          placeholder="data de nascimento"
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
