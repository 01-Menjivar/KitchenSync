const FilterButton = ({
                          children,
                          onClick,
                          className = "",
                          disabled = false,
                          type = "button"
                      }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`
                flex items-center justify-center gap-2 
                text-slate-600 hover:text-amber-700 hover:bg-amber-50 
                px-4 py-2 rounded-lg 
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-amber-200
                active:transform active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
        >
            {children}
        </button>
    );
};

export default FilterButton;