/* eslint-disable no-undef */
import React, { Component } from 'react';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      }).catch((error) => {
        console.log(JSON.stringify(error, null, 2));
      });
    });
  }
  updateSigninStatus = (isSignedIn) => {
    this.setState({ isSignedIn });
    if (isSignedIn) {
      this.listMajors();
    }
  }
  listMajors() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      range: 'Class Data!A2:E',
    }).then((response) => {
      const range = response.result;
      if (range.values.length > 0) {
        console.log('Name, Major:');
        range.values.forEach(value => console.log(`${value[0]} ${value[4]}`));
      } else {
        console.log('No data found.');
      }
    }).catch((response) => {
      console.log(`Error: ${response.result.error.message}`);
    });
  }
  signIn = () => gapi.auth2.getAuthInstance().signIn();
  signOut = () => gapi.auth2.getAuthInstance().signOut();
  render() {
    const { isSignedIn } = this.state;
    return (
      <div className="App">
        {
          isSignedIn
            ? <button type="button" onClick={this.signOut}>SignOut</button>
            : <button type="button" onClick={this.signIn}>Authorize</button>
        }
      </div>
    );
  }
}
