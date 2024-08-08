import React from 'react';
import { useField } from 'formik';

const TextAreaField = ({ label,required, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div>
            <label
                htmlFor={props.id || props.name}
                className="block text-gray-600 text-sm font-medium mb-2"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                className={`form-control py-2 ${meta.touched && meta.error ? 'border-red-500' : ''}`}
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-xs">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default TextAreaField;