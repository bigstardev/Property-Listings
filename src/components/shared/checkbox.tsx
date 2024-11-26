import React, { ChangeEventHandler } from "react";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
