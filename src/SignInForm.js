import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: '',
      newPassword: '',
      choosePassword: false,
      cognitoUser: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePasswordReset = this.handlePasswordReset.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    const { username, password } = this.state;
    Auth.signIn({
      username: username,
      password: password
    })
    .then((res) => {
      let cognitoUser = res
      // Complete new password challenge (if applicable).
      if(cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.setState({
          choosePassword: true,
          cognitoUser: cognitoUser
        });
      }
    })
    .catch((err) => alert(`Error signing in: ${ err.message }`))
  }

  handleLogin(e) {
    e.preventDefault();

    this.signIn();
  }

  handlePasswordReset(e) {
    const { username, newPassword, cognitoUser } = this.state;

    e.preventDefault();

    console.log(username)
    console.log(newPassword)
    console.log(cognitoUser)

    cognitoUser.completeNewPasswordChallenge(newPassword, [], {
      onSuccess: res => {
        console.log('logged in');
        console.log(res)
      },
      onFailure: err => alert(err.message)
    })
  }

  handleChange(e) {
    if (e.target.id === 'username') {
      this.setState({
        username: e.target.value
      });
    } else if (e.target.id === 'password') {
      this.setState({
        password: e.target.value
      });
    } else if (e.target.id === 'new_password') {
      this.setState({
        newPassword: e.target.value
      });
    }
  }

  render() {
    const { choosePassword } = this.state;
    if (choosePassword) {
        return (
          <div className="container">
          <div className="row mt-4">
            <div className="col-12">
              <form onSubmit={ this.handlePasswordReset }>
                <div className="form-group">
                  <label>Choose a new password</label>
                  <input id='new_password' type='password' onChange={ this.handleChange } className="form-control" required />
                </div>
                <button className="btn btn-success btn-lg">Sign In</button>
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
              <form onSubmit={ this.handleLogin }>
                <div className="form-group">
                  <label>Username</label>
                  <input id='username' type='text' onChange={ this.handleChange } className="form-control" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input id='password' type='password' onChange={ this.handleChange } className="form-control" required />
                </div>
                <button className="btn btn-success btn-lg">Sign In</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SignInForm;