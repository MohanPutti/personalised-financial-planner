import React, { useState, useEffect } from 'react';

interface BasicDetailsProps {
  onNext: (data: { name: string; email: string; mobile: string; age: string }) => void;
  initialData: { name: string; email: string; mobile: string; age: string };
}

const BasicDetails: React.FC<BasicDetailsProps> = ({ onNext, initialData }) => {
  const [name, setName] = useState(initialData.name || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [mobile, setMobile] = useState(initialData.mobile || '');
  const [age, setAge] = useState(initialData.age || '');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    age: '',
  });

  useEffect(() => {
    // Populate fields with initial data when the component mounts
    setName(initialData.name || '');
    setEmail(initialData.email || '');
    setMobile(initialData.mobile || '');
    setAge(initialData.age || '');
  }, [initialData]);

  const validateField = (field: string, value: string) => {
    let errorMessage = '';
    if (field === 'name') {
      if (value.trim().length < 3) {
        errorMessage = 'Name must be at least 3 characters long.';
      }
    } else if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email.';
      }
    } else if (field === 'mobile') {
      if (!/^\d{10}$/.test(value)) {
        errorMessage = 'Mobile must be a 10-digit number.';
      }
    } else if (field === 'age') {
      const numericAge = Number(value);
      if (!value.trim() || isNaN(numericAge) || numericAge < 15 || numericAge > 100) {
        errorMessage = 'Age must be a number between 15 and 100.';
      }
    }
    return errorMessage;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'mobile') setMobile(value);
    if (field === 'age') setAge(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: validateField(field, value),
    }));
  };

  const isFormValid = () => {
    return (
      name.trim().length >= 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      /^\d{10}$/.test(mobile) &&
      !isNaN(Number(age)) &&
      Number(age) >= 1 &&
      Number(age) <= 120
    );
  };

  const handleNext = () => {
    if (isFormValid()) {
      onNext({ name, email, mobile, age });
    }
  };

  return (
    <div className="p-6 bg-gray-100 max-w-lg mx-auto rounded shadow">
      {/* Main Title */}
      <h1 className="text-3xl font-extrabold text-center text-blue-600">
        Personalized Financial Plan
      </h1>

      {/* Subtitle */}
      <h2 className="text-xl font-bold text-center mt-4">Basic Details</h2>

      <div className="mt-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`block w-full border p-2 rounded ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`block w-full border p-2 rounded ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            className={`block w-full border p-2 rounded ${
              errors.mobile ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className={`block w-full border p-2 rounded ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
        </div>
      </div>
      <button
        onClick={handleNext}
        disabled={!isFormValid()}
        className={`w-full px-4 py-2 rounded text-white font-bold ${
          !isFormValid()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default BasicDetails;
