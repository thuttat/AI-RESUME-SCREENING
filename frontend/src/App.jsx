import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";

// Auth Components
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import PrivateRoute from "./pages/auth/PrivateRoute.jsx"; 
import { AuthProvider } from "./context/AuthContext.jsx";

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard/RecruiterDashboard.jsx";
import JobManagement from "./pages/recruiter/JobManagement/JobManagement.jsx";
import CvUpload from "./pages/recruiter/CvUpload/CvUpload.jsx";
import CandidateRanking from "./pages/recruiter/CandidateRanking/CandidateRanking.jsx";
import EmailNotifications from "./pages/recruiter/EmailNotifications/EmailNotifications.jsx";
import PipelineReports from "./pages/recruiter/PipelineReports/PipelineReports.jsx";

import HiringManagerDashboard from "./pages/hiring-manager/HiringManagerDashboard.jsx";
import CandidatePipeline from "./pages/hiring-manager/CandidatePipeline.jsx";
import EmailTracking from "./pages/hiring-manager/EmailTracking.jsx";
import CandidateComparison from "./pages/hiring-manager/CandidateComparison.jsx";
import EmailTemplates from "./pages/hiring-manager/EmailTemplates.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

import "./App.css";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Recruiter Routes */}
                    <Route
                        path="/recruiter/*"
                        element={
                            <PrivateRoute allowedRoles={["RECRUITER", "ADMIN"]}>
                                <BaseLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<RecruiterDashboard />} />
                        <Route path="dashboard" element={<RecruiterDashboard />} />
                        <Route path="jobs" element={<JobManagement />} />
                        <Route path="upload" element={<CvUpload />} />
                        <Route path="ranking" element={<CandidateRanking />} />
                        <Route path="email" element={<EmailNotifications />} />
                        <Route path="pipeline" element={<PipelineReports />} />
                    </Route>

                    {/* Hiring Manager Routes */}
                    <Route
                        path="/manager/*"
                        element={
                            <PrivateRoute allowedRoles={["HIRING_MANAGER", "ADMIN"]}>
                                <BaseLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<HiringManagerDashboard />} />
                        <Route path="dashboard" element={<HiringManagerDashboard />} />
                        <Route path="pipeline" element={<CandidatePipeline />} />
                        <Route path="email-logs" element={<EmailTracking />} />
                        <Route path="comparison" element={<CandidateComparison />} />
                        <Route path="email-templates" element={<EmailTemplates />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route
                        path="/admin/*"
                        element={
                            <PrivateRoute allowedRoles={["ADMIN"]}>
                                <BaseLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}