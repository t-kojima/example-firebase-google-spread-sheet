import React, { Component } from 'react';
import firebase from './firebase';

const auth = firebase.auth();
const db = firebase.firestore();
const usersRef = db.collection('users');

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    auth.onAuthStateChanged((firebaseUser) => {
      if (!(firebaseUser && firebaseUser.displayName)) {
        auth.signOut();
        return;
      }
      const { email, uid, displayName } = firebaseUser;
      this.setState({ uid, email, displayName });
    });
  }
  signIn = (providerName) => {
    const provider = new firebase.auth[`${providerName}AuthProvider`]();
    auth.signInWithRedirect(provider);
  };
  signOut = () => {
    auth.signOut();
    console.log('Sign Out done');
  }
  onClick = () => {
    auth.currentUser.getIdToken(true)
      .then((token) => {
        const url = `${process.env.REACT_APP_CLOUD_FUNCTIONS_ENDPOINT}/insertData`;
        const headers = { 'Firebase-User-Token': token };
        return fetch(url, { headers });
      })
      .then(res => res.text())
      .then(message => console.log(message));
  }
  render() {
    const { uid, email, displayName } = this.state;
    return (
      <div className="App">
        {
          uid ? <button type="button" onClick={this.signIn.bind(this, 'Google')}>SignIn</button>
            : <button type="button" onClick={this.onClick}>hit me plz</button>
        }
        <button type="button" onClick={this.signOut}>SignOut</button>
      </div>
    );
  }
}
