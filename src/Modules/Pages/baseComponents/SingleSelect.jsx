import React from "react";
import { Select } from "antd";
import { Field, useFormikContext } from "formik";
import { Text } from ".";
import { classNames } from "../../../utilities";

export const SingleSelect = ({
    name,
    label,
    disabled,
    placeholder,
    value,
    options,
    onChange,
    className,
    popupClassName,
    error,
}) => {
    const selectClass = classNames("single-select", { error });
    const formik = useFormikContext();
    return (
        <Field name={name}>
            {({ meta, form: { setFieldValue, setFieldTouched } }) => {
                return (
                    <div className="w-full custom-select-component">
                        {label ? (
                            <Text type={"label"} htmlFor={name}>
                                {label}
                            </Text>
                        ) : null}
                        <Select
                            variant="borderless"
                            id={name}
                            showSearch={true}
                            optionFilterProp="label"
                            disabled={disabled}
                            placeholder={placeholder}
                            className={classNames(
                                "font-sans w-full",
                                className ? className : "single-select"
                            )}
                            popupClassName={classNames(
                                "single-select__dropdown",
                                popupClassName ? popupClassName : ""
                            )}
                            options={options}
                            dropdownStyle={{
                                zIndex: 999999999,
                            }}
                            value={
                                value ||
                                formik?.values?.name?.fieldIndex?.Duration
                            }
                            onChange={(value, option) => {
                                setFieldValue(name, value);
                                if (onChange) {
                                    onChange(value, option);
                                    name === "practitioner_id" &&
                                        setFieldValue("condition_id", "");
                                }
                            }}
                            onBlur={() => {
                                setFieldTouched(name, true);
                            }}
                        />
                        {/* {meta?.touched && meta?.error ? (
                            <Text type={"error"} className={"error mt-2"}>
                                {meta?.error}
                            </Text>
                        ) : null} */}
                    </div>
                );
            }}
        </Field>
    );
};
