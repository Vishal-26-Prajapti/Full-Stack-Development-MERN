import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
    const { user } = useContext(AuthContext); 

    const getCourseImage = (title) => {
        const images = {
            "Full Stack Developer": "/src/assets/course-icons/Full-Stack-Developers.webp",
            "Data Science": "/src/assets/course-icons/Data-Science.jpg",
            "MERN Stack Developer": "/src/assets/course-icons/MERN.avif",
        };
        return images[title] || "/src/assets/course-icons/default.png";
    };

    return (
        <div className="min-h-screen relative home-page">
            <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-50 to-purple-50">

                <div className="section-1 relative max-w-6xl mx-auto">
                    <div className="relative">

                        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 mt-16">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-blue-600 via-purple-500  to-pink-600 bg-clip-text text-transparent">CodexFuture</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Master cutting-edge technologies with our comprehensive e-learning platform. 
                            From Full Stack development to Data Science, unlock your potential today.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to={user ? "/dashboard" : "/courses"} 
                                className="btn btn-primary text-xl px-8 py-4"
                            >
                                <i className="fas fa-graduation-cap"></i>
                                {user ? "Go to Dashboard" : "Explore Courses"}
                            </Link>

                            <Link
                                to="/courses"
                                className="btn btn-outline text-lg px-8 py-4">
                                <i className="fas fa-book"></i>View All Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* feature selection */}
            <section className="relative min-h-[70vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="relative max-w-6xl mx-auto">
                    <h2 className="relative text-4xl font-bold text-center text-gray-900 mb-16 top-[130px]">
                        Why Choose CodexFuture?
                    </h2>

                    <div className="feature relative grid md:grid-cols-3 gap-8">
                        <div className="card card-gradient text-center p-8 fade-in-up">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-trophy text-2xl text-white"></i>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Expert-Curated Content</h3>
                            <p className="text-gray-600 leading-relaxed">Learn from industry professionals with structured courses designed 
                            for practical, real-world application.</p>
                        </div>

                        <div className="card card-gradient text-center p-8 fade-in-up">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-chart-line text-2xl text-white"></i>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Track Your Progress</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Monitor your learning journey with detailed progress tracking 
                                and personalized learning paths.
                            </p>
                        </div>
                            
                        <div className="card card-gradient text-center p-8 fade-in-up">
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-certificate text-2xl text-white"></i>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Earn Certificates</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get recognized for your achievements with certificates 
                                upon successful course completion.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course preview */}
            <section className="relative min-h-[80vh] flex flex-col justify-center items-center">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="relative text-4xl font-bold text-gray-900 mb-4 top-[50px]">
                            Popular Courses
                        </h2>
                        <p className="relative text-xl text-gray-600 top-[50px]">
                            Start your journey with our most sought-after programs
                        </p>
                    </div>

                    <div className="relative popular-courses grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Full Stack Developer",
                                description: "Master both frontend and backend development",
                            },
                            {
                                title: "Data Science",
                                description: "Learn AI, ML and data analysis techniques", 
                            },
                            {
                                title: "MERN Stack Developer",
                                description: "Complete MongoDB, Express, React, Node.js",
                            }
                        ].map((course, index) => (
                            <div key={index} className="course-card interactive-hover">
                                <div
                                    className={'flex items-center justify-center p-6 rounded-t-2xl'}
                                >
                                    <img
                                        src={getCourseImage(course.title)}
                                        alt={course.title}
                                        className="course-image"
                                    />
                                </div>
                                <div className="pl-7 course-card-header">
                                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{course.title}</h3>
                                    <p className="text-gray-600 mb-4">{course.description}</p>
                                    <Link
                                        to="/courses"
                                        className="btn btn-outline w-full"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className='relative text-4xl md:text-5xl font-bold mb-6'>
                        Ready to Start Learning?
                    </h2>

                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of students already advancing their careers with CodexFuture
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            to='/login'
                            className="btn bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-lg font-semibold transition"
                        >
                            <i className="fas fa-rocket mr-2"></i>
                            Get Started
                        </Link>

                        <Link 
                            to="/courses" 
                            className="btn border-2 border-white text-white hover:bg-white hover:text-indigo-600 text-lg px-8 py-4 rounded-lg font-semibold transition"
                        >
                            <i className="fas fa-search mr-2"></i>
                            Browse Courses
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-900 text-gray-300 py-10">
                <div className="relative footer max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left top-[40px]">
                    {/* Column 1: Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">CodexFuture</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Empowering learners to master modern technologies through hands-on education.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/courses" className="hover:text-white transition">Courses</Link></li>
                            <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Social Media */}
                    <div>
                        <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
                        <div className="flex justify-center md:justify-start space-x-6">
                            <a href="#" className="hover:text-white text-lg transition"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="hover:text-white text-lg transition"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-white text-lg transition"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-white text-lg transition"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="relative footer-bottom border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm sm:text-base">
                    © {new Date().getFullYear()} CodexFuture. All rights reserved.
                </div>
                </footer>
        </div>
    );
};

export default Home;