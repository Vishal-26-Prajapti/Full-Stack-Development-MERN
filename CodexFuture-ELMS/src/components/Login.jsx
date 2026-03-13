import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BACKEND_URL = "http://localhost:5000";

const Login = () => {
    const { setUser } = useContext(AuthContext); // get setUser from context
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/current-user`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.loggedIn) setUser(data.user);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const url = isRegister ? `${BACKEND_URL}/api/register` : `${BACKEND_URL}/api/login`;

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({
                    ...(isRegister && { username: formData.username }),
                    useremail: formData.email,
                    password: formData.password
                }),
            });

            const data = await res.json();

            if (data.success) {
                setUser(data.user); // update global AuthContext
                alert(data.message || (isRegister ? "Registered successfully!" : "Login successful!"));
                navigate('/'); // redirect
            } else {
                setError(data.message || "Something went wrong!");
            }
        } catch (err) {
            setError("Server error! Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                        <i className="fas fa-graduation-cap text-white text-2xl"></i>
                    </div>
                    <h2 className='text-3xl font-bold text-gray-900'>
                        {isRegister ? "Create your account" : "Sign in to CodexFuture"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isRegister ? 'Join thousands of learners today' : 'Welcome back! Please sign in to continue'}
                    </p>
                </div>

                {/* Form */}
                <div className='card bg-white shadow-xl'>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex">
                                    <i className="fas fa-exclamation-circle text-red-400 mr-3 mt-1"></i>
                                    <p className="text-red-800 text-sm">{error}</p>
                                </div>
                            </div>
                        )}

                        {isRegister && (
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">
                                    <i className="fas fa-user mr-2"></i>
                                    Full Name
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter your name"
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                <i className="fas fa-envelope mr-2"></i>
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                <i className="fas fa-lock mr-2"></i>
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                            {!isRegister && (
                                <div>
                                    <button
                                        type="button"
                                        className="text-indigo-600 hover:text-indigo-500 hover:underline cursor-pointer text-sm font-medium mt-2 mb-4 float-right"
                                        onClick={() => navigate("/forgot-password")}
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        {/* Terms & Privacy */}
                        {isRegister && (
                            <div className="form-group flex items-center">
                                <input
                                id="terms"
                                type="checkbox"
                                checked={formData.termsAccepted}
                                onChange={e => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                required
                                className="mr-2 transform scale-150 accent-indigo-600 cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-sm">
                                I accept the{" "}
                                <span className="text-indigo-600 hover:underline cursor-pointer">
                                    Terms & Privacy Policy
                                </span>
                                </label>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full btn ${loading ? 'opacity-50 cursor-not-allowed' : 'btn-primary'}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        {isRegister ? 'Creating account...' : 'Signing in...'}
                                    </span>
                                ) : (
                                    <span>
                                        <i className={`fas ${isRegister ? 'fa-user-plus' : 'fa-sign-in-alt'} mr-2`}></i>
                                        {isRegister ? 'Create Account' : 'Sign In'}
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsRegister(!isRegister);
                                    setError('');
                                    setFormData({ username: '', email: '', password: '' });
                                }}
                                className="text-indigo-600 hover:text-indigo-500 font-medium hover:cursor-pointer"
                            >
                                {isRegister
                                    ? 'Already have an account? Sign in'
                                    : "Don't have an account? Create one"
                                }
                            </button>
                        </div>
                    </form>
                </div>

                {/* Back to Home */}
                <div className="back-to-home text-center">
                    <Link
                        to="/"
                        className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;