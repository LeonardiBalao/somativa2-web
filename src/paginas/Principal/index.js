import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      sobrenome: '',
      nascimento: '',
      mensagem: 'Carregando...'
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(async (usuario) => {
      if (usuario) {
        try {
          var doc = await firebase.firestore().collection("usuario").doc(usuario.uid).get();
          if (doc.exists) {
            this.setState({
              nome: doc.data().nome,
              sobrenome: doc.data().sobrenome,
              nascimento: doc.data().nascimento,
              mensagem: ''
            });
          } else {
            this.setState({
              mensagem: 'Usuario logado, mas nao achou dados no Firestore.'
            });
          }
        } catch (error) {
          this.setState({
            mensagem: 'Erro ao ler Firestore: ' + error.message
          });
        }
      } else {
        this.props.history.push("/login");
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    return (
      <div>
        <h1>Principal</h1>
        <p>Nome: {this.state.nome}</p>
        <p>Sobrenome: {this.state.sobrenome}</p>
        <p>Data de nascimento: {this.state.nascimento}</p>
        <p>{this.state.mensagem}</p>
        <br />
        <Link to="/login">Sair / Login</Link>
      </div>
    );
  }
}

export default Principal;
