import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { clsx } from 'clsx';

export default function UsersTable({ users, onEdit, onDelete, onToggleStatus }) {
  const getAvatar = (user) => {
    if (user.avatar) return user.avatar;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=random&color=fff`;
  };

  return (
    <div className="!bg-white !border !border-gray-200 !rounded-xl !shadow-sm !overflow-hidden">
      <div className="!overflow-x-auto">
        <table className="!w-full !border-collapse">
          <thead>
            <tr className="!bg-gray-50/80 !border-b !border-gray-200 !text-left">
              <th className="!px-6 !py-4 !text-xs !font-bold !text-gray-500 !uppercase !tracking-wider">ID</th>
              <th className="!px-6 !py-4 !text-xs !font-bold !text-gray-500 !uppercase !tracking-wider">User</th>
              <th className="!px-6 !py-4 !text-xs !font-bold !text-gray-500 !uppercase !tracking-wider">Email</th>
              <th className="!px-6 !py-4 !text-xs !font-bold !text-gray-500 !uppercase !tracking-wider">Role</th>
              <th className="!px-6 !py-4 !text-xs !font-bold !text-gray-500 !uppercase !tracking-wider">Status</th>
              <th className="!px-6 !py-4 !text-xs !font-bold !text-gray-500 !uppercase !tracking-wider !text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="!divide-y !divide-gray-100">
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:!bg-gray-50/50 !transition-colors">
                  <td className="!px-6 !py-4 !text-sm !text-gray-600">#{user.id}</td>
                  <td className="!px-6 !py-4">
                    <div className="!flex !items-center !gap-3">
                      <img 
                        src={getAvatar(user)} 
                        alt={user.fullname} 
                        className="!w-9 !h-9 !rounded-full !object-cover !border !border-gray-100 !shadow-sm"
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.fullname}`; }}
                      />
                      <span className="!text-sm !font-semibold !text-gray-900">{user.fullname}</span>
                    </div>
                  </td>
                  <td className="!px-6 !py-4 !text-sm !text-gray-600">{user.email}</td>
                  <td className="!px-6 !py-4">
                    <span className={clsx(
                      '!inline-flex !items-center !px-2.5 !py-1 !rounded-md !text-xs !font-bold !tracking-wide !uppercase',
                      user.role === 'ADMIN' && '!bg-gray-900 !text-white',
                      user.role === 'RECRUITER' && '!bg-blue-50 !text-blue-700 !border !border-blue-100',
                      user.role === 'HIRING_MANAGER' && '!bg-purple-50 !text-purple-700 !border !border-purple-100'
                    )}>
                      {user.role?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="!px-6 !py-4">
                    <button
                      onClick={() => onToggleStatus(user)}
                      title={user.status === 'ACTIVE' ? 'Deactivate user' : 'Activate user'}
                      className={clsx(
                        '!inline-flex !items-center !gap-1.5 !px-3 !py-1 !rounded-full !text-xs !font-bold !transition-all',
                        user.status === 'ACTIVE' 
                          ? '!bg-green-50 !text-green-700 hover:!bg-green-100' 
                          : '!bg-gray-100 !text-gray-500 hover:!bg-gray-200'
                      )}
                    >
                      {user.status === 'ACTIVE' ? (
                        <><Eye size={14} className="!mb-0.5" /> Active</>
                      ) : (
                        <><EyeOff size={14} className="!mb-0.5" /> Inactive</>
                      )}
                    </button>
                  </td>
                  <td className="!px-6 !py-4 !text-right">
                    <div className="!flex !justify-end !gap-2">
                      <button 
                        onClick={() => onEdit(user)}
                        className="!p-1.5 !text-blue-600 hover:!bg-blue-50 !rounded-lg !transition-colors"
                        title="Edit User"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => onDelete(user.id)}
                        className="!p-1.5 !text-red-600 hover:!bg-red-50 !rounded-lg !transition-colors"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="!px-6 !py-12 !text-center !text-gray-400 !italic">
                  No users found in the system.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}