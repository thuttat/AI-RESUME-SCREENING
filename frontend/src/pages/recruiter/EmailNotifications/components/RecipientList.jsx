import { Card, CardHeader, CardBody } from '../../../../components/common/Card';
import { Button } from '../../../../components/common/Button';
import { Search, Loader2, Users } from 'lucide-react';
import RecipientGroup from './RecipientGroup';
import React from "react";

export default function RecipientList({
                                          jobs,
                                          selectedJobId,
                                          setSelectedJobId,
                                          recipients,
                                          loading,
                                          selectedRecipients,
                                          toggleRecipient,
                                          handleSelectAll,
                                          searchTerm,
                                          setSearchTerm
                                      }) {

    const filteredRecipients = recipients.filter(r =>
        r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const statusPriority = {
        SHORTLIST: 1,
        REJECT: 2,
        PENDING: 3
    };

    const availableStatus = [...new Set(filteredRecipients.map(r => r.status))]
        .sort((a, b) => (statusPriority[a] || 99) - (statusPriority[b] || 99));

    return (
        <Card className="recipients-card">
            <CardHeader className="card-header">
                <div className="header-row">
                    <h4 className="panel-title"><Users size={16}/> Recipients</h4>
                    <Button variant="muted" onClick={handleSelectAll}>
                        {selectedRecipients.length === recipients.length && recipients.length > 0 ? 'Deselect All' : 'Select All'}
                    </Button>
                </div>
                <select
                    className="clean-input job-list"
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(e.target.value)}
                >
                    {jobs.map(job => (
                        <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                </select>
            </CardHeader>

            <div className="recipient-search-bar">
                <Search size={14} className="text-muted" />
                <input
                    type="text"
                    placeholder="Find candidate..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <CardBody className="recipient-list">
                {loading ? (
                    <div className="recipient-loading">
                        <Loader2 className="spinner" size={20} />
                    </div>
                ) : availableStatus.map(status => (
                    <RecipientGroup
                        key={status}
                        status={status}
                        recipients={filteredRecipients.filter(r => r.status === status)}
                        selectedRecipients={selectedRecipients}
                        toggleRecipient={toggleRecipient}
                    />
                ))}

                {!loading && filteredRecipients.length === 0 && (
                    <p className="no-result">No candidates found</p>
                )}
            </CardBody>
        </Card>
    );
}