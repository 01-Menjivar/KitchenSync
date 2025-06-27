const IconButton = ({
                        children,
                        variant = "primary",
                        size = "md",
                        className = "",
                        onClick,
                        disabled = false,
                        type = "button",
                        isLoading = false
                    }) => {
    const variants = {
        primary: "bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600 hover:shadow-xl hover:shadow-amber-500/30 focus:ring-amber-200",
        secondary: "bg-white text-amber-700 border-2 border-amber-300 hover:bg-amber-50 hover:border-amber-400 focus:ring-amber-100",
        success: "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 hover:shadow-xl hover:shadow-emerald-500/25 focus:ring-emerald-200",
        danger: "bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 hover:shadow-xl hover:shadow-red-500/25 focus:ring-red-200",
        ghost: "bg-transparent text-amber-700 hover:bg-amber-50 focus:ring-amber-200"
    };

    const sizes = {
        sm: "w-8 h-8 p-1.5",
        md: "w-12 h-12 p-3",
        lg: "w-16 h-16 p-4"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            type={type}
            className={`
                relative overflow-hidden rounded-full
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-4 
                active:transform active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center
                ${variants[variant]} ${sizes[size]} ${className}
            `}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10 flex items-center justify-center">
                {children}
            </span>
        </button>
    );
};

export default IconButton;