import React, { useState } from 'react';
import api from '../../api';

const FoodLogger = ({ onFoodLogged }) => {
  const [foodName, setFoodName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!foodName.trim()) {
      setError('Please enter a food name.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // This sends the food name to your backend
      const res = await api.post('/food/log', { foodName });
      
      // If successful, it calls the function from the dashboard to refresh the page
      onFoodLogged(res.data);
      
      setFoodName(''); // Clear the input box
    } catch (err) {
      // This will display a specific error if the API fails
      const message = err.response?.data?.message || 'Could not log food. Please try again.';
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          name="foodName"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="e.g., 1 cup dal and 1 roti"
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 transition-colors"
          disabled={loading}
        >
          {loading ? 'Logging...' : 'Log Food'}
        </button>
      </div>
    </form>
  );
};

export default FoodLogger;

