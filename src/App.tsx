import React, { useState } from 'react';
import BasicDetails from './components/BasicDetails';
import GoalsSelection from './components/GoalsSelection';
import FinancialDetails from './components/FinancialDetails';
import SummaryPage from './components/SummaryPage';
import { calculateSip, SipCalculationPayload } from './services/sipService';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<any>({
    basicDetails: {
      name: '',
      email: '',
      mobile: '',
    },
    goals: {
      selectedGoals: [],
      details: {
        retirementAge: '',
        kids: '',
        houseType: '',
      },
    },
    financialDetails: {
      sip: 0,
      income: 0,
      expenses: 0,
    },
  });
  const [recommendedSip, setRecommendedSip] = useState<number | null>(null);
  const [currentSipFutureValue, setCurrentSipFutureValue] = useState<number | null>(null);
  const [remainingAmount, setRemainingAmount] = useState<number | null>(null);

  const handleNext = (data: any, key: string) => {
    setUserData((prev: any) => ({ ...prev, [key]: data }));
    console.log(userData.financialDetails)
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (financialData: any) => {
    setUserData((prev: any) => ({ ...userData, financialDetails: financialData }));

    const finalData: SipCalculationPayload = {
      ...userData,
      financialDetails: financialData,
    };

    try {
      const result = await calculateSip(finalData);
      setRecommendedSip(result.recommendedSip);
      setCurrentSipFutureValue(result.currentSipFutureValue);
      setRemainingAmount(result.remainingAmount);
      setStep(4);
    } catch (error) {
      console.error('Error calculating SIP:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {step === 1 && (
        <BasicDetails
          onNext={(data) => handleNext(data, 'basicDetails')}
          initialData={userData.basicDetails}
        />
      )}
      {step === 2 && (
<GoalsSelection
  onNext={(data) => handleNext(data, 'goals')}
  onBack={handleBack}
  initialData={userData.goals}
  userAge={userData.basicDetails.age}
/>

      )}
      {step === 3 && (
        <FinancialDetails
          onSubmit={(data) => handleSubmit(data)}
          onBack={handleBack}
          initialData={userData.financialDetails}
        />
      )}
      
      {step === 4 && (
        
  <SummaryPage
    userDetails={{
      ...userData.basicDetails,
      financials: userData.financialDetails,
      goals: {
        selectedGoals: userData.goals.selectedGoals,
        goalDetails: userData.goals.details,
      },
      recommendedSip: recommendedSip,
      futureValueOfCurrentSip: currentSipFutureValue,
      remainingAmount: remainingAmount,
    }}
  />

      )}
    </div>
  );
};

export default App;
