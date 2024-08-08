import React from 'react';
import { useField } from 'formik';
import Flatpickr from 'react-flatpickr';
import dayjs from 'dayjs';

const DateTimePicker = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);

    const formatDate = (date) => {
        return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    };

    return (
        <div>
            <label
                htmlFor={props.id || props.name}
                className="block text-gray-600 text-sm font-medium mb-2"
            >
                {label}
            </label>
            <Flatpickr
                className='form-control py-2'
                {...field}
                {...props}
                value={field.value}
                onChange={dates => {
                    const formattedDate = formatDate(dates[0]);
                    helpers.setValue(formattedDate);
                }}
                options={{
                    dateFormat: "Y-m-d H:i",
                    enableTime: true,
                    time_24hr: true,
                    // mode: "single",
                }}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-xs">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default DateTimePicker;
