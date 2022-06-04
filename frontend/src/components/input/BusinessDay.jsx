import React, { useEffect, useState } from "react";
import { DEFAULT_BUSINESS_HOUR } from "../../constants";
import '../style/businessHours.css';

const BusinessDay = ({ label, setBusinessDay, initial, name }) => {
  const [weekday, setWeekday] = useState(DEFAULT_BUSINESS_HOUR)
  const onChange = (event) => {
    setWeekday({ ...weekday, [event.target.name]: event.target.value })
    setBusinessDay(name, { ...weekday, [event.target.name]: event.target.value })
  }
  useEffect(() => {
    if (initial && initial[name])
      setWeekday(initial[name])
  }, [initial])
  return (
    <div className="grid-col-3 time-card">
      <div className="flex items-center">{label}</div>
      <div className="flex">
        <input className="br-1" type="number" name="startHour" min="0" max="23" onChange={onChange} value={weekday.startHour} />
        <span className="mh-1 flex items-center">:</span>
        <input className="br-1" type="number" name="startMinute" min="0" max="59" onChange={onChange} value={weekday.startMinute} />
      </div>
      <div className="flex">
        <input className="br-1" type="number" name="endHour" min={weekday.startHour} max="23" onChange={onChange} value={weekday.endHour} />
        <span className="mh-1 flex items-center">:</span>
        <input className="br-1" type="number" name="endMinute" max="59" onChange={onChange} value={weekday.endMinute} />
      </div>
    </div>
  );
};
export default BusinessDay;
