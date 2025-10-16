import React from 'react';

// A simple component to display a static list of high-protein meal suggestions.
const MealSuggestions = () => {
  const suggestions = [
    { name: 'Paneer Bhurji', description: 'Scrambled Indian cottage cheese with onions, tomatoes, and spices.' },
    { name: 'Sprouts Salad', description: 'A refreshing salad with mixed sprouts, chopped veggies, and a lemon dressing.' },
    { name: 'Dal Tadka', description: 'Yellow lentils tempered with ghee, cumin, and other spices.' },
    { name: 'Soya Chunks Curry', description: 'A protein-rich curry made with soya chunks in a flavorful gravy.' },
    { name: 'Egg Curry', description: 'Boiled eggs simmered in a spiced onion-tomato gravy.' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">High-Protein Meal Suggestions</h2>
      <div className="space-y-4">
        {suggestions.map((item, index) => (
          <div key={index} className="border-b pb-2">
            <h3 className="font-bold text-green-700">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealSuggestions;

