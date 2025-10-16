const Food = require('../models/Food');
const axios = require('axios');
const https = require('https');

const NINJA_API_URL = 'https://api.calorieninjas.com/v1/nutrition?query=';
const agent = new https.Agent({ rejectUnauthorized: false });

// @route   POST /api/food/log
// @desc    Log a food item using the CalorieNinja API
// @access  Private
exports.logFood = async (req, res) => {
    const { foodName } = req.body;

    if (!foodName) {
        return res.status(400).json({ message: 'Food name is required' });
    }

    try {
        const apiResponse = await axios.get(NINJA_API_URL + encodeURIComponent(foodName), {
            headers: { 'X-Api-Key': process.env.NINJA_API_KEY },
            https_agent: agent,
        });

        const nutritionData = apiResponse.data.items;

        if (!nutritionData || nutritionData.length === 0) {
            return res.status(404).json({ message: `Could not find nutrition data for "${foodName}". Please try a different name.` });
        }

        let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0, totalSugar = 0, totalFiber = 0;

        nutritionData.forEach(item => {
            totalCalories += item.calories;
            totalProtein += item.protein_g;
            totalCarbs += item.carbohydrates_total_g;
            totalFats += item.fat_total_g;
            totalSugar += item.sugar_g;
            totalFiber += item.fiber_g;
        });
        
        const newFood = new Food({
            user: req.user.id,
            name: foodName,
            calories: totalCalories,
            protein: totalProtein,
            carbs: totalCarbs,
            fats: totalFats,
            sugar: totalSugar,
            fiber: totalFiber,
        });

        const food = await newFood.save();
        res.json(food);

    } catch (err) {
        console.error("API or Database Error:", err.message);
        if (err.response) {
            console.error("API Response Error:", err.response.data);
        }
        res.status(500).send('Server error: Could not retrieve nutrition data.');
    }
};

// @route   GET /api/food/today
// @desc    Get all food items logged by a user for the current day
// @access  Private
exports.getTodaysFood = async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

        const foods = await Food.find({
            user: req.user.id,
            date: { $gte: startOfDay, $lt: endOfDay },
        }).sort({ date: -1 });

        res.json(foods);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET /api/food/weekly-summary
// @desc    Get user's nutrient intake for the last 7 days
// @access  Private
exports.getWeeklySummary = async (req, res) => {
    try {
        const today = new Date();
        const last7Days = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);

        const foods = await Food.find({
            user: req.user.id,
            date: { $gte: last7Days },
        });

        const dailySummary = {};
        for (let i = 0; i < 7; i++) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dayString = d.toISOString().split('T')[0];
            dailySummary[dayString] = {
                name: d.toLocaleDateString('en-US', { weekday: 'short' }),
                protein: 0,
                carbs: 0,
                sugar: 0,
            };
        }

        foods.forEach(food => {
            const dayString = food.date.toISOString().split('T')[0];
            if (dailySummary[dayString]) {
                dailySummary[dayString].protein += food.protein || 0;
                dailySummary[dayString].carbs += food.carbs || 0;
                dailySummary[dayString].sugar += food.sugar || 0;
            }
        });
        
        const result = Object.values(dailySummary).reverse();
        res.json(result);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

