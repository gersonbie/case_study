import React from "react";
import CheckIcon from "../../assets/svgs/check";
import "../style/checkAndRadio.css";

const Checkbox = ({ label, name, value }) => {
  return (
    <label className="checkbox">
      <input name={name} type="checkbox" value={value}></input>
      <div className="input">
        <CheckIcon />
      </div>
      <span>{label}</span>
    </label>
  );
};
export default Checkbox;
