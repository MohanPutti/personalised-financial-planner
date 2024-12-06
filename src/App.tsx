import React, { useState } from 'react';
import BasicDetails from './components/BasicDetails';
import GoalsSelection from './components/GoalsSelection';
import FinancialDetails from './components/FinancialDetails';
import SummaryPage from './components/SummaryPage';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<any>({});
  const [result, setResult] = useState<number | null>(null);

  const handleNext = (data: any) => {
    setUserData((prev: any) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (financialData: any) => {
    console.log("aannanan");
    const finalData = { ...userData, ...financialData };
    try {
        const response = await fetch('http://localhost:5000/api/sip/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData),
        });
        const result = await response.json();
        console.log("result---->",result)
      setResult(result.recommendedSip);
      setStep(4);
    } catch (error) {
      console.error('Error calculating SIP:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {step === 1 && <BasicDetails onNext={handleNext} />}
      {step === 2 && <GoalsSelection onNext={handleNext} />}
      {step === 3 && <FinancialDetails onSubmit={handleSubmit} />}
      {step === 4 && (
        <SummaryPage
          userDetails={{
            ...userData,
            recommendedSip: result || 0,
          }}
        />
      )}
    </div>
  );
};

export default App;
