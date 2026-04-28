import { Download, UserPlus } from 'lucide-react';
import Button from '../components/Button.jsx';

export default function UsersHeader({ onExport, onAddNew }) {
  return (
    <div className="!flex !items-center !justify-between">
      <h1 className="!text-2xl !font-bold !text-gray-800">Users Management</h1>
      <div className="!flex !gap-3">
        <Button variant="secondary" icon={Download} onClick={onExport} className="!shrink-0 !px-5 !py-2.5">
          Export CSV
        </Button>
        <Button variant="primary" icon={UserPlus} onClick={onAddNew} className="!shrink-0 !px-5 !py-2.5">
          Add New User
        </Button>
      </div>   
    </div>
  );
}