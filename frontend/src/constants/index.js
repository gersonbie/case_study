export const USER_LOCAL_STORAGE = "@RESERVA:user";
export const TOKEN_LOCAL_STORAGE = "@RESERVA:token";

const businessHoursArray = () => {
  let hours = [];
  for (let hour = 0, minute = 0; hour < 23 && minute !== 30; minute += 30) {
    if (minute > 30) {
      hour++;
      minute = 0;
    }
    hours.push(`${hour}:${minute}`);
  }
  return hours;
};
export const BUSINESS_HOURS = businessHoursArray();
export const DEFAULT_BUSINESS_HOUR = {
  startHour: "8",
  startMinute: "0",
  endHour: "18",
  endMinute: "0",
};
export const DEFAULT_BUSINESS_HOURS = {
  segunda: DEFAULT_BUSINESS_HOUR,
  terca: DEFAULT_BUSINESS_HOUR,
  quarta: DEFAULT_BUSINESS_HOUR,
  quinta: DEFAULT_BUSINESS_HOUR,
  sexta: DEFAULT_BUSINESS_HOUR,
  sabado: DEFAULT_BUSINESS_HOUR,
  domingo: DEFAULT_BUSINESS_HOUR,
};
