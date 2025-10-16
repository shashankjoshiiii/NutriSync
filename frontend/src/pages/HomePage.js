import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample data with your new images
const highProteinRecipes = [
  {
    name: 'Chicken Curry',
    description: 'A classic Indian chicken curry with a rich, flavorful tomato-onion gravy.',
    protein: 30,
    carbs: 10,
    fats: 20,
    calories: 340,
    img: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chicken_curry_61994_16x9.jpg',
  },
  {
    name: 'Soya Chunks Curry',
    description: 'A hearty curry made with soya chunks, an excellent plant-based protein source.',
    protein: 25,
    carbs: 15,
    fats: 15,
    calories: 300,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRTutOH_nXVQz0mLbdgR1Jdtbf7UWn5je7Ag&s',
  },
  {
    name: 'Paneer Bhurji',
    description: 'Scrambled Indian cottage cheese with onions, tomatoes, and spices.',
    protein: 20,
    carbs: 8,
    fats: 18,
    calories: 250,
    img: 'https://www.foodie-trail.com/wp-content/uploads/2021/08/PHOTO-2021-07-19-09-01-21.jpg', // <-- NEW IMAGE
  },
  {
    name: 'Masoor Dal Tadka',
    description: 'Classic Indian red lentil soup tempered with aromatic spices for daily protein.',
    protein: 18,
    carbs: 35,
    fats: 6,
    calories: 220,
    img: 'https://images.archanaskitchen.com/images/recipes/indian/main-course/north-indian-vegetarian-recipes/dal-recipes/Recipe_For_Beginners_One_Pot_Tadkewali_Masoor_Dal_Recipe_1_bb475e9938.jpg', // <-- NEW IMAGE
  },
  {
    name: 'Sprouts Salad',
    description: 'A refreshing salad with mixed sprouts, chopped veggies, and a lemon dressing.',
    protein: 15,
    carbs: 25,
    fats: 5,
    calories: 180,
    img: 'https://www.whiskaffair.com/wp-content/uploads/2020/04/Sprouts-Salad-3.jpg', // <-- NEW IMAGE
  },
];

