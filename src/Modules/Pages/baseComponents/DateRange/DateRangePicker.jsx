import { DatePicker } from "antd";
import { Field } from "formik";
import moment from "moment";
import "./DateRange.scss";

export const DateRangePicker = ({
    name,
    disableDate,
    disableTime,
    hideTime,
    format,
    disabled,
    title,
}) => {
    return (
        <Field name={name}>
            {({ field, meta, form: { values, setFieldValue } }) => (
                <div className="w-full">
                    <p className="modal__form-el-label">{title}</p>
                    <DatePicker.RangePicker
                        onChange={(date, dateString) => {
                            setFieldValue(name, date)
                        }}
                        onKeyDown={(e) => {
                            const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'Backspace'];
                            if (
                                e.key !== 'Backspace' &&
                                ((e.target.value && e.target.value.length === 10 && moment(e.target.value, 'YYYY-MM-DD')) || !allowedKeys.includes(e.key))
                            ) {
                                e.preventDefault();
                            }
                        }}
                        value={values?.[name]}
                        popupClassName="custom-date-picker-panel"
                        disabledDate={disableDate}
                        disabledTime={disableTime}
                        disabled={disabled}
                        variant="borderless"
                        // placeholder="MM-DD-YYYY"
                        format={"MM-DD-YYYY"}
                        className="custom-date-picker w-[100%] h-[50px] rounded-[5px] text-[#92928F] flex items-center justify-between px-[16px]"
                    />
                    {meta.touched && meta.error && <div className="error">{meta.error}</div>}
                </div>
            )}
        </Field>
    );
};
