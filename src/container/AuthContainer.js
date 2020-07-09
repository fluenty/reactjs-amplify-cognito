import React from "react"
import ToastComponent from "../components/ToastComponent"

const AuthContainer = (props) => {
  return (
    <div className="container">
      <ToastComponent />
      <div className="row mt-4">
        <div className="col-12">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default AuthContainer
