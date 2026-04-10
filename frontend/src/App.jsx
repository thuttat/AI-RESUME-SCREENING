import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import PrivateRoute from "./pages/auth/PrivateRoute.jsx"; 

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard/RecruiterDashboard.jsx";
import JobManagement from "./pages/recruiter/JobManagement/JobManagement.jsx";
import CvUpload from "./pages/recruiter/CvUpload/CvUpload.jsx";
import CandidateRanking from "./pages/recruiter/CandidateRanking/CandidateRanking.jsx";
import EmailNotifications from "./pages/recruiter/EmailNotifications/EmailNotifications.jsx";
import PipelineReports from "./pages/recruiter/PipelineReports/PipelineReports.jsx";

import HiringManagerDashboard from "./pages/hiring-manager/HiringManagerDashboard.jsx";
import CandidatePipeline from "./pages/hiring-manager/CandidatePipeline.jsx";
import EmailTracking from "./pages/hiring-manager/EmailTracking.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

import "./App.css";
import {AuthProvider} from "./context/AuthContext.jsx";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                        path="/recruiter/*"
                        element={
                            <PrivateRoute allowedRoles={["RECRUITER"]}>
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

                    <Route
                        path="/manager/*"
                        element={
                            <PrivateRoute allowedRoles={["MANAGER"]}>
                                <BaseLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<HiringManagerDashboard />} />
                        <Route path="dashboard" element={<HiringManagerDashboard />} />
                        <Route path="pipeline" element={<CandidatePipeline />} />
                        <Route path="email-logs" element={<EmailTracking />} />
                    </Route>

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