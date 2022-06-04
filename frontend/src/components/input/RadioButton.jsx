import React from "react";
import CheckIcon from "../../assets/svgs/check";
import "../style/checkAndRadio.css";

const RadioButton = ({ label, name, value, selected = '', ...rest }) => {
  return (
    <label className="radio-button">
      <input name={name} type="radio" checked={value === selected} value={value} {...rest}></input>
      <div className="input">
        <CheckIcon />
      </div>
      <span>{label}</span>
    </label>
  );
};
export default RadioButton;
