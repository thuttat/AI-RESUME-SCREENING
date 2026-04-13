import { Button } from '../../../../components/common/Button.jsx';

export default function BulkActions({ selected, setSelected, onAction }) {

    if (selected.length === 0) return null;

    return (
        <div className="bulk-actions">
            <span>{selected.length} selected</span>

            <Button
                size="sm"
                variant="success"
                onClick={() => selected.forEach(id => onAction(id, 'SHORTLIST'))}
            >
                Shortlist All
            </Button>

            <Button
                size="sm"
                variant="danger"
                onClick={() => selected.forEach(id => onAction(id, 'REJECT'))}
            >
                Reject All
            </Button>
        </div>
    );
}