import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import PrivateRoute from "./pages/auth/PrivateRoute.jsx"; 

import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard.jsx";
import JobManagement from "./pages/recruiter/JobManagement.jsx";
import CvUpload from "./pages/recruiter/CvUpload.jsx";
import CandidateRanking from "./pages/recruiter/CandidateRanking.jsx";
import Email from "./pages/recruiter/Email.jsx";
import Pipeline from "./pages/recruiter/Pipeline.jsx";

import HiringManagerDashboard from "./pages/hiring-manager/HiringManagerDashboard.jsx";
import CandidatePipeline from "./pages/hiring-manager/CandidatePipeline.jsx";
import EmailTracking from "./pages/hiring-manager/EmailTracking.jsx";
import CandidateComparison from "./pages/hiring-manager/CandidateComparison.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
// SỬA LỖI ĐƯỜNG DẪN Ở ĐÂY:
import EmailTemplates from "./pages/hiring-manager/EmailTemplates.jsx";

import "./App.css";

export default function App() {
    return (
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
                    <Route path="email" element={<Email />} />
                    <Route path="pipeline" element={<Pipeline />} />
                </Route>

                <Route
                    path="/manager/*"
                    element={
                        <PrivateRoute allowedRoles={["HIRING_MANAGER"]}>
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
    );
}