const Input = ({ name, type = "text", value, onChange, placeholder, disabled, min, step }) => (
    <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        step={step}
        autoComplete="off"
        className={`
            w-full px-4 py-3 rounded-xl border-2 border-amber-200 bg-white
            placeholder-amber-400 text-amber-900 text-sm
            transition-all duration-300 ease-out
            hover:border-amber-300 hover:shadow-md
            focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 focus:shadow-lg
        `}
    />
);

export default Input;