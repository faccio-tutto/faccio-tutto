export function Button({ children, className, ...props }) {
    return (
      <button className={`px-4 py-2 rounded-lg ${className}`} {...props}>
        {children}
      </button>
    );
  }