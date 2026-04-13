import React from 'react';
import { Card, CardBody } from '../../../../components/common/Card.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '../../../../components/common/Table.jsx';
import JobRow from "./JobRow.jsx";

const JobTable = ({ jobs, onToggleStatus, onDeleteJob, onEditJob, onViewJob }) => {
    return (
        <Card>
            <CardBody className="no-padding">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Applicants</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {jobs.length === 0 ? (
                            <TableRow>
                                <td colSpan="4" className="table-empty">
                                    No data available
                                </td>
                            </TableRow>
                        ) : (
                            jobs.map((job) => (
                                <JobRow
                                    key={job.id}
                                    job={job}
                                    onToggleStatus={onToggleStatus}
                                    onDeleteJob={onDeleteJob}
                                    onEditJob={onEditJob}
                                    onViewJob={onViewJob}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default JobTable;