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

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import "./App.css";
import UsersManagement from "./pages/admin/UsersManagement.jsx";
import JobTemplates from "./pages/admin/templatemanagement/JobTemplates.jsx";  
import EmailTemplates from "./pages/admin/templatemanagement/EmailTemplates.jsx";
import TemplateManagement from "./pages/admin/TemplateManagement.jsx";
import AIConfiguration from "./pages/admin/AIConfiguration.jsx";


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
                    <Route path="users" element={<UsersManagement />} />
                    <Route path="templates" element={<TemplateManagement />} />
                    <Route path="config" element={<AIConfiguration />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}