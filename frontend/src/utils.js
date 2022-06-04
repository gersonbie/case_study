import { todos } from "./constants/dictionary";

export const itemPlusTodos = (items) => [todos, ...items]

export const resolveNestedAtribute = (obj, path) => {
  return path
    .split('.') // split string based on `.`
    .reduce(function (o, k) {
      return o && o[k]; // get inner property if `o` is defined else get `o` and return
    }, obj) // set initial value as object
}

export const dropdownToValueObject = (items) => items.reduce((prev, item) => ({ ...prev, [item.value]: { label: item.label } }), {})

export const timeSanitizer = (time) => time <= 9 ? `0${time}` : time

export const isMonthPaid = (date1, date2) => {
  const trialDate = new Date(date1)
  const expDate = new Date(date2)
  const now = new Date()
  const lastDate = trialDate > expDate ? trialDate : expDate;
  return lastDate >= now
}


export function formatMoney(number = "0", currency = null) {
  return `${Number.parseFloat(number).toLocaleString("pt", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MT`
}