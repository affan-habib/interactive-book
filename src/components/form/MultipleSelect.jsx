import React from "react";
import Select from "react-select";
import { useField } from "formik";

const MultipleSelect = ({
    label,
    options,
    valueKey = "value",
    labelKey = "label",
    onRoleSelect,
    className,
    ...props
}) => {
    const [field, meta, helpers] = useField(props);
    const customStyles = {
        control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? "#3498db" : "#d2d6dc",
            boxShadow: state.isFocused ? "0 0 0 1px #3498db" : null,
            "&:hover": {
                borderColor: state.isFocused ? "#3498db" : "#d2d6dc",
            },
        }),
    };

    const handleChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        helpers.setValue(selectedValues);
        if (typeof onRoleSelect === "function") {
            onRoleSelect(selectedValues);
        }
    };

    const formattedOptions = options?.map((option) => ({
        value: option[valueKey],
        label: option[labelKey],
    }));

    const selectedValues = Array.isArray(field.value) ? field.value : [];

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
                    styles={customStyles}
                    isMulti
                    value={formattedOptions?.filter((opt) =>
                        selectedValues.find((s) => s.value === opt.value)
                    )}
                    options={formattedOptions}
                    onChange={handleChange}
                    onBlur={() => helpers.setTouched(true)}
                />
            </div>
            {meta.touched & meta.error ? <div>{meta.error}</div> : null}
        </div>
    );
};

export default MultipleSelect;
