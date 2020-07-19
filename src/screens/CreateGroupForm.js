import React, { Component } from "react"
import { Auth } from "aws-amplify"
import { toast } from "react-toastify"
import InputField from "../components/InputField"

let AWS = require('aws-sdk')

// Initialize the Amazon Cognito credentials provider.
AWS.config.update({
  region: 'eu-west-1', // Region
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:37bf26df-17cb-42c9-bb58-37ac3c587243'
  })
})

let cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider()

class CreateGroup extends Component {
  state = {
    name: '',
    description: ''
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const { name, description } = this.state
    e.preventDefault()

    let params = {
      GroupName: name,
      UserPoolId: 'eu-west-1_SIeVberiS',
      Description: description,
      Precedence: 1,
      // RoleArn: 'STRING_VALUE'
    };
    cognitoIdentityServiceProvider.createGroup(params, function(err, data) {
      if (err) {
        alert(err.message);
      } else {
        console.log(data);
      }
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <InputField
          name="name"
          required
          type="text"
          label="Name"
          handleChange={this.handleChange}
        />
        <InputField
          name="description"
          required
          type="text"
          label="Description"
          handleChange={this.handleChange}
        />
        <button className="btn btn-success btn-lg">Create Group</button>
      </form>
    )
  }
}

export default CreateGroup