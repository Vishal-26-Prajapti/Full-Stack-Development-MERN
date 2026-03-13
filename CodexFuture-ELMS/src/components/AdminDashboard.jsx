/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BACKEND_URL = "http://localhost:5000";

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [showAddStudent, setShowAddStudent] = useState(false);
    const [addingStudent, setAddingStudent] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/students`);
                if (res.data.success) {
                    setStudents(res.data.students);
                } else {
                    setError(res.data.message);
                }
            } catch (err) {
                console.error(err);
                setError('Error fetching students');
            }
        };
        fetchStudents();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setAddingStudent(true);
        try {
            const res = await axios.post(`${BACKEND_URL}/api/add-student`, formData);
            if (res.data.success) {
                alert('Student added successfully!');
                setStudents(prev => [...prev, formData]);
                setShowAddStudent(false);
                setFormData({ name: '', email: '', password: '' });
            } else {
                setError(res.data.message);
            }
        } catch (err) {
            console.error(err);
            setError('Server error while adding student');
        }
        setAddingStudent(false);
    };

    const handleDelete = async (email) => {
        if (window.confirm(`Are you sure you want to delete ${email}?`)) {
            try {
                const res = await fetch(`${BACKEND_URL}/api/students/${email}`, {
                    method: 'DELETE',
                });
                const data = await res.json();

                if (data.success) {
                    alert('Student deleted successfully!');
                    // Refresh list
                    setStudents(students.filter((s) => s.email !== email));
                } else {
                    alert(data.message);
                }
            } catch (err) {
                alert('Error deleting student');
                console.error(err);
            }
        }
    };

    return (
        <div className="dashboard-padding min-h-screen py-8 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="dashbaord-header bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Admin Dashboard 🛠️
                            </h1>
                            <p className="text-lg opacity-90">
                                Manage students and monitor platform activity
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="header-icon w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <i className="fas fa-cog text-3xl"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                                <i className="fas fa-users text-white text-xl"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-900">
                                {students.length}
                                </p>
                                <p className="text-blue-700">Total Students</p>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                                <i className="fas fa-book text-white text-xl"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-900">6</p>
                                <p className="text-green-700">Available Courses</p>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                                <i className="fas fa-chart-line text-white text-xl"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-purple-900">
                                {students.filter(s => s.enrolled_courses?.length > 0).length}
                                </p>
                                <p className="text-purple-700">Active Learners</p>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                                <i className="fas fa-certificate text-white text-xl"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-yellow-900">0</p>
                                <p className="text-yellow-700">Certificates Issued</p>
                            </div>
                        </div>
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

                {/* Students Management */}
                <div className="card mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            <i className="fas fa-users mr-2"></i>
                            Students Management
                        </h2>
                        <button
                        onClick={() => setShowAddStudent(true)}
                        className="btn btn-primary"
                        >
                            <i className="fas fa-user-plus mr-2"></i>
                            Add Student
                        </button>
                    </div>

                    {/* Add Student */}
                    {showAddStudent && (
                        <div className='add-student-opacity fixed inset-0 bg-black flex items-center justify-center z-50'>
                            <div className='add-student-header bg-white rounded-2xl max-w-md w-full mx-4'>
                                <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                                    <i className='fas fa-user-plus mr-2'></i>
                                    Add new student
                                </h3>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">
                                            <i className="fas fa-user mr-2"></i>
                                            Student name
                                        </label>
                                        <input
                                            type="text"
                                            name= 'name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="Enter student name "
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <i className="fas fa-envelope mr-2"></i>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name='email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="student@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">
                                            <i className="fas fa-lock mr-2"></i>
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            name='password'
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="Enter password"
                                            required
                                        />
                                    </div>

                                    <div className='flex space-x-4'>
                                        <button
                                            type='submit'
                                            disabled={addingStudent}
                                            className='btn btn-success cursor-not-allowed flex-1'
                                        >
                                            <i className="fas fa-check mr-2"></i>
                                            {addingStudent ? 'Adding...' : 'Add Student'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setShowAddStudent(false)}
                                            className="btn btn-outline flex-1"
                                            >
                                            <i className="fas fa-times mr-2"></i>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Students Table */}
                    {students.length > 0 ? (
                        <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">ID</th>
                                    <th className="px-4 py-2 border">Name</th>
                                    <th className="px-4 py-2 border">Email</th>
                                    <th className="px-4 py-2 border">Delete student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border text-center">{index + 1}</td>
                                        <td className="border text-center">{student.name}</td>
                                        <td className="border text-center">{student.email}</td>
                                        <td className="border text-center">
                                            <div className="flex justify-center">
                                                <button
                                                onClick={() => handleDelete(student.email)}
                                                className="delete-button flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition gap-2"
                                                >
                                                <i className="fas fa-trash"></i> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No students yet</h3>
                            <p className="text-gray-500 mb-6">Start by adding your first student</p>
                            <button
                                onClick={() => setShowAddStudent(true)}
                                className="btn btn-primary"
                            >
                                <i className="fas fa-user-plus mr-2"></i>
                                Add First Student
                            </button>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-4">
                                <i className="fas fa-book text-xl"></i>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Manage Courses</h3>
                                <p className="text-sm text-gray-500">Add, edit, or remove courses</p>
                            </div>
                        </div>
                    </div>

                    <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mr-4">
                                <i className="fas fa-chart-bar text-xl"></i>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Analytics</h3>
                                <p className="text-sm text-gray-500">View platform statistics</p>
                            </div>
                        </div>
                    </div>

                    <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mr-4">
                                <i className="fas fa-cog text-xl"></i>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Settings</h3>
                                <p className="text-sm text-gray-500">Platform configuration</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        <i className="fas fa-clock mr-2"></i>
                        Recent Activity
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;