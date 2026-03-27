import { BrowserRouter, Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard.jsx";
import JobManagement from "./pages/recruiter/JobManagement.jsx";
import CvUpload from "./pages/recruiter/CvUpload.jsx";
import CandidateRanking from "./pages/recruiter/CandidateRanking.jsx";
import Email from "./pages/recruiter/Email.jsx";
import Pipeline from "./pages/recruiter/Pipeline.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BaseLayout />}>
                    <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                    <Route path="/recruiter/jobs" element={<JobManagement />} />
                    <Route path="/recruiter/upload" element={<CvUpload />} />
                    <Route path="/recruiter/ranking" element={<CandidateRanking />} />
                    <Route path="/recruiter/email" element={<Email />} />
                    <Route path="/recruiter/pipeline" element={<Pipeline />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}