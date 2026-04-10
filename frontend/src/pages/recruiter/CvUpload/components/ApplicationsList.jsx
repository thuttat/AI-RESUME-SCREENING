import React from 'react';
import ApplicationCard from './ApplicationCard.jsx';
import {Button} from "../../../../components/common/Button.jsx";

const ApplicationsList = ({ applications, onParse, onRemove, onParseAll }) => {
    return (
        <section className="results-section">
            <div className="section-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h2>List of applicants ({applications.length})</h2>

                {applications.some(app => app.status === 'PENDING') && (
                    <Button variant="primary" onClick={onParseAll}>
                        Parse all
                    </Button>
                )}
            </div>

            {applications.length === 0 ? (
                <div className="empty-state">
                    <p className="text-muted">No profiles uploaded</p>
                </div>
            ) : (
                <div className="app-grid">
                    {applications.map(app => (
                        <ApplicationCard
                            key={app.id}
                            app={app}
                            onParse={onParse}
                            onRemove={onRemove}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ApplicationsList;