const Checkbox = ({
                      id,
                      name,
                      checked = false,
                      onChange,
                      label,
                      disabled = false,
                      className = ""
                  }) => {
    return (
        <div className={`flex items-center ${className}`}>
            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                />
                <label
                    htmlFor={id}
                    className={`
                        relative flex items-center justify-center w-5 h-5 rounded-md border-2 cursor-pointer
                        transition-all duration-300 ease-out
                        ${checked
                        ? 'bg-gradient-to-r from-amber-600 to-orange-500 border-amber-600 shadow-md'
                        : 'bg-white border-amber-200 hover:border-amber-300'
                    }
                        ${disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:shadow-md focus-within:ring-4 focus-within:ring-amber-100'
                    }
                    `}
                >
                    {checked && (
                        <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </label>
            </div>
            {label && (
                <label
                    htmlFor={id}
                    className={`
                        ml-3 text-sm font-medium cursor-pointer
                        transition-colors duration-200
                        ${disabled
                        ? 'text-amber-400 cursor-not-allowed'
                        : 'text-amber-900 hover:text-amber-700'
                    }
                    `}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default Checkbox;