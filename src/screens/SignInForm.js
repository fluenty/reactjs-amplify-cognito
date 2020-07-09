import React, { Component } from "react"
import { Auth } from "aws-amplify"
import { toast } from "react-toastify"
import InputField from "../components/InputField"

class SignInForm extends Component {
  state = {
    user: '',
    password: '',
    newPassword: '',
    choosePassword: false,
    cognitoUser: ''
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handlePasswordReset = this.handlePasswordReset.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  signIn() {
    const { username, password } = this.state
    Auth.signIn({
      username: username,
      password: password
    })
    .then((res) => {
      const cognitoUser = res
      // Complete new password challenge (if applicable).
      if(cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.setState({
          choosePassword: true,
          cognitoUser: cognitoUser
        })
      } else {
        toast.success("Logged in successfully!")
      }
    })
    .catch((err) => toast.error(`Error signing in: ${ err.message }`))
  }

  handleLogin(e) {
    e.preventDefault()

    this.signIn()
  }

  handlePasswordReset(e) {
    const { newPassword, cognitoUser } = this.state

    e.preventDefault()

    cognitoUser.completeNewPasswordChallenge(newPassword, [], {
      onSuccess: res => {
        toast.success("Password reset successfully!")
      },
      onFailure: err => toast.error(err.message)
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { choosePassword } = this.state
    if (choosePassword) {
        return (
          <form onSubmit={ this.handlePasswordReset }>
            <InputField
              name="new_password"
              required
              type="password"
              label="Choose a new password"
              handleChange={this.handleChange}
            />
            <button className="btn btn-success btn-lg">Sign In</button>
          </form>
        )
    } else {
      return (
        <form onSubmit={ this.handleLogin }>
          <InputField
            name="username"
            required
            type="text"
            label="Username"
            handleChange={this.handleChange}
          />
          <InputField
            name="password"
            required
            type="password"
            label="Password"
            handleChange={this.handleChange}
          />
          <button className="btn btn-success btn-lg">Sign In</button>
        </form>
      )
    }
  }
}

export default SignInForm
