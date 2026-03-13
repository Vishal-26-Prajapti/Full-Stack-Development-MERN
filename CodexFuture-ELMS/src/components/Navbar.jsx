import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BACKEND_URL = "http://localhost:5000";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await fetch(`${BACKEND_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
  };

  const handleLinkClick = () => setIsMenuOpen(false);

  if (loading) return null; // wait until user state is loaded

  // Navbar links
  const navLinks = [
    { to: "/", label: "Home", icon: "fa-home" },
    { to: "/courses", label: "Courses", icon: "fa-book" },
  ];

  if (user) {
    if (user.useremail === "admin@example.com") {
      navLinks.push({ to: "/admin", label: "Admin Dashboard", icon: "fa-cog" });
    } else {
      navLinks.push({ to: "/dashboard", label: "Dashboard", icon: "fa-tachometer-alt" });
    }
  }

  return (
    <nav className="navbar shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-graduation-cap text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              CodexFuture
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              // Determine if link is active
              const activeClass = isActive(link.to) ? "active" : "";

              if (link.to === "/dashboard" && !user) return null;
              if (link.to === "/admin" && user?.useremail !== "admin@example.com") return null;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${activeClass}`}
                >
                  <i className={`fas ${link.icon} mr-2`}></i>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2 mr-4">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.useremail}</p>
                  <p className="text-xs text-gray-500">{user.useremail === "admin@example.com" ? "Administrator" : "User"}</p>
                </div>
              </div>
            )}

            {user ? (
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                <i className="fas fa-sign-out-alt mr-2"></i> Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary">
                <i className="fas fa-sign-in-alt mr-2"></i> Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-white rounded-lg shadow p-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block hover:text-indigo-600"
                onClick={handleLinkClick}
              >
                <i className={`fas ${link.icon} mr-2`}></i>
                {link.label}
              </Link>
            ))}

            <div className="pt-2 border-t mt-2 flex flex-col space-y-2">
              {user && (
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-white text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.useremail}</p>
                    <p className="text-xs text-gray-500">{user.useremail === "admin@example.com" ? "Administrator" : "Student"}</p>
                  </div>
                </div>
              )}

              {user ? (
                <button onClick={handleLogout} className="btn btn-outline btn-sm w-full">
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary w-full text-center"
                  onClick={handleLinkClick}
                >
                  <i className="fas fa-sign-in-alt mr-2"></i> Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;