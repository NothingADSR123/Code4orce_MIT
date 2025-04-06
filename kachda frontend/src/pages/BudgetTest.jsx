// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BudgetTest = () => {
//   const [budget, setBudget] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     amount: '',
//     period: 'monthly'
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [success, setSuccess] = useState('');

//   useEffect(() => {
//     fetchBudget();
//   }, []);

//   const fetchBudget = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         setError('No authentication token found');
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get('http://localhost:5000/api/budget', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setBudget(response.data);
//       if (response.data) {
//         setFormData({
//           amount: response.data.amount,
//           period: response.data.period
//         });
//       }
//     } catch (err) {
//       console.error('Error fetching budget:', err);
//       if (err.response?.status !== 404) { // 404 is expected if no budget exists
//         setError(err.response?.data?.message || 'Failed to fetch budget data');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'amount' ? value : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError('');
//     setSuccess('');

//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         setError('No authentication token found');
//         setIsSubmitting(false);
//         return;
//       }

//       const response = await axios.post('http://localhost:5000/api/set-budget', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       setBudget(response.data);
//       setSuccess('Budget updated successfully!');
//       fetchBudget(); // Refresh the budget data
//     } catch (err) {
//       console.error('Error setting budget:', err);
//       setError(err.response?.data?.message || 'Failed to set budget');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Add a simple login form
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loginStatus, setLoginStatus] = useState('');

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoginStatus('Logging in...');

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('userEmail', loginData.email);
//       setLoginStatus('Login successful! Token saved.');
//       fetchBudget(); // Fetch budget after login
//     } catch (err) {
//       console.error('Login error:', err);
//       setLoginStatus(`Login failed: ${err.response?.data?.message || 'Unknown error'}`);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Backend Connection Test</h1>
      
//       {/* Login Form */}
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={loginData.email}
//               onChange={handleLoginChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={loginData.password}
//               onChange={handleLoginChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Login
//           </button>
//           {loginStatus && (
//             <p className={`mt-2 text-sm ${loginStatus.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
//               {loginStatus}
//             </p>
//           )}
//         </form>
//       </div>
      
//       {/* Budget Form */}
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Set Budget</h2>
        
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}
        
//         {success && (
//           <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
//             {success}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
//               Budget Amount
//             </label>
//             <input
//               id="amount"
//               name="amount"
//               type="number"
//               min="1"
//               step="0.01"
//               value={formData.amount}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="0.00"
//               required
//             />
//           </div>
          
//           <div className="mb-6">
//             <label htmlFor="period" className="block text-gray-700 text-sm font-bold mb-2">
//               Budget Period
//             </label>
//             <select
//               id="period"
//               name="period"
//               value={formData.period}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             >
//               <option value="monthly">Monthly</option>
//               <option value="weekly">Weekly</option>
//             </select>
//           </div>
          
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
//           >
//             {isSubmitting ? 'Saving...' : 'Set Budget'}
//           </button>
//         </form>
//       </div>
      
//       {/* Budget Display */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget Information</h2>
        
//         {loading ? (
//           <div className="flex justify-center items-center p-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//           </div>
//         ) : !budget ? (
//           <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
//             <span className="block sm:inline">No budget found. Please set a budget first.</span>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="border-r pr-4">
//                 <p className="text-sm text-gray-500">Amount</p>
//                 <p className="text-2xl font-bold text-green-600">${budget.amount.toFixed(2)}</p>
//               </div>
              
//               <div>
//                 <p className="text-sm text-gray-500">Period</p>
//                 <p className="text-xl font-medium capitalize">{budget.period}</p>
//               </div>
//             </div>
            
//             <div className="mt-4 pt-4 border-t">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Created</p>
//                   <p className="text-md">{new Date(budget.createdAt).toLocaleDateString()}</p>
//                 </div>
                
//                 <div>
//                   <p className="text-sm text-gray-500">Last Updated</p>
//                   <p className="text-md">{new Date(budget.updatedAt).toLocaleDateString()}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-6">
//               <p className="text-sm text-gray-500">Budget ID</p>
//               <p className="text-xs text-gray-400 font-mono">{budget._id}</p>
//             </div>
            
//             <div className="mt-6">
//               <p className="text-sm text-gray-500">Raw Data (For Debugging)</p>
//               <pre className="mt-2 bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
//                 {JSON.stringify(budget, null, 2)}
//               </pre>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BudgetTest;