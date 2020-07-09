import React from "react"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const ToastComponent = () => {

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
      />
    </div>
  )
}

export default ToastComponent
