import React, { Component } from "react"
import { toast } from "react-toastify"
import InputField from "../components/InputField"
import { withRouter } from "react-router-dom"

let AWS = require('aws-sdk')

// Initialize the Amazon Cognito credentials provider.
AWS.config.update({
  region: 'eu-west-1', // Region
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:37bf26df-17cb-42c9-bb58-37ac3c587243'
  })
})

let cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()

class CreateUserForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    mobile: ''
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleCreateUser = this.handleCreateUser.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCreateUser(e) {
    const { username, email, password, mobile } = this.state

    e.preventDefault()

    let result = new Promise((resolve, reject) => {
      let params = {
        UserPoolId: 'eu-west-1_SIeVberiS',
        Username: username,
        TemporaryPassword: password,
        UserAttributes: [
          {
            Name: 'phone_number',
            Value: mobile
          },
          {
            Name: 'email',
            Value: email
          },
        ]
      }
      cognitoIdentityServiceProvider.adminCreateUser(params, function(err, data) {
        if(err) {
          // console.log(err, err.stack)
          alert(err.message)
        } else {
          alert('User successfully created.')
          console.log(data)
        }
      })
    })
    console.log(result)
  }

  render() {
    return (
      <>
      <h1>Create User</h1>
      <p>Provide user details below...</p>
      <form onSubmit={ this.handleCreateUser }>
        <InputField
          name="username"
          required
          type="text"
          label="Username"
          placeholder="joesoap"
          handleChange={this.handleChange}
        />
        <InputField
          name="email"
          required
          type="email"
          label="Email address"
          placeholder="joe@soap.com"
          handleChange={this.handleChange}
        />
        <InputField
          name="password"
          required
          type="password"
          label="Password"
          handleChange={this.handleChange}
        />
        <InputField
          name="mobile"
          required
          type="mobile"
          label="Phone Number"
          placeholder="+27836717865"
          handleChange={this.handleChange}
        />
        <button className="btn btn-success btn-lg">Create User</button>
      </form>
      </>
    )
  }
}

export default withRouter(CreateUserForm)