import React, { Component } from 'react';
import firebase from './firebase';

const auth = firebase.auth();

const signIn = (providerName) => {
  const provider = new firebase.auth[`${providerName}AuthProvider`]();
  auth.signInWithRedirect(provider);
};

export default class App extends Component {
  onClick = () => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (!(firebaseUser && firebaseUser.displayName)) {
        signIn('Google');
        return;
      }
      const { email, uid, displayName } = firebaseUser;
      console.log(`${displayName} ${email} ${uid}`);

      auth.currentUser.getIdToken(true)
        .then((token) => {
          const url = `${process.env.REACT_APP_CLOUD_FUNCTIONS_ENDPOINT}/insertData`;
          const headers = { 'Firebase-User-Token': token };
          return fetch(url, { headers });
        })
        .then(res => res.text())
        .then(message => console.log(message));
    });
  }
  render() {
    return (
      <div className="App">
        <button type="button" onClick={this.onClick}>hit me plz</button>
      </div>
    );
  }
}
