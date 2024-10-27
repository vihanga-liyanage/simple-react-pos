import React, { useEffect, useState } from 'react';
import DateRangePicker from './DateRangePicker';
import { startOfMonth, endOfMonth } from 'date-fns';
import './Summary.css';

const SummaryPage = () => {
  const [dateRange, setDateRange] = useState({
    start: startOfMonth(new Date()),
    end: endOfMonth(new Date()),
  });

  const [summaryData, setSummaryData] = useState({
    orderCount: 0,
    salesTotal: 0,
    cardTotal: 0,
    cashTotal: 0,
    productSales: [],
    pendingProductQuantities: [],
  });

  const fetchSummaryData = async (startDate, endDate) => {
    const response = await fetch(`/api/summary?start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
    const data = await response.json();
    // Sort product sales by product name
    data.productSales.sort((a, b) => a.name.localeCompare(b.name));
    setSummaryData(data);
  };

  useEffect(() => {
    fetchSummaryData(dateRange.start, dateRange.end);
  }, [dateRange]);

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ start: startDate, end: endDate });
  };

  return (
    <div className="summary-container">
      <h1 className="summary-header">Sales Summary</h1>
      <div className="date-range-picker">
        <DateRangePicker onDateRangeChange={handleDateRangeChange} />
      </div>
      <div className="summary-info large-font">
        <p>Total Orders: {summaryData.orderCount}</p>
        <p>Total Sales: ${summaryData.salesTotal}</p>
      </div>
      <div className="summary-info">
        <p>Card Payments: ${summaryData.cardTotal}</p>
        <p>Cash Payments: ${summaryData.cashTotal}</p>
      </div>
      <h2>Product Sales</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Units Sold</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {summaryData.productSales.map((product) => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>{product.salesTotal}</td>
              <td>${product.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Pending Items</h2>
      {summaryData.pendingProductQuantities.length > 0 ? (
        <table className="pending-products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Pending Quantity</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.pendingProductQuantities.map((product) => (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{product.pendingQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending items.</p>
      )}
    </div>
  );
};

export default SummaryPage;
