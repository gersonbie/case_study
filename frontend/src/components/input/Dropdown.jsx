import React from "react";
import "../style/input.css";

const Dropdown = ({ name, label, placeholder, className, items, inputEvent, onChange, ...rest }) => {
  const inputChanged = (event) => {
    if (inputEvent) inputEvent(event.target.value)
  }
  return (
    <div className={`text-input decoration ${className}`}>
      <label htmlFor={name} className="control-label">
        {label}
      </label>
      <select defaultValue="" name={name} onChange={onChange || inputChanged} {...rest}>
        <option disabled value="">
          {placeholder}
        </option>
        {items.map((item, index) => (
          <option key={index} value={(item?.value || item?.value === '') ? item?.value : item}>
            {item?.label || item}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Dropdown;
