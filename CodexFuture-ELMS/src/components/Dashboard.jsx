import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Dashboard = () => {
    const [myCourses, setMyCourses] = useState([]);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext); 

    useEffect(() => {
        if (user) {
            const allPurchases = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
            const userCourses = allPurchases.filter(course => course.userEmail === user.useremail);
            setMyCourses(userCourses);
        }
    }, [user]);

    const progressData = myCourses.length > 0 ? myCourses : [
    { title: "React Basics", progress: 0 },
    { title: "Python for Beginners", progress: 0 },
    { title: "Cybersecurity Fundamentals", progress: 0 },
    { title: "Data Science 101", progress: 0 },
    ];

    return (
        <div className="dashboard-padding min-h-screen py-8 px-6">
            <div className="max-w-6xl mx-auto">
                {/* welcome header */}
                <div className="dashbaord-header bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Welcome back, {user?.useremail?.split('@')[0]}! 👋
                            </h1>
                            <p className="text-lg opacity-90">
                                Continue your learning journey with CodexFuture
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="header-icon w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <i className="fas fa-graduation-cap text-3xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                                <i className="fas fa-book-open text-white text-xl"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-900" data-testid="enrolled-courses-count">
                                {myCourses.length}
                                </p>    
                                <p className="text-blue-700">Enrolled Courses</p>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                                <i className="fas fa-trophy text-white text-xl"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-900" data-testid="completed-courses-count">
                                {myCourses.filter(course => course.progress >= 100).length}
                                </p>
                                <p className="text-green-700">Completed</p>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                                <i className="fas fa-certificate text-white text-xl"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-purple-900" data-testid="certificates-count">
                                    {myCourses.filter(course => course.progress >= 100).length}
                                </p>
                                <p className="text-purple-700">Certificates</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {/* Course Progress Bar Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Course Progress Overview</h2>
                        <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={progressData}>
                            <XAxis dataKey="title" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="progress" fill="#6366F1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Learning Activity Pie Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Learning Activity</h2>
                        <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                            data={[
                                { name: "Completed", value: myCourses.filter(c => c.progress >= 100).length || 2 },
                                { name: "In Progress", value: myCourses.filter(c => c.progress < 100 && c.progress > 0).length || 3 },
                                { name: "Not Started", value: myCourses.filter(c => c.progress === 0).length || 1 },
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label
                            >
                            <Cell fill="#10B981" />
                            <Cell fill="#3B82F6" />
                            <Cell fill="#F59E0B" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8" data-testid="error-message">
                        <div className="flex">
                        <i className="fas fa-exclamation-triangle text-red-500 mr-3 mt-1"></i>
                        <p className="text-red-800">{error}</p>
                        </div>
                    </div>
                )}

                {/* My Courses Section */}
                <div className='mb-8'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-bold text-gray-900'>
                            My Courses
                        </h2>
                        <Link
                            to="/courses"
                            className='btn btn-outline'
                        >
                            <i className='fas fa-plus mr-2'></i>
                            Browse More Courses
                        </Link>
                    </div>

                    {myCourses.length === 0 ? (
                        <div className="no-course-yet text-center py-12 bg-gray-50 rounded-2xl">
                            <i className="fas fa-graduation-cap text-6xl text-gray-300 mb-4"></i>
                            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No courses yet</h3>
                            <p className="text-gray-500 mb-6">Start your learning journey today!</p>
                            <Link to="/courses" className="btn btn-primary">
                                <i className="fas fa-search mr-2"></i>
                                Explore Courses
                            </Link>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myCourses.map((course, index) => (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                                    <p className="text-gray-600 mb-4">Progress: {course.progress}%</p>
                                    <p className="text-gray-500 text-sm mb-3">Purchased on: {new Date(course.purchaseDate).toLocaleDateString()}</p>
                                    <Link className="btn btn-secondary w-full">
                                        <i className="fas fa-play mr-2"></i>
                                        Start Course
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Activity */}
                <div className="card bg-gradient-to-br from-gray-50 to-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        <i className="fas fa-clock mr-2"></i>
                        Recent Activity
                    </h2>
                    {myCourses.length === 0 ? (
                        <p className="text-gray-500">No recent activity to show.</p>
                    ) : (
                        <ul className="text-gray-700 space-y-2">
                            {myCourses.slice(-3).reverse().map((course, index) => (
                                <li key={index} className="flex items-center">
                                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                    You purchased <strong>{course.title}</strong> on{" "}
                                    {new Date(course.purchaseDate).toLocaleDateString()}.
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}   

export default Dashboard;