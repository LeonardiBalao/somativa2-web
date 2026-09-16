import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      sobrenome: '',
      nascimento: ''
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async (usuario) => {
      if (usuario) {
        var doc = await firebase.firestore().collection("usuario").doc(usuario.uid).get();
        if (doc.exists) {
          this.setState({
            nome: doc.data().nome,
            sobrenome: doc.data().sobrenome,
            nascimento: doc.data().nascimento
          });
        }
      } else {
        this.props.history.push("/login");
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Principal</h1>
        <p>Nome: {this.state.nome}</p>
        <p>Sobrenome: {this.state.sobrenome}</p>
        <p>Data de nascimento: {this.state.nascimento}</p>
        <br />
        <Link to="/login">Sair / Login</Link>
      </div>
    );
  }
}

export default Principal;
