import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Expense from './pages/Expenses';
import Goals from './pages/Goals';
import Home from './pages/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './App.css';

// Placeholder components for new routes
const Insights = () => <div className="p-4 ml-64 mt-16">Insights page coming soon</div>;
const Settings = () => <div className="p-4 ml-64 mt-16">Settings page coming soon</div>;

// Privacy and Terms pages with proper layout
const PrivacyPolicy = () => (
  <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-16">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="text-gray-600 mb-4">
        This Privacy Policy describes how your personal information is collected, used, and shared when you use MindSpend.
      </p>
    </div>
  </div>
);

const TermsOfService = () => (
  <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-16">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <p className="text-gray-600 mb-4">
        These Terms of Service govern your use of the MindSpend platform and provide information about the MindSpend Service.
      </p>
    </div>
  </div>
);

// 🧠 Fixed AppContent Function
const AppContent = () => {
  const location = useLocation();

  // Show/hide navbar based on route
  const shouldShowNavbar = () => {
    return !['/login', '/register', '/'].includes(location.pathname);
  };

  // Show/hide footer based on route
  const shouldShowFooter = () => {
    return !['/login', '/register', '/'].includes(location.pathname);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowNavbar() && <Navbar />}

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        {shouldShowNavbar() && (
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-10">
            <Sidebar />
          </div>
        )}

        {/* Main content */}
        <div className={`flex-1 ${shouldShowNavbar() ? 'pl-64' : ''}`}>
          <main className={`min-h-[calc(100vh-4rem)] ${shouldShowNavbar() ? 'pt-16' : ''}`}>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Main Pages */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<Expense />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/settings" element={<Settings />} />

              {/* Legal Pages */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-[#4461F2]">404</h1>
                      <p className="mt-2 text-lg text-gray-600">Page not found</p>
                      <button
                        onClick={() => window.location.href = '/'}
                        className="mt-4 px-4 py-2 bg-[#4461F2] text-white rounded hover:bg-blue-600 transition-colors duration-200"
                      >
                        Go to Home
                      </button>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
          {shouldShowFooter() && <Footer />}
        </div>
      </div>
    </div>
  );
};

// ✅ Main App with Router wrapper
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
