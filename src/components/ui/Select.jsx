import React, { useState } from "react";
import Icon from "@/components/ui/Icon";
import Select from "react-select";
import { Controller } from "react-hook-form";

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const SelectInput = ({
    label,
    placeholder = "Select Option",
    classLabel = "form-label",
    className = "",
    classGroup = "",
    register,
    name,
    readonly,
    value,
    error = false,
    icon,
    disabled,
    id,
    horizontal,
    validate,
    msgTooltip,
    description,
    onChange,
    options,
    defaultValue,
    control,
    size,
    ...rest
}) => {
    const [currentValue, setCurrentValue] = useState(value);
    options = options || [{ label: "Select", value: "" }];

    const keyName = name + (Date.now() + Math.random() * 10000);
    return (
        <div
            className={`fromGroup  ${error ? "has-error" : ""}  ${
                horizontal ? "flex" : ""
            }  ${validate ? "is-valid" : ""} `}
        >
            {label && (
                <label
                    htmlFor={name}
                    className={`block capitalize ${classLabel}  ${
                        horizontal
                            ? "flex-0 mr-6 md:w-[100px] w-[60px] break-words"
                            : ""
                    }`}
                >
                    {label}
                </label>
            )}
            <div className={`relative ${horizontal ? "flex-1" : ""}`}>
                {name && (
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={value}
                        render={({ field: { onChange: changeHandler } }) => (
                            <Select
                                key={keyName}
                                options={options}
                                styles={styles}
                                className="react-select"
                                classNamePrefix="select"
                                id={name}
                                value={options.find(
                                    (o) => o.value == currentValue
                                )}
                                onChange={(v) => {
                                    changeHandler(v.value);
                                    setCurrentValue(v.value);
                                    if (
                                        onChange &&
                                        typeof onChange === "function"
                                    ) {
                                        onChange(v);
                                    }
                                }}
                                register={register}
                                readOnly={readonly}
                                disabled={disabled}
                                placeholder={placeholder}
                            />
                        )}
                    />
                )}

                {/* icon */}
                <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                    {/* <span className=" relative -right-2 inline-block text-slate-900 dark:text-slate-300 pointer-events-none">
                        <Icon icon="heroicons:chevron-down" />
                    </span> */}
                    {error && (
                        <span className="text-danger-500">
                            <Icon icon="heroicons-outline:information-circle" />
                        </span>
                    )}
                    {validate && (
                        <span className="text-success-500">
                            <Icon icon="bi:check-lg" />
                        </span>
                    )}
                </div>
            </div>
            {/* error and success message*/}
            {error && (
                <div
                    className={` mt-2 ${
                        msgTooltip
                            ? " inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded"
                            : " text-danger-500 block text-sm"
                    }`}
                >
                    {error.message}
                </div>
            )}
            {/* validated and success message*/}
            {validate && (
                <div
                    className={` mt-2 ${
                        msgTooltip
                            ? " inline-block bg-success-500 text-white text-[10px] px-2 py-1 rounded"
                            : " text-success-500 block text-sm"
                    }`}
                >
                    {validate}
                </div>
            )}
            {/* only description */}
            {description && (
                <span className="input-description">{description}</span>
            )}
        </div>
    );
};

export default SelectInput;
