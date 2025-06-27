const Button = ({
                    children,
                    variant = "primary",
                    size = "md",
                    className = "",
                    onClick,
                    disabled = false,
                    type = "button"
                }) => {
    const variants = {
        primary: "bg-gradient-to-r from-amber-600 to-orange-500 text-white hover:from-amber-700 hover:to-orange-600 hover:shadow-xl hover:shadow-amber-500/30 focus:ring-amber-200",
        secondary: "bg-white text-amber-700 border-2 border-amber-300 hover:bg-amber-50 hover:border-amber-400 focus:ring-amber-100",
        success: "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 hover:shadow-xl hover:shadow-emerald-500/25 focus:ring-emerald-200",
        danger: "bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 hover:shadow-xl hover:shadow-red-500/25 focus:ring-red-200",
        outline: "bg-transparent border-2 border-amber-500 text-amber-700 hover:bg-amber-50 hover:border-amber-600 focus:ring-amber-200"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`
                relative overflow-hidden font-semibold rounded-xl
                transition-all duration-300 ease-out
                focus:outline-none focus:ring-4 
                active:transform active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]} ${sizes[size]} ${className}
            `}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000" />
            <span className="relative z-10">{children}</span>
        </button>
    );
};

export default Button;
