import React from "react";
import { timeSanitizer } from "../../utils";

const WeekDay = ({ weekday, time }) => {
  const getWeekDay = () => {
    switch (weekday) {
      case 'segunda':
        return 'Segunda feira:'
      case 'terca':
        return 'Terça feira:'
      case 'quarta':
        return 'Quarta feira:'
      case 'quinta':
        return 'Quinta feira:'
      case 'sexta':
        return 'Sexta feira:'
      case 'sabado':
        return 'Sábado:'
      case 'domingo':
        return 'Domingo:'
      default:
        break;
    }
  }
  return (
    <div className="flex items-center">
      <div className="circle" />
      <span className="ml-2 extended-w-2">{getWeekDay()}</span>
      <strong>{`${timeSanitizer(time.startHour)}:${timeSanitizer(time.startMinute)}`} - {`${timeSanitizer(time.endHour)}:${timeSanitizer(time.endMinute)}`}</strong>
    </div>
  );
};

export default WeekDay;
