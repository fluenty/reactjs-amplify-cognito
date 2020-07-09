import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'
import AuthContainer from "./container/AuthContainer"
import Routes from "./components/Routes"

Amplify.configure(aws_exports)

class App extends Component {
  render() {
    return (
      <AuthContainer>
        <Routes />
      </AuthContainer>
    )
  }
}

export default App
