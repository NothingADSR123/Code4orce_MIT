import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Footer from './components/Footer';
import './App.css';

// Placeholder components for new routes
const Expenses = () => <div className="p-4 ml-64">Expenses page coming soon</div>;
const Goals = () => <div className="p-4 ml-64">Goals page coming soon</div>;
const Insights = () => <div className="p-4 ml-64">Insights page coming soon</div>;
const Settings = () => <div className="p-4 ml-64">Settings page coming soon</div>;

// Privacy and Terms pages
const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-gray-600 mb-4">
        This Privacy Policy describes how your personal information is collected, used, and shared when you use MindSpend.
      </p>
      {/* More content would go here */}
    </div>
  </div>
);

const TermsOfService = () => (
  <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-gray-600 mb-4">
        These Terms of Service govern your use of the MindSpend platform and provide information about the MindSpend Service.
      </p>
      {/* More content would go here */}
    </div>
  </div>
);

const App = () => {
  // Determine if we should show the footer based on the current route
  const shouldShowFooter = (pathname) => {
    return !['/dashboard', '/expenses', '/goals', '/insights', '/settings'].includes(pathname);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Main application routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Legal pages */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            
            {/* Default redirect to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-indigo-600">404</h1>
                  <p className="mt-2 text-lg text-gray-600">Page not found</p>
                  <button 
                    onClick={() => window.location.href = '/dashboard'} 
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            } />
          </Routes>
        </div>
        {shouldShowFooter(window.location.pathname) && <Footer />}
      </div>
    </Router>
  );
};

export default App;
