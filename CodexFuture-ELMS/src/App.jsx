import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import { AuthProvider } from "./context/AuthContext";

import Home from './components/Home';
import Login from './components/Login';
import Navbar from "./components/Navbar";
import Purchase from "./components/Purchase";
import Courses from './components/CourseList';
import Dashboard from './components/Dashboard';
import CourseDetail from "./components/CourseDetail";
import ForgotPassword from "./components/ForgotPassword";
import AdminDashboard from "./components/AdminDashboard";
import VoiceAssistant from "./components/VoiceAssistant";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <VoiceAssistant />
        <div className='mt-4'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} /> 
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/purchase" element={<Purchase />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;