import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Netflix Components
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import MovieList from './components/MovieList/MovieList';
import MoreReasons from './components/MoreReasons/MoreReasons';
import Frequently from './components/Frequently/Frequently';
import Footer from "./components/Footer/Footer";

// Admin Components 
import Sidebar from './components/admin/Sidebar';
import Dashboard from './pages/Admindashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Home Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Banner />
              <MovieList />
              <MoreReasons />
              <Frequently />
              <Footer />
            </>
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <div className="d-flex">
              <Sidebar />
              <div className="p-4 flex-grow-1">
                <Dashboard />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/users"
          element={
            <div className="d-flex">
              <Sidebar />
              <div className="p-4 flex-grow-1">
                <Users />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <div className="d-flex">
              <Sidebar />
              <div className="p-4 flex-grow-1">
                <Settings />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
