import React from 'react';
import { TableRow, TableCell } from '../../../components/common/Table';
import { Badge } from '../../../components/common/Badge';
import { Eye, Edit, Trash2 } from 'lucide-react';

const JobRow = ({ job }) => {
    return (
        <TableRow>
            <TableCell>
                <p className="job-title">{job.title}</p>
                <p className="job-date">Posted {job.postedDate}</p>
            </TableCell>

            <TableCell>{job.applicants}</TableCell>

            <TableCell>
                <Badge variant={job.status === 'open' ? 'success' : 'warning'}>
                    {job.status}
                </Badge>
            </TableCell>

            <TableCell>
                <div className="job-actions">
                    <button className="icon-btn"><Eye size={16} /></button>
                    <button className="icon-btn"><Edit size={16} /></button>
                    <button className="icon-btn delete"><Trash2 size={16} /></button>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default JobRow;