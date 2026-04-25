import { clsx } from 'clsx';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className,
  icon: Icon,
  ...props
}) {
  const variants = {
    primary: 'bg-[#20222a] text-white hover:bg-[#2a2d38] shadow-sm',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    danger: 'bg-[#ff4d4f] text-white hover:bg-[#ff3335] shadow-sm',
    link: 'text-blue-600 hover:text-blue-700 hover:underline'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-200',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}
