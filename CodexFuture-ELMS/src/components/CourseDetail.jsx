import React, {useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

const allCourses = [
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

const CourseDetail = () => {
  const { id } = useParams(); // 👈 Get course id from URL
  const course = allCourses.find(c => c.id === parseInt(id));
  const { user } = useContext(AuthContext); 

  const getCourseIcon = (title) => {
    const icons = {
      'Full Stack Developer': 'fas fa-code',
      'MERN Stack Developer': 'fab fa-react',
      'Data Analytics': 'fas fa-chart-line',
      'Data Science': 'fas fa-brain',
      'Java Developer': 'fab fa-java',
      'Python Developer': 'fab fa-python'
    };
    return icons[title] || 'fas fa-book';
  };

  return (
    <div className='course-deatil-nav min-h-screen py-8 px-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50'>
      <div className='max-w-4xl mx-auto'>
        <nav className='flex mb-8 text-sm'>
          <Link to="/" className='text-gray-500 hover:text-gray-700'>Home</Link>
          <span className='mx-2 text-gray-400'>/</span>
          <Link to="/courses" className='text-gray-500 hover:text-gray-700'>Courses</Link>
          <span className='mx-2 text-gray-400'>/</span>
          <span className='text-gray-900 font-medium'>{course.title}</span>
        </nav>

        {/* Course Header */}
        <div className="course-detail bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className="fa-code-icon w-16 h-16 bg-white rounded-xl flex items-center justify-center mr-4">
                  <i className={`${getCourseIcon(course.title)} text-2xl`}></i>
                </div>
                <div>
                  <span className="badge bg-white text-indigo-600 font-semibold">
                    {course.category}
                  </span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="course-title">
                {course.title}
              </h1>
              
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm opacity-90">
                <span>
                  <i className="fas fa-play-circle mr-2"></i>
                  {course.modules.length} Modules
                </span>
                <span>
                  <i className="fas fa-clock mr-2"></i>
                  Self-paced
                </span>
                <span>
                  <i className="fas fa-certificate mr-2"></i>
                  Certificate included
                </span>
              </div>
            </div>

            {/* Price Card */}
            <div className="hidden md:block ml-8">
              <div className="price-card bg-white text-gray-900 rounded-xl p-6 shadow-lg min-w-[250px]">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-indigo-600" data-testid="course-price">
                    ${course.price}
                  </div>
                </div>

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

                <div className="text-xs text-gray-500 text-center mt-3">
                  30-day money-back guarantee
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Price Card */}
        <div className="md:hidden mb-8">
          <div className="card">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-indigo-600">
                ${course.price}
              </div>
            </div>

            <Link
              to="/login"
              className="btn btn-primary w-full mb-3"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Login to Enroll
            </Link>

            <div className="text-xs text-gray-500 text-center">
              30-day money-back guarantee
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Modules */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                <i className="fas fa-list mr-2"></i>
                Course Curriculum
              </h2>
              
              <div className="space-y-3">
                {course.modules.map((module, index) => (
                  <Link className="block transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg rounded-lg p-3 bg-white">
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start flex-1">
                            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3 mt-1 text-sm font-semibold">
                              {module.order || index + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1" data-testid={`module-${index}-title`}>
                                {module.title}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {module.content}
                              </p>
                            </div>
                          </div>
                          <i className="fas fa-play-circle text-indigo-600 text-xl ml-3"></i>
                        </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                <i className="fas fa-lightbulb mr-2"></i>
                What You'll Learn
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Comprehensive understanding of core concepts',
                  'Hands-on practical projects and exercises', 
                  'Industry best practices and standards',
                  'Real-world application techniques',
                  'Problem-solving and debugging skills',
                  'Portfolio-ready projects for showcasing'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mr-3 mt-1"></i>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                <i className="fas fa-clipboard-list mr-2"></i>
                Requirements
              </h2>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <i className="fas fa-laptop text-indigo-600 mr-3 mt-1"></i>
                  <span>A computer with internet connection</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-heart text-red-500 mr-3 mt-1"></i>
                  <span>Enthusiasm to learn and practice</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-clock text-yellow-500 mr-3 mt-1"></i>
                  <span>Commitment to complete the coursework</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-code text-green-500 mr-3 mt-1"></i>
                  <span>Basic familiarity with computers (no prior coding experience required)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Features */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Course Features
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    <i className="fas fa-video mr-2"></i>
                    Video Lessons
                  </span>
                  <span className="font-semibold">{course.modules.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    <i className="fas fa-file-alt mr-2"></i>
                    Downloadable Resources
                  </span>
                  <span className="font-semibold">Yes</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    <i className="fas fa-certificate mr-2"></i>
                    Certificate
                  </span>
                  <span className="font-semibold">Yes</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    <i className="fas fa-infinity mr-2"></i>
                    Lifetime Access
                  </span>
                  <span className="font-semibold">Yes</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    <i className="fas fa-mobile-alt mr-2"></i>
                    Mobile Friendly
                  </span>
                  <span className="font-semibold">Yes</span>
                </div>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <i className="fas fa-chalkboard-teacher mr-2"></i>
                Instructor
              </h3>
              
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <i className="fas fa-user-tie text-white"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">CodexFuture Team</p>
                  <p className="text-sm text-gray-500">Expert Instructors</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed">
                Our courses are created by industry experts with years of practical experience 
                in their respective fields. Learn from the best!
              </p>
            </div>

            {/* Money Back Guarantee */}
            <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-shield-alt text-white text-xl"></i>
                </div>
                <h3 className="font-semibold text-green-900 mb-2">
                  30-Day Money-Back Guarantee
                </h3>
                <p className="text-sm text-green-700">
                  Not satisfied? Get a full refund within 30 days, no questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            to="/courses" 
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            data-testid="back-home-link"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Course
          </Link>
        </div>
      </div>
    </div>
  )

}
export default CourseDetail;