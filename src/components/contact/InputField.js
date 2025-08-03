const InputField = ({ name, label, value, onChange, error }) => (
  <div>
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
      className={`p-3 rounded-lg bg-gray-700 text-white w-full placeholder-gray-400 outline-none focus:ring-2 ${
        error ? "border-red-500 ring-red-500" : "focus:ring-yellow-500"
      }`}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export default InputField;
