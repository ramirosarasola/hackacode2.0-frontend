interface InputFieldProps {
  id: string;
  label: string;
  zodMethod: Function;
  errors: { [key: string]: { message?: string } };
  type: string;
  autoComplete?: string;
  onChange: Function;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, zodMethod, errors, type, autoComplete }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} {...zodMethod(id)} autoComplete={autoComplete} />
      <span>{errors[id]?.message && <p>{String(errors[id]?.message)}</p>}</span>
    </>
  );
};

export default InputField;