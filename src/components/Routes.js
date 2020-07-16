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
import CreateUserForm from "../screens/CreateUserForm"
import ListUsers from "../screens/ListUsers"
import CreateGroupForm from "../screens/CreateGroupForm"
import ListGroups from "../screens/ListGroups"

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
        <Route exact path="/users">
          <ListUsers />
        </Route>
        <Route exact path="/users/create">
          <CreateUserForm />
        </Route>
        <Route exact path="/groups">
          <ListGroups />
        </Route>
        <Route exact path="/groups/create">
          <CreateGroupForm />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
