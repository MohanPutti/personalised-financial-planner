import React from 'react';

interface SummaryPageProps {
  userDetails: {
    name: string;
    email: string;
    mobile: string;
    selectedGoals: string[];
    recommendedSip: number;
  };
}

const SummaryPage: React.FC<SummaryPageProps> = ({ userDetails }) => {
    console.log("inside",userDetails)
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Personalized Financial Plan</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold">Hello, {userDetails.name}!</h2>
        <p className="text-gray-700 mt-2">
          Here's your personalized financial plan based on your goals and financial details:
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold">Your Goals:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {userDetails?.selectedGoals?.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Recommended SIP Amount:</h3>
            <p className="text-gray-700 text-lg">
              ₹{userDetails.recommendedSip.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded mt-6"
        onClick={() => alert('You can now implement further actions or navigation.')}
      >
        Finish
      </button>
    </div>
  );
};

export default SummaryPage;
