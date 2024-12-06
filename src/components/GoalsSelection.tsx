import React, { useState } from 'react';

interface GoalsSelectionProps {
  onNext: (data: any) => void;
}

const GoalsSelection: React.FC<GoalsSelectionProps> = ({ onNext }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [details, setDetails] = useState({
    retirementAge: '',
    kids: '',
    houseType: '',
  });

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    onNext({ selectedGoals, details });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Select Your Goals</h1>
      <div className="mt-4 space-y-2">
        {['Retirement', 'Child Education', 'Emergencies', 'My Home'].map((goal) => (
          <div key={goal}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedGoals.includes(goal)}
                onChange={() => handleGoalToggle(goal)}
                className="mr-2"
              />
              {goal}
            </label>
          </div>
        ))}
      </div>

      {/* Follow-up Questions */}
      {selectedGoals.includes('Retirement') && (
        <div className="mt-4">
          <label>When do you want to retire?</label>
          <input
            type="text"
            placeholder="Age"
            value={details.retirementAge}
            onChange={(e) => setDetails({ ...details, retirementAge: e.target.value })}
            className="block w-full border p-2 rounded"
          />
        </div>
      )}
      {selectedGoals.includes('Child Education') && (
        <div className="mt-4">
          <label>Number of kids?</label>
          <input
            type="number"
            placeholder="Kids"
            value={details.kids}
            onChange={(e) => setDetails({ ...details, kids: e.target.value })}
            className="block w-full border p-2 rounded"
          />
        </div>
      )}
      {selectedGoals.includes('My Home') && (
        <div className="mt-4">
          <label>What type of house?</label>
          <select
            value={details.houseType}
            onChange={(e) => setDetails({ ...details, houseType: e.target.value })}
            className="block w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Luxurious">Luxurious</option>
            <option value="2BHK">2BHK</option>
            <option value="2 Floored">2 Floored</option>
          </select>
        </div>
      )}

      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Next
      </button>
    </div>
  );
};

export default GoalsSelection;
