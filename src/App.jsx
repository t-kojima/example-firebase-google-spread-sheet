import React, { Component } from 'react';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
    };
  }
  componentWillMount() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            gapi.auth2
              .getAuthInstance()
              .isSignedIn.listen(this.updateSigninStatus);
            this.updateSigninStatus(
              gapi.auth2.getAuthInstance().isSignedIn.get(),
            );
            this.setState({ ready: true });
          });
      });
    };
    document.body.appendChild(script);
  }
  updateSigninStatus = (isSignedIn) => {
    this.setState({ isSignedIn });
    isSignedIn && this.appendData();
  };
  appendData = () => gapi.client.sheets.spreadsheets.values.append(
    {
      spreadsheetId: process.env.REACT_APP_SHEET_ID,
      range: 'A1:B1',
      valueInputOption: 'RAW',
    },
    {
      majorDimension: 'COLUMNS',
      values: [['慈愛号'], ['雌雄号']],
    },
  );
  signIn = () => gapi.auth2.getAuthInstance().signIn();
  signOut = () => gapi.auth2.getAuthInstance().signOut();
  render() {
    const { ready, isSignedIn } = this.state;
    return (
      <div className="App">
        {ready && isSignedIn ? (
          <button type="button" onClick={this.signOut}>
            SignOut
          </button>
        ) : (
          <button type="button" onClick={this.signIn}>
            Authorize
          </button>
        )}
      </div>
    );
  }
}
