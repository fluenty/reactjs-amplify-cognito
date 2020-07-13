import React from "react"

const InputField = (props) => {
  return (
    <div className="form-group">
      <label>{props.label}</label>
      <input
       type={props.type}
       name={props.name}
       onChange={(e) => props.handleChange(e) }
       className="form-control"
       required={props.required}
       placeholder={props.placeholder}
      />
    </div>
  )
}

export default InputField
