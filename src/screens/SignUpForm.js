import React, { Component } from "react"
import { Auth } from "aws-amplify"
import { toast } from "react-toastify"
import InputField from "../components/InputField"
import { withRouter } from "react-router-dom"

class SignUpForm extends Component {
  state = {
    username: '',
    password: '',
    phoneNumber: '',
    confirmationCode: '',
    verified: false
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.signUp = this.signUp.bind(this)
    this.confirmSignUp = this.confirmSignUp.bind(this)
  }

  signUp() {
    const { username, password, phoneNumber } = this.state

    Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: username,
        phone_number: phoneNumber
      }
    })
    .then(() => {
      toast.success("Please verify your email")
      this.setState({
        password: '',
        phoneNumber: '',
        verified: true
      })
    })
    .catch((err) => toast.error(`Error signing up: ${ err.message }`))
  }

  confirmSignUp() {
    const { username, confirmationCode } = this.state
    Auth.confirmSignUp(username, confirmationCode)
    .then(() => {
      this.props.history.push("/")
    })
    .catch((err) => toast.error(`Error confirming sign up - ${ err.message }`))
  }

  handleSubmit(e) {
    const { verified } = this.state

    e.preventDefault()

    if (verified) {
      this.confirmSignUp()
    } else {
      this.signUp()
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { verified } = this.state
    if (verified) {
      return (
        <form onSubmit={ this.handleSubmit }>
            <InputField
              name="confirmationCode"
              required
              type="text"
              label="Confirmation Code"
              handleChange={this.handleChange}
            />
          <button className="btn btn-success btn-lg">Confirm Sign up</button>
        </form>
      )
    } else {
      return (
        <form onSubmit={ this.handleSubmit }>
          <InputField
            name="username"
            required
            type="text"
            label="Username"
            handleChange={this.handleChange}
            placeholder="joe@soap.com"
          />
          <InputField
            name="password"
            required
            type="password"
            label="Password"
            handleChange={this.handleChange}
          />
          <InputField
            name="phoneNumber"
            required
            type="text"
            label="Phone Number"
            handleChange={this.handleChange}
            placeholder="+27836717865"
          />
          <button className="btn btn-success btn-lg">Sign up</button>
        </form>
      )
    }
  }
}

export default withRouter(SignUpForm)
