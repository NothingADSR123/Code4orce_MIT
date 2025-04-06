# MindSpend - Personal Finance Management Application

MindSpend is a comprehensive personal finance management application designed to help users track expenses, set savings goals, and gain insights into their financial health.

<p align="center">
  <img src="https://github.com/NothingADSR123/Code4orce_MIT/blob/057a6960fae4b752b8cfd9689d275d8410805aff/kachda%20frontend/src/assets/feef.png?raw=true" alt="MindSpend Logo" width="200"/>
</p>


## Features

- **Expense Tracking**: Log and categorize your daily expenses
- **Budget Management**: Set monthly budgets and track your spending
- **Savings Goals**: Create and monitor progress towards financial goals
- **Financial Dashboard**: Visualize your financial data with interactive charts
- **Responsive Design**: Seamless experience across desktop and mobile devices

## Tech Stack

### Frontend
- React 19
- Tailwind CSS
- Framer Motion (animations)
- Recharts (data visualization)
- React Router DOM
- Axios (API requests)

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Frontend Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/mindspend.git
```

2. Navigate to the frontend directory
```bash
cd Code4orce_MIT\kachda frontend
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

5. The application will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory
```bash
cd Code4orce_MIT\backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mindspend
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server
```bash
npm start
```

5. The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get authentication token

### Expenses
- `GET /api/expenses` - Get all expenses for the logged-in user
- `POST /api/expenses` - Add a new expense
- `DELETE /api/expenses/:id` - Delete an expense
- `GET /api/expenses/alerts` - Get spending alerts

### Budget
- `GET /api/budget` - Get user's budget
- `POST /api/set-budget` - Set or update budget

## Project Structure

```
mindspend/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Recharts](https://recharts.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
