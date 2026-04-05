import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard.jsx";
import JobManagement from "./pages/recruiter/JobManagement.jsx";
import CvUpload from "./pages/recruiter/CvUpload.jsx";
import CandidateRanking from "./pages/recruiter/CandidateRanking.jsx";
import Email from "./pages/recruiter/Email.jsx";
import Pipeline from "./pages/recruiter/Pipeline.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";


import "./App.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recruiter/*" element={<BaseLayout />}>
                    <Route path="dashboard" element={<RecruiterDashboard />} />
                    <Route path="jobs" element={<JobManagement />} />
                    <Route path="upload" element={<CvUpload />} />
                    <Route path="ranking" element={<CandidateRanking />} />
                    <Route path="email" element={<Email />} />
                    <Route path="pipeline" element={<Pipeline />} />
                </Route>
                <Route path="/manager/*" element={<BaseLayout />}>
                </Route>
                <Route path="/admin" element={<BaseLayout />}>
                    {/* <Route index element={<Navigate to="dashboard" replace />} /> */}
                    <Route path="dashboard" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}