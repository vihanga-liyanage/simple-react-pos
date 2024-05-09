import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfMonth, endOfMonth } from 'date-fns';

const DateRangePicker = ({ onDateRangeChange }) => {
  // Default to the current month
  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateRangeChange(date, endDate); // Notify the parent component about the change
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateRangeChange(startDate, date); // Notify the parent component about the change
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      {' to '}
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default DateRangePicker;
