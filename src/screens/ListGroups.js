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

class ListGroups extends Component {
  state = {
    'groups': []
  }

  constructor(props) {
    super(props)

    this.handleFetchGroups = this.handleFetchGroups.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.handleFetchGroups()
  }

  handleFetchGroups() {
    let params = {
      UserPoolId: 'eu-west-1_SIeVberiS'
      // Limit: 'NUMBER_VALUE',
      // NextToken: 'STRING_VALUE'
    };
    cognitoIdentityServiceProvider.listGroups(params, function(err, data) {
      if(err) {
        alert(err.message)
      } else {
        console.log(data.Groups)
        this.setState({
          groups: data.Groups
        })
      }
    }.bind(this))
  }

  handleDelete(group) {
    if(window.confirm('Are you sure? This cannot be undone!')) {
      let params = {
        UserPoolId: 'eu-west-1_SIeVberiS',
        GroupName: group.GroupName
      }
      cognitoIdentityServiceProvider.deleteGroup(params, function(err, data) {
        if(err) {
          alert(err.message)
        } else {
          this.handleFetchGroups()
        }
      }.bind(this))
    }
  }

  render() {
    return (
      <>
      <h1>List Groups</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Group name</th>
            <th>Description</th>
            <th>Precedence</th>
            <th>Date created</th>
            <th>Last modified</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {this.state.groups.map((group, index) => {
            return (
              <tr key={index}>
                <td>{group.GroupName}</td>
                <td>{group.Description}</td>
                <td>{group.Precedence}</td>
                <td>{group.CreationDate.toDateString()}</td>
                <td>{group.LastModifiedDate.toDateString()}</td>
                <td>
                  <button onClick={() => this.handleDelete(group)} className="btn btn-danger">Delete</button>
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

export default withRouter(ListGroups)