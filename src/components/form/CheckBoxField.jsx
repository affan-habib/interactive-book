import React from 'react';
import { useField } from 'formik';

const CheckboxField = ({ children, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className="mb-1">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    {...field}
                    {...props}
                    className={`form-checkbox h-4 w-4 text-gray-600 ${meta.touched && meta.error ? 'border-red-500' : ''}`}
                />
                <span className="ml-2 text-gray-700">{children}</span>
            </label>
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-xs">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CheckboxField;
