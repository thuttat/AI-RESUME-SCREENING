import { Plus } from 'lucide-react';
import Button from '../../components/Button.jsx';

export default function EmailHeader({ onAddNew }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Email Templates</h1>
      <Button variant="primary" icon={Plus} onClick={onAddNew} className="!shrink-0 !px-5 !py-2.5">
        Create Template
      </Button>
    </div>
  );
}