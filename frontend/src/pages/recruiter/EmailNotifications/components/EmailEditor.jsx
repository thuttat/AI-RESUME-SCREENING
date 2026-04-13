import { Card } from '../../../../components/common/Card';
import { Badge } from '../../../../components/common/Badge';

export default function EmailEditor({
                                        recipients,
                                        selectedRecipients,
                                        emailData,
                                        setEmailData
                                    }) {

    const selected = recipients.filter(r => selectedRecipients.includes(r.id));

    return (
        <div className="editor-panel">
            <Card className="editor-card">
                <div className="editor-header">
                    <div className="editor-field">
                        <span className="field-label">To:</span>
                        <div className="recipient-tags">
                            {selectedRecipients.length === 0 ? (
                                <span className="no-recipients">No recipients</span>
                            ) : selected.length <= 3 ? (
                                selected.map(r => (
                                    <Badge key={r.id} variant="primary">{r.name}</Badge>
                                ))
                            ) : (
                                <Badge variant="primary">{selectedRecipients.length} Candidates</Badge>
                            )}
                        </div>
                    </div>

                    <div className="editor-field">
                        <span className="field-label">Subject:</span>
                        <input
                            className="clean-input"
                            value={emailData.subject}
                            onChange={(e) =>
                                setEmailData({ ...emailData, subject: e.target.value })
                            }
                        />
                    </div>
                </div>

                <div className="editor-body">
                    <textarea
                        className="clean-textarea"
                        value={emailData.body}
                        onChange={(e) =>
                            setEmailData({ ...emailData, body: e.target.value })
                        }
                    />
                </div>
            </Card>
        </div>
    );
}