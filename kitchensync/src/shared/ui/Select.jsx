const Select = ({ name, value, onChange, placeholder, disabled, options = [] }) => (
    <div className="relative">
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`
                w-full px-4 py-3 pr-10 rounded-xl border-2 border-amber-200 bg-white
                text-sm appearance-none cursor-pointer
                transition-all duration-300 ease-out
                hover:border-amber-300 hover:shadow-md
                focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 focus:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed
                ${!value ? 'text-amber-400' : 'text-amber-900'}
            `}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    className="text-amber-900 bg-white"
                >
                    {option.label}
                </option>
            ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
                className={`w-5 h-5 transition-colors duration-300 ${
                    disabled ? 'text-amber-300' : 'text-amber-500'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </div>
    </div>
);

export default Select;