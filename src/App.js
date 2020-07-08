import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import SignInForm from './SignInForm';

Amplify.configure(aws_exports);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <SignInForm />;
  }
}

export default App;