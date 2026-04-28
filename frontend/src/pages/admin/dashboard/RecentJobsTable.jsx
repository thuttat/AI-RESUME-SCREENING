import { Users, MoreVertical, Award } from 'lucide-react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

export default function RecentJobsTable({ users }) {
    const navigate = useNavigate();
    return (
        <div className="!bg-white !rounded-2xl !p-7 !shadow-sm !border !border-gray-100 !overflow-x-auto">
            <div className="!flex !items-center !justify-between !mb-6">
                <div>
                    <h3 className="!text-lg !font-bold !text-gray-900 !m-0">Top Active Recruiters</h3>
                    <p className="!text-sm !text-gray-500 !mt-1.5 !m-0">Recruiters with most job postings</p>
                </div>
                {/* <button
                    onClick={() => navigate('/admin/users')}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium cursor-pointer bg-transparent border-none p-0"
                >
                    View All
                </button> */}
            </div>

            <table className="!w-full">
                <thead>
                    <tr className="!bg-gray-50/80 !text-left">
                        <th className="!px-5 !py-4 !text-sm !font-semibold !text-gray-700 !rounded-l-xl whitespace-nowrap">Recruiter Name</th>
                        <th className="!px-5 !py-4 !text-sm !font-semibold !text-gray-700 whitespace-nowrap">Role</th>
                        <th className="!px-5 !py-4 !text-sm !font-semibold !text-gray-700 whitespace-nowrap">Jobs Posted</th>
                        <th className="!px-5 !py-4 !text-sm !font-semibold !text-gray-700 whitespace-nowrap">Status</th>
                        <th className="!px-5 !py-4 !text-sm !font-semibold !text-gray-700 !rounded-r-xl whitespace-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="!border-b !border-gray-100 hover:!bg-gray-50/50 !transition-colors">
                            <td className="!px-5 !py-5">
                                <span className="!font-bold !text-[15px] !text-gray-900">{user.name}</span>
                            </td>
                            <td className="!px-5 !py-5">
                                <span className="!text-[14px] !text-gray-600">{user.role}</span>
                            </td>
                            <td className="!px-5 !py-5">
                                <div className="!flex !items-center !gap-2.5">
                                    <Award size={16} className="!text-gray-400 !shrink-0" />
                                    <span className="!text-[14px] !font-bold !text-gray-900">{user.activityCount} posts</span>
                                </div>
                            </td>
                            <td className="!px-5 !py-5">
                                <span
                                    className={clsx(
                                        '!inline-flex !items-center !justify-center !px-3.5 !py-1.5 !text-[12px] !font-bold !rounded-full !w-fit',
                                        user.role === 'ADMIN'
                                            ? '!bg-purple-100 !text-purple-700'
                                            : '!bg-blue-100 !text-blue-700'
                                    )}
                                >
                                    {user.role}
                                </span>
                            </td>
                            <td className="!px-5 !py-5">
                                <button className="!p-2 hover:!bg-gray-200 !rounded-lg !transition-colors !flex !items-center !justify-center">
                                    <MoreVertical size={18} className="!text-gray-600" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}