const HomePage = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [recommendations, setRecommendations] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const weightInKg = unit === 'lbs' ? weight / 2.20462 : parseFloat(weight);

    if (weightInKg > 0) {
      const protein = (weightInKg * 1.6).toFixed(0);
      const fats = (weightInKg * 0.8).toFixed(0);
      const water = (weightInKg * 35 / 1000).toFixed(1);
      const totalCalories = weightInKg * 33;
      const proteinCalories = parseFloat(protein) * 4;
      const fatCalories = parseFloat(fats) * 9;
      const carbCalories = totalCalories - proteinCalories - fatCalories;
      const carbs = (carbCalories / 4).toFixed(0);
      setRecommendations({ protein, fats, carbs, water });
    }
  };

  return (
    <div className="text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-yellow drop-shadow-lg">
          Sync Your Diet With Your Health Goals.
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          NutriSync is a modern nutrition tracker tailored for <span className="font-bold text-brand-yellow">Indian users</span>, helping you log meals, analyze nutrients, and get high-protein food recommendations.
        </p>
        <Link 
          to="/signup" 
          className="mt-8 inline-block bg-brand-orange text-white font-bold text-lg px-8 py-3 rounded-xl hover:bg-opacity-90 transition-transform hover:scale-105 shadow-lg"
        >
          Get Started for Free
        </Link>
      </section>

      {/* Daily Intake Calculator Section */}
      <section className="py-16 px-4 bg-black/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
            Get Your Personalized Daily Intake
          </h2>
          <div className="bg-white/10 p-8 rounded-xl border border-white/20">
            <form onSubmit={handleCalculate} className="flex flex-col md:flex-row items-center justify-center gap-4">
              <label htmlFor="weight" className="font-semibold text-lg">Enter Your Weight:</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 70"
                className="px-4 py-2 w-40 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
                required
              />
              <div className="flex items-center bg-white/10 border border-white/20 rounded-md p-1">
                <button type="button" onClick={() => setUnit('kg')} className={`px-3 py-1 text-sm rounded ${unit === 'kg' ? 'bg-brand-orange text-white' : 'text-gray-200'}`}>kg</button>
                <button type="button" onClick={() => setUnit('lbs')} className={`px-3 py-1 text-sm rounded ${unit === 'lbs' ? 'bg-brand-orange text-white' : 'text-gray-200'}`}>lbs</button>
              </div>
              <button
                type="submit"
                className="bg-brand-orange text-white font-bold px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Calculate
              </button>
            </form>

            {recommendations && (
              <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-200">Protein</p>
                  <p className="text-2xl font-bold text-brand-yellow">{recommendations.protein}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-200">Carbs</p>
                  <p className="text-2xl font-bold text-brand-yellow">{recommendations.carbs}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-200">Fats</p>
                  <p className="text-2xl font-bold text-brand-yellow">{recommendations.fats}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-200">Water</p>
                  <p className="text-2xl font-bold text-brand-yellow">{recommendations.water}L</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Featured High-Protein Recipes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {highProteinRecipes.map((recipe, index) => (
            <div 
              key={index} 
              className="[perspective:1000px] cursor-pointer h-80"
              onClick={() => handleCardClick(index)}
            >
              <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${activeCard === index ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front Face */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded-xl shadow-lg overflow-hidden">
                  <img src={recipe.img} alt={recipe.name} className="w-full h-48 object-cover"/>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">{recipe.name}</h3>
                    <p className="mt-1 text-gray-600 text-xs h-10">{recipe.description}</p>
                    <div className="mt-2 text-center font-semibold">
                      <span className="text-brand-orange">{recipe.protein}g Protein</span>
                    </div>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gray-800 p-6 flex flex-col justify-center items-center text-center rounded-xl border-2 border-brand-yellow">
                  <h3 className="text-2xl font-bold text-brand-yellow">{recipe.name}</h3>
                  <div className="mt-4 w-full grid grid-cols-2 gap-x-4 gap-y-2 text-white">
                      <p className="font-semibold text-right">Protein:</p>
                      <p className="text-left font-bold">{recipe.protein}g</p>

                      <p className="font-semibold text-right">Carbs:</p>
                      <p className="text-left font-bold">{recipe.carbs}g</p>

                      <p className="font-semibold text-right">Fats:</p>
                      <p className="text-left font-bold">{recipe.fats}g</p>

                      <p className="font-semibold text-right">Calories:</p>
                      <p className="text-left font-bold">{recipe.calories}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-16 px-4 bg-black/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Why Nutrition Matters in India
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Protein Gap Card */}
            <div className="bg-white/10 p-8 rounded-xl border border-white/20 text-left">
              <h3 className="text-2xl font-bold text-brand-yellow">The Protein Gap</h3>
              <p className="mt-4 text-gray-200">
                Studies show that over <span className="font-bold text-white">7 out of 10 Indians</span> are protein-deficient. This impacts muscle health, immunity, and energy. NutriSync helps you find and track high-protein foods to bridge this critical gap.
              </p>
            </div>
            {/* Diabetes Challenge Card */}
            <div className="bg-white/10 p-8 rounded-xl border border-white/20 text-left">
              <h3 className="text-2xl font-bold text-brand-yellow">The Diabetes Challenge</h3>
              <p className="mt-4 text-gray-200">
                India has over 100 million people living with diabetes, with a large number remaining undiagnosed. Furthermore, an estimated <span className="font-bold text-white">136 million people are pre-diabetic</span>. Managing diet is crucial, and our tracker provides the clear insights you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center py-10 px-4">
        <p className="text-sm text-gray-400">
          Shashank Joshi
        </p>
      </footer>

    </div>
  );
};

export default HomePage;

