import Flatpickr from "react-flatpickr";
import dayjs from "dayjs";
import FormGroup from "./FormGroup";
import { Controller } from "react-hook-form";
import Icon from "./Icon";

const DatePicker = ({
    label,
    name,
    time,
    error,
    placeholder,
    value,
    control,
    register,
    ...props
}) => {
    return (
        <FormGroup label={label} id={name} error={error}>
            <Controller
                name={name}
                control={control}
                data-enable-time
                icon={<Icon icon="heroicons:eye" />}
                render={({ field }) => (
                    <Flatpickr
                        className="form-control py-2"
                        id={name}
                        placeholder={placeholder}
                        value={value}
                        defaultValue={dayjs(new Date()).format(
                            "YYYY-MM-DD H:m:s"
                        )}
                        onChange={(date) => {
                            field.onChange(date);
                        }}
                        options={{
                            enableTime: time ? true : false,
                            dateFormat: time ? "Y-m-d H:i" : "Y-m-d",
                        }}
                    />
                )}
            />
        </FormGroup>
    );
};

export default DatePicker;
