
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import CoursePage from "../pages/instructor/CoursePage";
import UploadMedia from "../pages/instructor/UploadMedia";
import InstructorStudents from "../pages/instructor/InstructorStudents";

import StudentDashboard from "../pages/student/StudentDashboard";
import CourseMedia from "../pages/student/CourseMedia";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminMedia from "../pages/admin/AdminMedia";

import ProtectedRoute from "../components/ProtectedRoute";

import HomePage from "../pages/HomePage";
import Footer from "../components/Footer";
import ContactPage from "../pages/ContactPage";
import Navbar from "../components/Navbar";


export default function AppRouter() {
  return (
    <BrowserRouter>
    <Navbar /> 
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT ROUTES */}
        <Route
          path="/student"
          element={
            <ProtectedRoute roles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/course/:courseId/media"
          element={
            <ProtectedRoute roles={["student","admin","instructor"]}>
              <CourseMedia />
            </ProtectedRoute>
          }
        />

        {/* INSTRUCTOR ROUTES */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute roles={["instructor"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/course/:courseId"
          element={
            <ProtectedRoute roles={["instructor"]}>
              <CoursePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/course/:courseId/upload"
          element={
            <ProtectedRoute roles={["instructor"]}>
              <UploadMedia />
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor/course/:courseId/students"
          element={
            <ProtectedRoute roles={["instructor"]}>
              <InstructorStudents />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/media"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminMedia />
            </ProtectedRoute>
          }
        />
        

       
      
              {/* FOOTER ROUTE */}
        <Route path="/contact" element={<ContactPage />} />

        {/* FALLBACK */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* Global Footer (always visible) */}
      <Footer />

    </BrowserRouter>
  );
}
