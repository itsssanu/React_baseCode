import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import { Field } from 'formik';
import dayjs from 'dayjs';
import './DateRange.scss';

export const DateTimePicker = ({
    name,
    format = "YYYY-MM-DD",
    title,
    placeholder,
    onChange,
    submitLoading,
    disabled,
}) => {
    return (
        <Field name={name}>
            {({ field, meta, form }) => {
                const { setFieldValue, values } = form;
                return (
                    <div className="w-full">
                        <p className="modal__form-el-label mb-2">{title}</p>
                        <AntDatePicker
                            allowClear={false}
                            showTime={false}
                            format={format}
                            onChange={(date, dateString) => {
                                if (date && onChange) {
                                    onChange(name, date, setFieldValue);
                                } else {
                                    setFieldValue(name, dateString);
                                }
                            }}
                            disabled={submitLoading ? true : disabled}
                            value={values?.[name] ? dayjs(values[name], format) : null}
                            popupClassName="custom-date-picker-panel"
                            placeholder={placeholder}
                            className="custom-date-picker w-full h-[48px] rounded-[5px] text-[#92928F] flex items-center justify-between px-[16px]"
                        />
                    </div>
                );
            }}
        </Field>
    );
};
