import React, {useEffect, useState} from 'react';
import { Card, CardHeader, CardBody } from '../../../components/common/Card.jsx';
import { Button } from '../../../components/common/Button.jsx';
import { Badge } from '../../../components/common/Badge.jsx';
import {Mail, Send, CheckCircle2, Users, FileText, Search, Loader2, MailCheck, History} from 'lucide-react';
import './EmailNotifications.css';
import {EmailTemplateService} from "../../../apis/EmailTemplateService.js";
import {JobService} from "../../../apis/JobService.js";
import TemplateList from "./components/TemplateList.jsx";
import RecipientList from "./components/RecipientList.jsx";
import EmailEditor from "./components/EmailEditor.jsx";
import EmailHistory from "./components/EmailHistory.jsx";


export default function EmailNotifications() {
    // State email template
    const [templates, setTemplates] = useState([]);
    const [loadingTemplates, setLoadingTemplates] = useState(true);
    const [activeTemplate, setActiveTemplate] = useState(null);
    const [emailData, setEmailData] = useState({ subject: '', body: '' });

    // State job & recipients
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState("");
    const [recipients, setRecipients] = useState([]);
    const [loadingRecipients, setLoadingRecipients] = useState(false);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // State email logs
    const [history, setHistory] = useState([]);
    const [historyPage, setHistoryPage] = useState(0);
    const [historyTotalPages, setHistoryTotalPages] = useState(0);
    const [showHistory, setShowHistory] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(false);

    const fetchHistory = async (page = 0) => {
        try {
            setLoadingHistory(true);
            const response = await EmailTemplateService.getAllEmailLogsByRecruiter(page, 10);
            const data = response.data;

            setHistory(data.content || []);
            setHistoryTotalPages(data.totalPages || 0);
            setHistoryPage(data.pageNo || 0);
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoadingHistory(false);
        }
    };

    useEffect(() => {
        if (showHistory) fetchHistory(historyPage);
    }, [historyPage, showHistory]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                setLoadingTemplates(true);
                const response = await EmailTemplateService.getAllTemplates("", 0, 50);
                const templatesList = response.data.content;
                setTemplates(templatesList);
            } catch (error) {
                console.error("Error fetching templates: ", error);
            } finally {
                setLoadingTemplates(false);
            }
        };
        fetchTemplates();
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await JobService.getOwnJobs();
                setJobs(response.data);

                if (response.data.length > 0) {
                    setSelectedJobId(response.data[0].id);
                }
            } catch (error) {
                console.error("Error fetching jobs: ", error);
            }
        };
        fetchJobs();
    }, []);

    useEffect(() => {
        const fetchCandidates = async () => {
            if (!selectedJobId) return;
            try {
                setLoadingRecipients(true);
                const response = await JobService.getRankedCandidates(selectedJobId, 0, 100);

                const mappedCandidates = response.data.content.map(c => ({
                    id: c.applicationId,
                    name: c.candidateName,
                    email: c.candidateEmail,
                    status: c.status === "SUCCESS" ? "PENDING" : c.status,
                    hasSentEmail: c.hasSentEmail || false
                }));

                setRecipients(mappedCandidates);
                setSelectedRecipients(mappedCandidates.map(r => r.id));
            } catch (error) {
                console.error("Error fetching jobs: ", error);
            } finally {
                setLoadingRecipients(false);
            }
        };
        fetchCandidates();
    }, [selectedJobId]);

    const handleTemplateSelect = (template) => {
        setActiveTemplate(template.id);
        setEmailData({
            subject: template.subject,
            body: template.body
        });
    };

    const toggleRecipient = (id) => {
        setSelectedRecipients(prev =>
            prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedRecipients.length === recipients.length) {
            setSelectedRecipients([]);
        } else {
            setSelectedRecipients(recipients.map(r => r.id));
        }
    };

    const handleSend = async () => {
        if (selectedRecipients.length === 0)
            return alert("Please select at least one candidate!");
        if (!emailData.subject || !emailData.body)
            return alert("Please enter the full subject and content!");

        try {
            const payload = {
                applicationIds: selectedRecipients,
                subject: emailData.subject,
                body: emailData.body,
            };
            await EmailTemplateService.sendEmails(payload);
            alert(`${selectedRecipients.length} emails have been queued for sending. Please monitor their status in the History tab!`);

            setRecipients(prevRecipients =>
                prevRecipients.map(candidate =>
                    selectedRecipients.includes(candidate.id)
                        ? { ...candidate, hasSentEmail: true }
                        : candidate
                )
            );

            setEmailData({ subject: '', body: '' });
            setActiveTemplate(null);
            setSelectedRecipients([]);

            fetchHistory();
            setShowHistory(true);
        } catch (error) {
            console.error("Error sending email template: ", error);
            alert("Failed to send emails. Please try again later!");
        }
    };

    return (
        <div className="email-workspace">
            <div className="workspace-header">
                <div>
                    <h1>Email Workspace</h1>
                    <p className="page-subtitle">Select a template, review recipients, and send bulk emails seamlessly.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button variant={showHistory ? "primary" : "outline"} onClick={() => setShowHistory(!showHistory)}>
                        <History size={16} /> {showHistory ? "Back to Compose" : "View History"}
                    </Button>
                    {!showHistory && (
                        <Button onClick={handleSend} disabled={selectedRecipients.length === 0}>
                            <Send size={16} /> Send {selectedRecipients.length > 0 ? `(${selectedRecipients.length})` : ''} Emails
                        </Button>
                    )}
                </div>
            </div>

            {showHistory ? (
                <div style={{ flex: 1, padding: '20px 0' }}>
                    <EmailHistory
                        history={history}
                        loading={loadingHistory}
                        currentPage={historyPage}
                        totalPages={historyTotalPages}
                        setCurrentPage={setHistoryPage}
                    />
                </div>
            ) : (
                <div className="workspace-grid">
                    <div className="config-panel">
                        <TemplateList
                            templates={templates}
                            loading={loadingTemplates}
                            activeTemplate={activeTemplate}
                            onSelect={handleTemplateSelect}
                        />

                        <RecipientList
                            jobs={jobs}
                            selectedJobId={selectedJobId}
                            setSelectedJobId={setSelectedJobId}
                            recipients={recipients}
                            loading={loadingRecipients}
                            selectedRecipients={selectedRecipients}
                            toggleRecipient={toggleRecipient}
                            handleSelectAll={handleSelectAll}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    </div>

                    <EmailEditor
                        recipients={recipients}
                        selectedRecipients={selectedRecipients}
                        emailData={emailData}
                        setEmailData={setEmailData}
                    />
                </div>
            )}
        </div>
    );
}