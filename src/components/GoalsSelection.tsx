import React, { useState, useEffect } from 'react';

interface GoalsSelectionProps {
  onNext: (data: { selectedGoals: string[]; details: { retirementAge: string; kids: string; houseType: string } }) => void;
  onBack: () => void;
  initialData: { selectedGoals: string[]; details: { retirementAge: string; kids: string; houseType: string } };
  userAge: number; // User's current age
}

const GoalsSelection: React.FC<GoalsSelectionProps> = ({ onNext, onBack, initialData, userAge }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(initialData.selectedGoals.length > 0 ? initialData.selectedGoals : ['Retirement']);
  const [details, setDetails] = useState(initialData.details || { retirementAge: '', kids: '', houseType: '' });
  const [errors, setErrors] = useState({
    retirementAge: '',
    kids: '',
    houseType: '',
  });

  useEffect(() => {
    if (!selectedGoals.includes('Retirement')) {
      setSelectedGoals((prev) => [...prev, 'Retirement']);
    }
  }, [selectedGoals]);

  const validateFields = () => {
    const newErrors = {
      retirementAge: '',
      kids: '',
      houseType: '',
    };

    if (selectedGoals.includes('Retirement')) {
      const numericRetirementAge = Number(details.retirementAge);
      if (!details.retirementAge || isNaN(numericRetirementAge)) {
        newErrors.retirementAge = 'Retirement age is required.';
      } else if (numericRetirementAge <= userAge || numericRetirementAge > 100) {
        newErrors.retirementAge = `Retirement age must be greater than your current age (${userAge}) and less than or equal to 100.`;
      }
    }

    if (selectedGoals.includes('Child Education') && !details.kids) {
      newErrors.kids = 'Number of kids is required.';
    }

    if (selectedGoals.includes('My Home') && !details.houseType) {
      newErrors.houseType = 'House type is required.';
    }

    setErrors(newErrors);

    // Return true if no errors
    return !newErrors.retirementAge && !newErrors.kids && !newErrors.houseType;
  };

  const handleGoalToggle = (goal: string) => {
    if (goal === 'Retirement') return; // Prevent toggling of mandatory goal
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (validateFields()) {
      onNext({ selectedGoals, details });
    }
  };

  return (
    <div className="p-6 bg-gray-100 max-w-lg mx-auto rounded shadow">
      <h1 className="text-2xl font-extrabold text-center text-blue-600">
        Select Your Goals
      </h1>
      <p className="text-center text-gray-600 mt-2">
        Choose your goals and provide additional details where applicable.
      </p>
      <div className="mt-6 space-y-4">
        {['Retirement', 'Child Education', 'Emergencies', 'My Home'].map((goal) => (
          <div key={goal}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selectedGoals.includes(goal)}
                onChange={() => handleGoalToggle(goal)}
                disabled={goal === 'Retirement'}
                className={`mr-2 accent-blue-500 ${
                  goal === 'Retirement' ? 'cursor-not-allowed' : ''
                }`}
              />
              <span className="text-lg">{goal}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Follow-Up Questions */}
      {selectedGoals.includes('Retirement') && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            When do you want to retire?
          </label>
          <input
            type="number"
            placeholder={`Enter retirement age (must be > ${userAge} and ≤ 100)`}
            value={details.retirementAge}
            onChange={(e) => setDetails({ ...details, retirementAge: e.target.value })}
            className={`block w-full border p-2 rounded ${
              errors.retirementAge ? 'border-red-500' : 'border-gray-300'
            } mt-2`}
          />
          {errors.retirementAge && <p className="text-red-500 text-sm mt-1">{errors.retirementAge}</p>}
        </div>
      )}
      {selectedGoals.includes('Child Education') && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Number of kids?
          </label>
          <input
            type="number"
            placeholder="Kids"
            value={details.kids}
            onChange={(e) => setDetails({ ...details, kids: e.target.value })}
            className={`block w-full border p-2 rounded ${
              errors.kids ? 'border-red-500' : 'border-gray-300'
            } mt-2`}
          />
          {errors.kids && <p className="text-red-500 text-sm mt-1">{errors.kids}</p>}
        </div>
      )}
      {selectedGoals.includes('My Home') && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            What type of house?
          </label>
          <select
            value={details.houseType}
            onChange={(e) => setDetails({ ...details, houseType: e.target.value })}
            className={`block w-full border p-2 rounded ${
              errors.houseType ? 'border-red-500' : 'border-gray-300'
            } mt-2`}
          >
            <option value="">Select</option>
            <option value="Luxurious">Luxurious</option>
            <option value="2BHK">2BHK</option>
            <option value="2 Floored">2 Floored</option>
          </select>
          {errors.houseType && <p className="text-red-500 text-sm mt-1">{errors.houseType}</p>}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
            selectedGoals.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GoalsSelection;
