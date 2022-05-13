import * as React from 'react';

export interface InputProps {
  name: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}

const Input: React.FC<InputProps> = ({ name, label, onChange, value }) => {
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value: eventValue } } = e;

    console.log(eventValue);

    onChange(eventValue);
  }, [onChange]);

  return React.useMemo(() => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input value={value} onChange={handleChange} name={name} />
    </div>
  ), [value]) 
};

export default Input;
