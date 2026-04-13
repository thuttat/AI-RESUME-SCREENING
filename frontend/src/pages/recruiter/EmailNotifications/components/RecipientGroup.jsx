import RecipientItem from './RecipientItem';

export default function RecipientGroup({
                                           status,
                                           recipients,
                                           selectedRecipients,
                                           toggleRecipient
                                       }) {
    return (
        <div className="recipient-group">
            <div className="group-header">
                {status} ({recipients.length})
            </div>

            {recipients.map(r => (
                <RecipientItem
                    key={r.id}
                    data={r}
                    checked={selectedRecipients.includes(r.id)}
                    onToggle={() => toggleRecipient(r.id)}
                />
            ))}
        </div>
    );
}