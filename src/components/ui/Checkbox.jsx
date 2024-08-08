import React from "react";
import CheckImage from "@/assets/images/icon/ck-white.svg";
const Checkbox = ({
    id,
    disabled,
    label,
    value,
    name,
    onChange,
    activeClass = " bg-primary-600 dark:bg-slate-200 ",
    inactiveClass = "bg-slate-300 dark:bg-slate-600 dark:border-slate-600",
    txtColor,
}) => {
    return (
        <label
            className={`flex items-center ${
                disabled ? " cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            id={id}
        >
            <input
                type="checkbox"
                className="hidden"
                name={name}
                checked={value}
                onChange={onChange}
                htmlFor={id}
                disabled={disabled}
            />
            <span
                className={`h-5 w-5 border flex-none border-slate-100 dark:border-slate-800 rounded-md 
        inline-flex ltr:mr-3 rtl:ml-3 relative transition-all duration-150
        ${value ? activeClass : inactiveClass}
        `}
            >
                {value && (
                    <img
                        src={CheckImage}
                        alt=""
                        className="h-[10px] w-[10px] block m-auto"
                    />
                )}
            </span>
            <span
                className={`${
                    txtColor ? txtColor : "text-slate-500"
                } dark:text-slate-400 text-sm leading-6 capitalize mx-1`}
            >
                {label}
            </span>
        </label>
    );
};

export default Checkbox;
