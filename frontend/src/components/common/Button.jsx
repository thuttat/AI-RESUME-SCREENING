import "./../styles/Button.css";

export function Button({
    variant = "primary",
    size = "md",
    fullWidth = false, 
    children,
    className = "",
    ...props
}) {
    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            className={`btn btn-${variant} btn-${size} ${widthClass} ${className}`}
            {...props} 
        >
            {children}
        </button>
    );
}