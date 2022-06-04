import React from "react";
import "../style/input.css";

const TextInput = ({ name, label, type, placeholder, onChange, inputEvent, className, disabled, error, ...rest }) => {
  const inputChanged = (event) => {
    if (inputEvent) inputEvent(event.target.value)
  }
  return (
    <div className={`text-input decoration ${className}`}>
      <label htmlFor={name} className="control-label">
        {label}
      </label>
      <input id={name} type={type} placeholder={placeholder} disabled={disabled} onChange={onChange || inputChanged} {...rest} />
      {error ? <span>{error}</span> : null}
    </div>
  );
};
export default TextInput;
