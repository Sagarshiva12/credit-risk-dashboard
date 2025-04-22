Credit Risk Analytics Dashboard
A responsive dashboard for analyzing customer financial health and credit risk, built with React, TypeScript, Ant Design, Recharts, Node.js, and Express.
Overview
This project includes a backend (Node.js + Express) and a frontend (React + TypeScript) to display customer financial data, calculate risk scores, and manage customer statuses. Follow the steps below to run both components locally.
Prerequisites

Node.js: Version >= 16.x (recommended: 18.x LTS)
npm: Version >= 8.x
Git: To clone the repository
A modern web browser (e.g., Chrome, Firefox)

Verify your Node.js and npm versions:
node -v
npm -v

If needed, install Node.js using nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/credit-risk-dashboard.git
cd credit-risk-dashboard

2. Backend Setup

Go to the server folder:
cd server


Install dependencies:
npm install


Run the backend:
npm run dev


Verify the server is running:

Open http://localhost:5000/api/customers in a browser or use:
curl http://localhost:5000/api/customers


You should see a JSON response with customer data.




3. Frontend Setup

Go to the client folder (open a new terminal):
cd client


Install dependencies:
npm install


Run the frontend:
npm run dev


Open http://localhost:5173 in your browser to view the dashboard.


Running Both Projects

Run the backend and frontend in separate terminals.
The frontend communicates with the backend at http://localhost:5000/api. Ensure the backend is running before accessing the frontend.

Troubleshooting

Backend Errors:
If npm run dev fails, ensure @types/cors is installed:
npm install --save-dev @types/cors


Verify tsconfig.json matches the provided configuration.



Frontend Errors:
If npm run dev fails, ensure Node.js >= 16.x and reinstall dependencies:
rm -rf node_modules package-lock.json
npm install


Check tailwind.config.js and index.css for TailwindCSS setup.



API Connection Issues:
If the frontend can’t fetch data, ensure the backend is running and the API URL in client/src/services/api.ts is http://localhost:5000/api.



Risk Scoring Explanation
The risk score is calculated based on:

Credit Score (40%): Normalized to 0-100 (max score: 850).
Loan Repayment History (30%): Percentage of successful repayments.
Outstanding Loans vs Income Ratio (30%): Lower ratios yield higher scores.Scores are capped between 0-100. Scores > 70 trigger a console alert in the backend.

AI Tool Usage

GitHub Copilot: Autocompleted TypeScript types, AntD component props, and Recharts configurations in Dashboard.tsx and api.ts. Suggested the calculateRiskScore function structure.
ChatGPT: Validated risk scoring logic and weights in server/src/services/customerService.ts.
Figma: Prototyped the dashboard layout for a responsive UI.

Deployment

Frontend: Hosted on Vercel at https://your-project-name.vercel.app (replace with your URL).
Backend (optional): Hosted on Render at https://your-backend.onrender.com (replace with your URL).

For local testing, the frontend may use hardcoded data if the backend isn’t deployed. Update client/src/services/api.ts with the deployed backend URL for production.
Screenshots

Figma Prototype (replace with your Figma link or screenshot)
Dashboard Screenshot (replace with a screenshot)

Loom Video
Link to 5-minute walkthrough video (replace with your Loom link)
Notes

Ensure both frontend and backend are running simultaneously for full functionality.
For production, deploy the backend and update the frontend’s API URL.
Contact [your-email@example.com] for support or questions.

