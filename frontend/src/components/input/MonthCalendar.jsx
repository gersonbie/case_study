import React from 'react'
import '../style/calendar.css'

const MonthCalendar = ({ pagamentos: items }) => {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
  return (
    <div className="calendar">
      <div className="calendar-header text-center mb-2">
        <strong>{new Date().getFullYear()}</strong>
      </div>
      <div className="list grid-col-3">
        {months.map(
          (month, index) => {
            return (<button key={index} type="button" className={`month ${new Date().getMonth() === index ? 'active ' : ''} ${items ? items[index] || '' : ''}`}>{month}</button>)
          }
        )}
      </div>
    </div>
  )
}

export default MonthCalendar
