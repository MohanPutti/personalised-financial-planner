import React from 'react';

interface SummaryPageProps {
  userDetails: {
    name: string;
    email: string;
    mobile: string;
    age: number;
    financials: {
      income: number;
      expenses: number;
      sip: number;
      retirementAge: number;
    };
    goals: {
      selectedGoals: string[];
      goalDetails: {
        retirementAge?: string;
        kids?: string;
        houseType?: string;
      };
    };
    recommendedSip: number;
    futureValueOfCurrentSip: number;
    remainingAmount: number;
  };
}

const SummaryPage: React.FC<SummaryPageProps> = ({
  userDetails: {
    name,
    email,
    mobile,
    age,
    financials: { income, expenses, sip, retirementAge },
    goals: { selectedGoals, goalDetails },
    recommendedSip,
    futureValueOfCurrentSip,
    remainingAmount,
  },
}) => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Personalized Financial Plan
      </h1>

      {/* Welcome Message */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h2 className="text-lg font-semibold">Hi {name},</h2>
        <p className="text-gray-600 text-sm mt-1">
          Here's your personalized financial plan tailored to your goals and financial details.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-blue-100 shadow rounded-lg p-4 mb-4 text-center">
        <h3 className="text-md font-semibold mb-2 text-blue-700">Your Financial Summary</h3>
        <p className="text-gray-700 text-sm">
          Considering an annual return rate of <strong>12%</strong>, your current SIP of 
          ₹{sip.toLocaleString()} would grow to:
        </p>
        <p className="text-lg font-bold text-blue-900">
          ₹{futureValueOfCurrentSip.toLocaleString()} by the time you retire at age {retirementAge}.
        </p>
        <p className="text-gray-700 text-sm mt-2">
          To meet your goals, we recommend starting an SIP of:
        </p>
        <p className="text-lg font-bold text-blue-900">
          ₹{recommendedSip.toLocaleString()} per month.
        </p>
        <p className="text-gray-700 text-sm mt-2">
          This amount includes retirement expenses, kids' education, and emergency funds.
        </p>
        <p className="text-gray-700 text-sm mt-2">
          Remaining amount needed to achieve your goals:
        </p>
        <p className="text-lg font-bold text-blue-900">
          ₹{remainingAmount.toLocaleString()}.
        </p>
      </div>

      {/* Assumptions Card */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h3 className="text-md font-semibold mb-2">Assumptions</h3>
        <ul className="list-disc list-inside text-gray-600 text-sm">
          <li>12% annual return is assumed for all SIP calculations.</li>
          <li>Retirement expenses are calculated as 5 times your current expenses.</li>
          <li>₹1 crore per child is allocated for education.</li>
          <li>₹10 lakhs is allocated for emergencies.</li>
        </ul>
      </div>

      {/* User Details Card */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h3 className="text-md font-semibold mb-2">Your Details</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="text-gray-600"><strong>Name:</strong> {name}</p>
          <p className="text-gray-600"><strong>Email:</strong> {email}</p>
          <p className="text-gray-600"><strong>Mobile:</strong> {mobile}</p>
          <p className="text-gray-600"><strong>Age:</strong> {age}</p>
        </div>
      </div>

      {/* Goals and Goal Details Card */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h3 className="text-md font-semibold mb-2">Your Goals</h3>
        <ul className="list-disc list-inside text-gray-600 text-sm">
          {selectedGoals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          {selectedGoals.includes('Retirement') && goalDetails.retirementAge && (
            <p><strong>Retirement Age:</strong> {goalDetails.retirementAge}</p>
          )}
          {selectedGoals.includes('Child Education') && goalDetails.kids && (
            <p><strong>Number of Kids:</strong> {goalDetails.kids}</p>
          )}
          {selectedGoals.includes('My Home') && goalDetails.houseType && (
            <p>
              <strong>Preferred House Type:</strong> {goalDetails.houseType} 
              ({goalDetails.houseType === 'Luxurious' ? '₹3 crore' : goalDetails.houseType === '2BHK' ? '₹50 lakhs' : '₹1 crore'})
            </p>
          )}
        </div>
      </div>

      {/* Financial Details Card */}
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <h3 className="text-md font-semibold mb-2">Your Financials</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="text-gray-600"><strong>Monthly Income:</strong> ₹{income.toLocaleString()}</p>
          <p className="text-gray-600"><strong>Monthly Expenses:</strong> ₹{expenses.toLocaleString()}</p>
          <p className="text-gray-600"><strong>Current SIP:</strong> ₹{sip.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
