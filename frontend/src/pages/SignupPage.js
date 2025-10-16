import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import api from '../api/index.js';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { name, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            // Line 19: This is where the frontend sends data to the backend server.
            // The error happens here if the server is not running or rejects the data.
            const res = await api.post('/auth/register', { name, email, password });
            login(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            // This part handles errors returned FROM the server.
            if (err.response) {
                 const errorMessage = err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to sign up. Please try again.';
                 setError(errorMessage);
            } else {
                // This handles network errors, like the server being off.
                setError('Cannot connect to the server. Please make sure it is running.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-brand-dark-blue mb-6">Create Your NutriSync Account</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4">{error}</p>}
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                            Password (min. 6 characters)
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-green"
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            minLength="6"
                            required
                        />
                    </div>
                    <button
                        className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-6">
                    Already have an account? <Link to="/login" className="text-brand-green font-semibold hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;

