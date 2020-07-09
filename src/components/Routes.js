import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
// Import the views
import SignInForm from "../screens/SignInForm"
import SignUpForm from "../screens/SignUpForm"
import ForgotPasswordForm from "../screens/ForgotPasswordForm"

const Routes = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <SignInForm />
        </Route>
        <Route exact path="/sign-up">
          <SignUpForm />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPasswordForm />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
