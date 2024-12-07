# Financial Planner - Frontend

This is the frontend application for the Personalized Financial Planner. It allows users to input their basic details, select financial goals, provide financial details, and view a customized financial plan.

## Features

- Collect basic user details (name, email, mobile, and age).
- Allow users to select financial goals like retirement, child education, emergencies, and home.
- Provide detailed financial input (income, expenses, SIP).
- Display a personalized financial plan with SIP recommendations.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **TailwindCSS**: For styling the application.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MohanPutti/personalised-financial-planner.git
   cd personalised-financial-planner
Install dependencies:

npm install
# or
yarn install
Start the development server:

npm start
# or
yarn start
Open the app in your browser at http://localhost:3000.

It depends on backend repo for calculating sip values - https://github.com/MohanPutti/financial-planner-backend.git


Available Scripts
npm start: Start the development server.
npm run build: Build the app for production.
npm test: Run tests (if applicable).
npm run lint: Lint the codebase.

Project Structure
bash
Copy code
src/
├── components/         # Reusable React components
│   ├── BasicDetails.tsx
│   ├── FinancialDetails.tsx
│   ├── GoalsSelection.tsx
│   └── SummaryPage.tsx
├── services/           # API service layer
│   └── apiService.ts
├── App.tsx             # Main application file
├── index.tsx           # Entry point for React
└── styles/             # Global styles

