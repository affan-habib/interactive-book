import React from "react";
import { useField } from "formik";
import Flatpickr from "react-flatpickr";
import dayjs from "dayjs";

const DatePicker = ({ label, time, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const isError = meta.touched && meta.error;

  const handleChange = (date) => {
    const format = time ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
    helpers.setValue(dayjs(date[0]).format(format));
  };

  return (
    <div>
      <style>{`
        .date-picker-input{
          cursor: pointer;
          --tw-bg-opacity: 1;
          background-color: transparent !important;
          --tw-text-opacity: 1;
          color: rgb(148 163 184 / var(--tw-text-opacity));
        }
      `}</style>
      <label
        className="block text-gray-600 text-sm font-medium mb-2"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <Flatpickr
        value={field.value}
        onChange={handleChange}
        options={{
          altInput: true,
          altFormat: time ? "d-m-Y H:i:S" : "d-m-Y",
          dateFormat: time ? "Y-m-d H:i:S" : "Y-m-d",
          defaultDate: field.value,
          enableTime: time ? true : false,
          // theme: "material_blue",
        }}
        onBlur={() => helpers.setTouched(true)}
        className={`date-picker-input appearance-none border rounded w-full py-2 px-3 text-blue-900 leading-tight focus:outline-none focus:-outline ${isError ? "border-red-500" : ""
          }`}
      />
      {field.touched && field.error ? <div>{field.error}</div> : null}
    </div>
  );
};

export default DatePicker;