import React from 'react';
import { Field } from 'formik';

const CheckboxGroup = ({ name, options, isMulti }) => (
  <Field name={name}>
    {({ field, form }) => (
      <div className="flex flex-col space-y-2">
        {(options && Array.isArray(options)) ? options.map(option => (
          <label key={option.value} className="flex items-center">
            <input
              type="checkbox"
              value={option.value}
              checked={isMulti ? field.value.includes(option.value) : field.value === option.value}
              onChange={() => {
                const nextValue = isMulti
                  ? field.value.includes(option.value)
                    ? field.value.filter(value => value !== option.value)
                    : [...field.value, option.value]
                  : field.value === option.value
                    ? ''
                    : option.value;
                form.setFieldValue(name, nextValue);
              }}
              className="mr-2"
            />
            {option.label}
          </label>
        )) : null}
      </div>
    )}
  </Field>
);

export default CheckboxGroup;
