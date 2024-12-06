import React, { useState } from 'react';

interface BasicDetailsProps {
  onNext: (data: { name: string; email: string; mobile: string }) => void;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleNext = () => {
    onNext({ name, email, mobile });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Basic Details</h1>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full border p-2 rounded mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="block w-full border p-2 rounded mb-2"
        />
      </div>
      <button
        onClick={handleNext}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default BasicDetails;
