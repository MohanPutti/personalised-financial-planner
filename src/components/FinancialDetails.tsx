import React, { useState } from 'react';

interface FinancialDetailsProps {
  onSubmit: (data: { sip: number; income: number; expenses: number }) => void;
}

const FinancialDetails: React.FC<FinancialDetailsProps> = ({ onSubmit }) => {
  const [sip, setSip] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const handleSubmit = () => {
    onSubmit({ sip, income, expenses });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Financial Details</h1>
      <div className="mt-4">
        <div className="mb-4">
          <label>Current SIP (₹):</label>
          <input
            type="number"
            value={sip}
            onChange={(e) => setSip(Number(e.target.value))}
            className="block w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label>Monthly Income (₹):</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="block w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label>Monthly Expenses (₹):</label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            className="block w-full border p-2 rounded"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default FinancialDetails;
