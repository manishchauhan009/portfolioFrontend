import Theme from "../styles/Theme";

const InputField = ({ name, label, value, onChange, error }) => (
  <div className="w-full">
    <input
      type="text"
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      required
      aria-label={label}
      aria-required="true"
      aria-invalid={!!error}
      className={`p-3 rounded-lg w-full outline-none transition-all duration-200
        placeholder-gray-400
        ${error 
          ? "border border-red-500 focus:ring-2 focus:ring-red-500" 
          : "focus:ring-2"
        }`}
      style={{
        backgroundColor: Theme.colors.surface,
        color: Theme.colors.text,
        borderColor: error ? "#f87171" : Theme.colors.border, // red-400 if error
      }}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export default InputField;
