import React from 'react';
import { TableRow, TableCell } from '../../../components/common/Table';
import { Badge } from '../../../components/common/Badge';
import { Eye, Edit, Trash2 } from 'lucide-react';

const JobRow = ({ job, onToggleStatus, onDeleteJob, onViewJob, onEditJob }) => {
    const isOpen = job.status === 'OPEN';

    return (
        <TableRow>
            <TableCell>
                <p className="job-title">{job.title}</p>
                <p className="job-date">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
            </TableCell>

            <TableCell>{job.applications ? job.applications.length : 0}</TableCell>

            <TableCell>
                <span onClick={() => onToggleStatus(job.id)} style={{ cursor: 'pointer' }}>
                    <Badge variant={isOpen ? 'SUCCESS' : 'WARNING'}>
                        {job.status}
                    </Badge>
                </span>
            </TableCell>

            <TableCell>
                <div className="job-actions">
                    <button className="icon-btn" onClick={() => onViewJob(job.id)}><Eye size={16} /></button>
                    <button className="icon-btn" onClick={() => onEditJob(job.id)}><Edit size={16} /></button>
                    <button className="icon-btn delete" onClick={() => onDeleteJob(job.id)}><Trash2 size={16} /></button>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default JobRow;