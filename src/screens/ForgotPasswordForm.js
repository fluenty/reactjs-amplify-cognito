import React, { Component } from "react"
import { Auth } from "aws-amplify"
import { toast } from "react-toastify"
import InputField from "../components/InputField"
import { withRouter } from "react-router-dom"

class ForgotPasswordForm extends Component {
  state = {
    email: '',
    password: '',
    code: '',
    instructionsSent: false
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSendInstructions = this.handleSendInstructions.bind(this)
    this.handleResetPassword = this.handleResetPassword.bind(this)
  }

  handleSendInstructions(e) {
    const { email } = this.state
    e.preventDefault()

    // Send password reset instructions.
    Auth.forgotPassword(email)
      .then(res => {
        toast.success("Verification code sent successfully!")
        this.setState({
          instructionsSent: true
        })
      })
      .catch(err => toast.error(err.message))
  }

  handleResetPassword(e) {
    const { email, password, code } = this.state
    e.preventDefault()

    // Reset password.
    Auth.forgotPasswordSubmit(email, code, password)
      .then(res => {
        toast.success("Password reset successfully!")
        this.props.history.push("/")
      })
      .catch(err => toast.error(err.message))
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { instructionsSent } = this.state
    if (instructionsSent) {
        return (
          <form onSubmit={ this.handleResetPassword }>
            <InputField
              name="password"
              required
              type="password"
              label="Password"
              handleChange={this.handleChange}
            />
            <InputField
              name="code"
              required
              type="text"
              label="Verification Code"
              handleChange={this.handleChange}
            />
            <button className="btn btn-success btn-lg">Send Reset Password Instructions</button>
          </form>
        )
    } else {
      return (
        <form onSubmit={ this.handleSendInstructions }>
          <InputField
            name="email"
            required
            type="email"
            label="Email Address"
            handleChange={this.handleChange}
          />
          <button className="btn btn-success btn-lg">Send Reset Password Instructions</button>
        </form>
      )
    }
  }
}

export default withRouter(ForgotPasswordForm)
