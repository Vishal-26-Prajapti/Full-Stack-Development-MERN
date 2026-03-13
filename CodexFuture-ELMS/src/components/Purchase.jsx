import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CreditCard, Banknote, Smartphone } from "lucide-react"; // icons

const Purchase = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [course, setCourse] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [processing, setProcessing] = useState(false);

    const courses = [
        { id: 1, title: "Full Stack Developer", price: 299.99 },
        { id: 2, title: "MERN Stack Developer", price: 399.99 },
        { id: 3, title: "Data Analytics", price: 249.99 },
        { id: 4, title: "Data Science", price: 499.99 },
        { id: 5, title: "Java Developer", price: 349.99 },
        { id: 6, title: "Python Developer", price: 279.99 },
    ];

    // Get selected course
    useEffect(() => {
        const courseId = location.state?.courseId;
        if (courseId) {
        const selected = courses.find((c) => c.id === courseId);
        setCourse(selected);
        }
    }, [location.state]);

    if (!user) {
        navigate("/login");
        return null;
    }

    const handlePayment = () => {
        if (!course || !user) return;

        setProcessing(true);

        setTimeout(() => {
            // Get existing purchases from localStorage
            const existingPurchases = JSON.parse(localStorage.getItem("purchasedCourses")) || [];

            // Create a new purchase entry
            const newPurchase = {
                ...course,
                userEmail: user.useremail,
                purchaseDate: new Date().toISOString(),
                progress: 0, // initial progress
            };

            // Save to localStorage
            localStorage.setItem("purchasedCourses", JSON.stringify([...existingPurchases, newPurchase]));

            alert(`✅ Payment Successful for ${course.title}!`);
            navigate("/dashboard");
        }, 1500);
    };

    return (
        <div className="purchase-top min-h-screen bg-gradient-to-r from-indigo-200 to-purple-200 flex items-center justify-center p-4">
        <div className="pruchase-container bg-white shadow-2xl rounded-2xl border border-gray-200 w-full max-w-lg p-8 relative overflow-hidden">
            
            {/* Decorative top bar */}
            <h2 className="text-center text-2xl font-bold mb-6 text-gray-900">
            Purchase Course
            </h2>

            {/* Course Info */}
            {course ? (
            <div className="border border-blue-100 bg-blue-50 p-5 rounded-xl mb-6 shadow-sm">
                <h3 className="text-xl font-semibold text-blue-900">{course.title}</h3>
                <p className="text-gray-900 mt-2">
                💰 <span className="font-semibold text-gray-900">Price:</span> ₹{course.price}
                </p>
                <p className="text-gray-900 mt-2">
                👤 <span className="font-semibold text-gray-900">User:</span> {user.username || "Student"}
                </p>
            </div>
            ) : (
            <p className="text-gray-600 mb-6 text-center">
                No course selected. Go back and choose a course.
            </p>
            )}

            {/* Payment Options */}
            <div className="mb-6">
            <label className="block mb-3 font-bold text-gray-900 text-lg">
                Select Payment Method
            </label>
                <div className="space-y-3">
                    {[
                    { id: "upi", label: "UPI / QR Code", icon: <Smartphone size={40} /> },
                    { id: "credit", label: "Credit / Debit Card", icon: <CreditCard size={40} /> },
                    { id: "netbanking", label: "Net Banking", icon: <Banknote size={40} /> },
                    ].map((method) => (
                    <label
                        key={method.id}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transform transition-all duration-300 ${
                            paymentMethod === method.id
                            ? "bg-blue-100 border-blue-500 shadow-md scale-100"
                            : "bg-white border-gray-300 hover:-translate-y-1  hover:shadow-sm hover:border-blue-400"
                        }`}
                    >
                        <div className="flex items-center space-x-3">
                            <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={paymentMethod === method.id}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-blue-600 scale-150 accent-blue-600"
                            />
                            <span className="text-gray-900 font-medium">{method.label}</span>
                        </div>
                        <div className="text-blue-600">{method.icon}</div>
                    </label>

                    ))}
                </div>
            </div>

            {/* Confirm Payment */}
            <button
            onClick={handlePayment}
            disabled={processing}
            className={`w-full h-15 py-3 rounded-lg font-semibold text-white text-lg transition-all duration-300 cursor-pointer ${
                processing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-blue-700 shadow-md"
            }`}
            >
            {processing ? "Processing Payment..." : "💳 Pay Securely Now"}
            </button>

            {/* Back Button */}
            <button
            onClick={() => navigate("/courses")}
            className="text-lg btn btn-outline w-full mt-4 py-2.5 rounded-lg border border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-all"
            >
            ← Back to Courses
            </button>
        </div>
        </div>
    );
};

export default Purchase;