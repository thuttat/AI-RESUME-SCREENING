import { clsx } from 'clsx';

export default function IconButton({ icon: Icon, variant = 'edit', onClick }) {
  const variants = {
    edit: 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:shadow-lg hover:shadow-blue-200/50',
    delete: 'bg-red-50 text-red-600 hover:bg-red-100 hover:shadow-lg hover:shadow-red-200/50'
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        'p-2.5 rounded-full transition-all duration-200',
        variants[variant]
      )}
    >
      <Icon size={18} />
    </button>
  );
}
