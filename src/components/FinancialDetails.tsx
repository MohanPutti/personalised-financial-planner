import React, { useState } from 'react';

interface FinancialDetailsProps {
  onSubmit: (data: { sip: number; income: number; expenses: number }) => void;
  onBack: () => void;
  initialData: { sip: number; income: number; expenses: number };
}

const FinancialDetails: React.FC<FinancialDetailsProps> = ({ onSubmit, onBack, initialData }) => {
  const [sip, setSip] = useState(initialData.sip || 0);
  const [income, setIncome] = useState(initialData.income || 1000);
  const [expenses, setExpenses] = useState(initialData.expenses || 500);
  const [errors, setErrors] = useState({
    income: '',
    expenses: '',
  });

  const validateFields = () => {
    const newErrors = {
      income: '',
      expenses: '',
    };

    if (income <= 0 || isNaN(income)) {
      newErrors.income = 'Monthly income is required and must be greater than 0.';
    }

    if (expenses <=0 || isNaN(expenses)) {
      newErrors.expenses = 'Monthly expenses are required and must be greater than or equal to 0.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return !newErrors.income && !newErrors.expenses;
  };

  const handleInputChange = (
    field: 'income' | 'expenses' | 'sip',
    value: string
  ) => {
    const sanitizedValue = value.replace(/^0+/, ''); // Remove leading zeros
    const numericValue = Number(sanitizedValue);

    if (field === 'income') setIncome(numericValue);
    if (field === 'expenses') setExpenses(numericValue);
    if (field === 'sip') setSip(numericValue);
  };

  const handleSubmit = () => {
    if (validateFields()) {
      onSubmit({ sip: sip || 0, income, expenses });
    }
  };

  return (
    <div className="p-6 bg-gray-100 max-w-lg mx-auto rounded shadow">
      <h1 className="text-2xl font-extrabold text-center text-blue-600">
        Financial Details
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Enter your financial details to proceed.
      </p>
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current SIP (₹):</label>
          <input
            type="number"
            value={sip}
            onChange={(e) => handleInputChange('sip', e.target.value)}
            placeholder="Optional"
            className={`block w-full border p-2 rounded ${
              sip < 0 ? 'border-red-500' : 'border-gray-300'
            } mt-2`}
          />
          {sip < 0 && <p className="text-red-500 text-sm mt-1">SIP must be greater than or equal to 0.</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Income (₹):</label>
          <input
            type="number"
            value={income}
            onChange={(e) => handleInputChange('income', e.target.value)}
            placeholder="Enter your monthly income"
            className={`block w-full border p-2 rounded ${
              errors.income ? 'border-red-500' : 'border-gray-300'
            } mt-2`}
          />
          {errors.income && <p className="text-red-500 text-sm mt-1">{errors.income}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Expenses (₹):</label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => handleInputChange('expenses', e.target.value)}
            placeholder="Enter your monthly expenses"
            className={`block w-full border p-2 rounded ${
              errors.expenses ? 'border-red-500' : 'border-gray-300'
            } mt-2`}
          />
          {errors.expenses && <p className="text-red-500 text-sm mt-1">{errors.expenses}</p>}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
            errors.income || errors.expenses ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FinancialDetails;
