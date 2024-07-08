import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './RelatorioGarcons.css'; // Importa suas estilizações personalizadas

const CalendarPicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        className="custom-datepicker" // Adiciona uma classe personalizada, se necessário
      />
    </div>
  );
};

export default CalendarPicker;
