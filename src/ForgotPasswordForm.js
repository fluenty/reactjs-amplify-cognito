import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      code: '',
      instructionsSent: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSendInstructions = this.handleSendInstructions.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
  }

  handleSendInstructions(e) {
    const { email } = this.state;
    e.preventDefault();

    // Send password reset instructions.
    Auth.forgotPassword(email)
      .then(res => {
        console.log(res)
        this.setState({
          instructionsSent: true
        });
      })
      .catch(err => alert(err.message))
  }

  handleResetPassword(e) {
    const { email, password, code } = this.state;
    e.preventDefault();

    // Reset password.
    Auth.forgotPasswordSubmit(email, code, password)
      .then(res => {
        console.log(res)
        alert('redirect back to login page')
      })
      .catch(err => alert(err.message))
  }
  
  handleChange(e) {
    if (e.target.id === 'email') {
      this.setState({
        email: e.target.value
      });
    } else if (e.target.id === 'password') {
      this.setState({
        password: e.target.value
      });
    } else if (e.target.id === 'code') {
      this.setState({
        code: e.target.value
      });
    }
  }

  render() {
    const { instructionsSent } = this.state;
    if (instructionsSent) {
        return (
          <div className="container">
            <div className="row mt-4">
              <div className="col-12">
                <form onSubmit={ this.handleResetPassword }>
                  <div className="form-group">
                    <label>Password</label>
                    <input id='password' type='password' onChange={ this.handleChange } className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Verification code</label>
                    <input id='code' type='text' onChange={ this.handleChange } className="form-control" required />
                  </div>
                  <button className="btn btn-success btn-lg">Send Reset Password Instructions</button>
                </form>
              </div>
            </div>
          </div>
        );
    } else {
      return (
        <div className="container">
          <div className="row mt-4">
            <div className="col-12">
              <form onSubmit={ this.handleSendInstructions }>
                <div className="form-group">
                  <label>Email address</label>
                  <input id='email' type='text' onChange={ this.handleChange } className="form-control" required />
                </div>
                <button className="btn btn-success btn-lg">Send Reset Password Instructions</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ForgotPasswordForm;