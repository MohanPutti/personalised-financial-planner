export interface SipCalculationPayload {
    basicDetails: {
      name: string;
      email: string;
      mobile: string;
      age?: number;
    };
    goals: {
      selectedGoals: string[];
      details: {
        retirementAge?: string;
        kids?: string;
        houseType?: string;
      };
    };
    financialDetails: {
      sip: number;
      income: number;
      expenses: number;
    };
  }
  
  export interface SipCalculationResponse {
    recommendedSip: number;
    currentSipFutureValue: number;
    remainingAmount: number;
  }
  
  const API_URL = 'http://localhost:5000/api/sip';
  
  export const calculateSip = async (
    payload: SipCalculationPayload
  ): Promise<SipCalculationResponse> => {
    const response = await fetch(`${API_URL}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error('Failed to calculate SIP');
    }
  
    return response.json();
  };
  