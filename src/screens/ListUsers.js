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

class ListUsers extends Component {
  state = {
    'users': []
  }

  constructor(props) {
    super(props)

    this.handleFetchUsers = this.handleFetchUsers.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.handleFetchUsers()
  }

  handleFetchUsers() {
    let params = {
      UserPoolId: 'eu-west-1_SIeVberiS'
    }
    cognitoIdentityServiceProvider.listUsers(params, function(err, data) {
      if(err) {
        alert(err.message)
      } else {
        console.log(data.Users)
        this.setState({
          users: data.Users
        })
      }
    }.bind(this))
  }

  handleDelete(user) {
    if(window.confirm('Are you sure? This cannot be undone!')) {
      let params = {
        UserPoolId: 'eu-west-1_SIeVberiS',
        Username: user.Username
      }
      cognitoIdentityServiceProvider.adminDeleteUser(params, function(err, data) {
        if(err) {
          alert(err.message)
        } else {
          this.handleFetchUsers()
        }
      }.bind(this))
    }
  }

  render() {
    return (
      <>
      <h1>List Users</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email address</th>
            <th>Phone number</th>
            <th>Date created</th>
            <th>Last modified</th>
            <th>Status</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.Username}</td>
                <td>{user.Attributes[2].Value}</td>
                <td>{user.Attributes[1].Value}</td>
                <td>{user.UserCreateDate.toDateString()}</td>
                <td>{user.UserLastModifiedDate.toDateString()}</td>
                <td>{user.UserStatus}</td>
                <td>
                  <button onClick={() => this.handleDelete(user)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </>
    )
  }
}

export default withRouter(ListUsers)