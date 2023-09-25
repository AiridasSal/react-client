import React, { useState } from 'react';

function Invoice() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Invoice submitted:', {
      invoiceNumber,
      invoiceDate,
      amount,
    });
  };

  return (
    <div>
      <h2>Invoice</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Invoice Number:
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Invoice Date:
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Invoice</button>
      </form>
    </div>
  );
}

export default Invoice;