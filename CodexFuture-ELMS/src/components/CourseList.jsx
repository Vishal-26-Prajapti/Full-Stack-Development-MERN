import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState("all");
    const { user } = useContext(AuthContext); 
    
    // Default course data
    const default_courses = [
        {
        id: 1,
        title: "Full Stack Developer",
        description: "Master both frontend and backend development with modern technologies",
        category: "Web Development",
        modules: [
            { title: "HTML & CSS Fundamentals", content: "Learn the basics of web markup and styling", order: 1 },
            { title: "JavaScript Essentials", content: "Master JavaScript programming", order: 2 },
            { title: "React.js Framework", content: "Build interactive user interfaces", order: 3 },
            { title: "Node.js & Express", content: "Server-side development", order: 4 },
            { title: "Database Integration", content: "Work with databases", order: 5 }
        ],
        price: 299.99
        },
        {
        id: 2,
        title: "MERN Stack Developer",
        description: "Complete MongoDB, Express, React, Node.js development course",
        category: "Web Development",
        modules: [
            { title: "MongoDB Fundamentals", content: "Database design and operations", order: 1 },
            { title: "Express.js Framework", content: "Backend API development", order: 2 },
            { title: "React Advanced Concepts", content: "State management and hooks", order: 3 },
            { title: "Node.js Best Practices", content: "Server optimization and deployment", order: 4 }
        ],
        price: 399.99
        },
        {
        id: 3,
        title: "Data Analytics",
        description: "Analyze and visualize data to make informed business decisions",
        category: "Data Science",
        modules: [
            { title: "Statistics Fundamentals", content: "Basic statistical concepts", order: 1 },
            { title: "Excel for Analytics", content: "Advanced Excel techniques", order: 2 },
            { title: "SQL for Data Analysis", content: "Database querying", order: 3 },
            { title: "Python for Analytics", content: "Data manipulation with pandas", order: 4 },
            { title: "Data Visualization", content: "Creating charts and dashboards", order: 5 }
        ],
        price: 249.99
        },
        {
        id: 4,
        title: "Data Science",
        description: "Complete data science pipeline from collection to machine learning",
        category: "Data Science",
        modules: [
            { title: "Python for Data Science", content: "NumPy, Pandas, and Matplotlib", order: 1 },
            { title: "Machine Learning Basics", content: "Supervised and unsupervised learning", order: 2 },
            { title: "Deep Learning Introduction", content: "Neural networks with TensorFlow", order: 3 },
            { title: "Model Deployment", content: "Deploy ML models to production", order: 4 }
        ],
        price: 499.99
        },
        {
        id: 5,
        title: "Java Developer",
        description: "Enterprise Java development with Spring framework",
        category: "Programming",
        modules: [
            { title: "Java Fundamentals", content: "Object-oriented programming concepts", order: 1 },
            { title: "Spring Framework", content: "Dependency injection and Spring Boot", order: 2 },
            { title: "Database Integration", content: "JPA and Hibernate", order: 3 },
            { title: "REST APIs", content: "Building web services", order: 4 },
            { title: "Testing & Deployment", content: "JUnit testing and deployment strategies", order: 5 }
        ],
        price: 349.99
        },
        {
        id: 6,
        title: "Python Developer",
        description: "Modern Python development for web applications and automation",
        category: "Programming",
        modules: [
            { title: "Python Syntax & Basics", content: "Variables, functions, and control structures", order: 1 },
            { title: "Django Framework", content: "Web development with Django", order: 2 },
            { title: "FastAPI Development", content: "Modern async API development", order: 3 },
            { title: "Python Libraries", content: "Working with popular libraries", order: 4 },
            { title: "Automation & Scripting", content: "Task automation and web scraping", order: 5 }
        ],
        price: 279.99
        }
    ];

    // Load default courses on component mount
    useEffect(() => {
        // Assign IDs for key usage
        const coursesWithIds = default_courses.map((course, index) => ({
        id: index + 1,
        ...course
        }));
        setCourses(coursesWithIds);
    }, []);

    // Helper function
    const getCourseImage = (title) => {
        const images = {
            "Full Stack Developer": "/src/assets/course-icons/Full-Stack-Developers.webp",
            "MERN Stack Developer": "/src/assets/course-icons/MERN.avif",
            "Data Analytics": "/src/assets/course-icons/Data-Analytics.jpg",
            "Data Science": "/src/assets/course-icons/Data-Science.jpg",
            "Java Developer": "/src/assets/course-icons/Java-Developer.webp",
            "Python Developer": "/src/assets/course-icons/Python-Developer.jpg",
        };
        return images[title] || "/src/assets/course-icons/default.png";
    };

    const filteredCourses = courses.filter((course) => {
        if (filter === "all") return true;
        return course.category.toLowerCase().includes(filter.toLowerCase());
    });

    return (
        <div className="min-h-screen py-8 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Explore Our{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Courses
                    </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Comprehensive learning paths designed to take you from beginner to expert
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {["all", "Web Development", "Data Science", "Programming"].map(
                    (category) => (
                        <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`course-button rounded-full font-medium transition-all ${
                            filter === category
                            ? "bg-indigo-600 text-white shadow-lg"
                            : "bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200"
                        }`}
                        >
                        {category === "all" ? "All Courses" : category}
                        </button>
                    )
                    )}
                </div>

                {/* Course Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course, index) => (
                    <div key={course.id} className="course-card interactive-hover fade-in-up">
                        
                        {/* Course Image*/} 
                        <div>
                            <img
                                src={getCourseImage(course.title)}
                                alt={course.title}
                                className="course-image"
                            />
                        </div>

                        {/* Course Content */}
                        <div className="course-content bg-white p-6 rounded-b-2xl shadow-md">
                            <div className="flex items-center justify-between mb-3">
                                <span className="badge badge-primary">{course.category}</span>
                                <span className="text-lg font-bold text-gray-900">${course.price}</span>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {course.title}
                            </h3>

                            <p className="text-gray-600 mb-4 leading-relaxed">
                                {course.description}
                            </p>

                            <div className="flex items-center mb-4 text-sm text-gray-500">
                                <i className="fas fa-play-circle mr-2"></i>
                                <span>{course.modules.length} modules</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2">
                                <Link
                                to={`/course/${course.id}`}
                                className="btn btn-primary w-full"
                                >
                                <i className="fas fa-eye mr-2"></i>
                                View Details
                                </Link>

                                {user ? (
                                    <Link
                                    to="/purchase"
                                    state={{ courseId: course.id }}
                                    className="btn btn-secondary w-full"
                                    >
                                    <i className="fas fa-shopping-cart mr-2"></i>
                                    Purchase Course
                                    </Link>
                                ) : (
                                    <Link
                                    to="/login"
                                    className="btn btn-outline w-full"
                                    >
                                    <i className="fas fa-sign-in-alt mr-2"></i>
                                    Login to Enroll
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                {/* call to action */}
                <div className="login-bottom text-center mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Ready to start learning?
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                        Join thousands of students and advance your career today
                    </p>
                    <Link
                        to='/login'
                        className="btn btn-primary text-lg px-8 py-4"
                    >
                        <i className="fas fa-rocket mr2"></i>
                        Get Started Now
                    </Link>
                </div>
            </div>
        </div>
    )
}   

export default Courses;