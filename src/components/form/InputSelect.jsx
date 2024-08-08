import React from "react";
import Select from "react-select";
import { useField } from "formik";

const InputSelect = ({
  label,
  options = [],
  valueKey = "value",
  labelKey = "label",
  onRoleSelect,
  className,
  ...props
}) => {
  const [field, , helpers] = useField(props);

  const handleChange = (selectedOption, event) => {
    helpers.setValue(selectedOption.value);
    if (typeof onRoleSelect === 'function') {
      onRoleSelect(selectedOption.value);
    }
    // onRoleSelect(selectedOption.value);
  };

  const formattedOptions = options.map((option) => ({
    value: option[valueKey],
    label: option[labelKey],
  }));

  return (
    <div className={className}>
      <label
        className="block text-gray-600 text-sm font-medium mb-2"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <div>
        <Select
          value={formattedOptions.find((opt) => opt.value === field.value)}
          options={formattedOptions}
          onChange={handleChange}
          onBlur={() => helpers.setTouched(true)}
        />
      </div>
      {field.touched && field.error ? <div>{field.error}</div> : null}
    </div>
  );
};

export default InputSelect;