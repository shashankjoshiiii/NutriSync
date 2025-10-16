import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import FoodLogger from '../components/dashboard/FoodLogger';
import NutrientPieChart from '../components/dashboard/NutrientPieChart';
import MealSuggestions from '../components/dashboard/MealSuggestions';
import ProteinBarChart from '../components/dashboard/ProteinBarChart';
import api from '../api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [todaysFoods, setTodaysFoods] = useState([]);
  const [weeklyProtein, setWeeklyProtein] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nutrientTotals, setNutrientTotals] = useState({
    calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0, fiber: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todayRes, weeklyRes] = await Promise.all([
          api.get('/food/today'),
          api.get('/food/weekly-protein')
        ]);
        setTodaysFoods(todayRes.data);
        setWeeklyProtein(weeklyRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load your dashboard data. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const totals = todaysFoods.reduce((acc, food) => {
      acc.calories += food.calories || 0;
      acc.protein += food.protein || 0;
      acc.carbs += food.carbs || 0;
      acc.fats += food.fats || 0;
      acc.sugar += food.sugar || 0;
      acc.fiber += food.fiber || 0;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0, sugar: 0, fiber: 0 });
    setNutrientTotals(totals);
  }, [todaysFoods]);

  const handleFoodLogged = () => {
    // Simple page reload to refetch all data and update charts
    window.location.reload();
  };
  
  if (loading) {
    return <div className="text-center p-8">Loading your dashboard...</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome, {user && user.name}!
      </h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Log Your Meal</h2>
            <FoodLogger onFoodLogged={handleFoodLogged} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Weekly Protein Intake (g)</h2>
            <ProteinBarChart data={weeklyProtein} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Today's Nutrients</h2>
            <NutrientPieChart data={nutrientTotals} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">High-Protein Suggestions</h2>
            <MealSuggestions />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Today's Logged Foods</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">Food</th>
                <th scope="col" className="px-6 py-4">Calories</th>
                <th scope="col" className="px-6 py-4">Protein (g)</th>
                <th scope="col" className="px-6 py-4">Carbs (g)</th>
                <th scope="col" className="px-6 py-4">Fats (g)</th>
              </tr>
            </thead>
            <tbody>
              {todaysFoods.length > 0 ? (
                todaysFoods.map((food) => (
                  <tr className="border-b dark:border-neutral-500" key={food._id}>
                    <td className="whitespace-nowrap px-6 py-4 font-medium capitalize">{food.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{(food.calories || 0).toFixed(1)}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-green-600 font-semibold">{(food.protein || 0).toFixed(1)}</td>
                    <td className="whitespace-nowrap px-6 py-4">{(food.carbs || 0).toFixed(1)}</td>
                    <td className="whitespace-nowrap px-6 py-4">{(food.fats || 0).toFixed(1)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No foods logged for today.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

