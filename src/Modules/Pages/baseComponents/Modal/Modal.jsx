import { Modal, Button as AntButton, Checkbox, Radio, Switch, Select, Input, Space, Tooltip, Button } from "antd";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { Fragment } from "react";
import { object } from "yup";
import { Text } from "..";
import "./Modal.scss"
import { PatternFormat } from "react-number-format";
import TextArea from "antd/es/input/TextArea";
import { TreeSelectDropdown } from "../TreeSelect";
import { classNames } from "../../../../utilities";
import { UploadImageIcon } from "../../../../Icons/UploadImageIcon";
import MultiSelectWithCheckBox from "../MultiSelectWithCheckBox";
import { DateTimePicker } from "../DateRange/DateTimePicker";
import MultiImageUploader from "../MultiImageUploader";
import { PlusIcon } from "../../../../Icons/PlusIcon";
import { CloseIcon } from "../../../../Icons/CloseIcon";
import { TickIcon } from "../../../../Icons/TickIcon";
import PdfJpegUploader from "../PdfJpegUploader";
import SingleImageUploader from "../SingleImageUploader";
import LogoImageUploader from "../LogoUploader";

const vSchema = object({});
export const ModalComponent = ({
    open,
    sections,
    validationSchema = vSchema,
    initialValues,
    className,
    submitButtonText = "Ok",
    cancelButtonText = "Cancel",
    additionalButtonText = "",
    handleCancel = () => null,
    handleSubmit,
    handleChange,
    customBody,
    additionalBody,
    extraBody,
    submitLoading,
    centered,
    closable,
    disableSubmit,
    sendNow,
    width,
    emailCheck,
    setEmailCheck,
    phoneCheck,
    setPhoneCheck,
    updateCategoryTypes,
    countryCodeError,
    countryCodeErrorEmer,
    disableButton,
    setDocumentsUploaded,
    isAdding,
    setIsAdding,
    handleAddOption,
    newOption,
    setNewOption,
}) => {


    return (
        <Formik
            initialValues={{
                ...initialValues,
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {({ errors, touched, resetForm, setFieldTouched, setFieldValue, values }) => (
                <Modal
                    open={open}
                    onCancel={handleCancel}
                    afterClose={() => resetForm()}
                    className={classNames(`modal_background`, className ? className : "")}
                    centered={centered}
                    footer={null}
                    maskClosable={false}
                    closable={closable}
                    width={width}
                >
                    <div className="modal_background">
                        <Form
                            autoComplete="off"
                            role="presentation"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                }
                            }}>
                            {sections?.map((section, index) => (
                                <div
                                    className="modal__header"
                                    key={`section-${index}`}
                                >
                                    <div className="text-3xl font-semibold">
                                        {section.heading}
                                    </div>
                                    {extraBody ? extraBody : ""}
                                    <div className="mt-7">
                                        {customBody ? (
                                            customBody
                                        ) : (
                                            <div className={section.className}>
                                                {section.fields.map(
                                                    (
                                                        {
                                                            type,
                                                            name,
                                                            title,
                                                            helperTitle,
                                                            options,
                                                            placeholder,
                                                            onChange,
                                                            ref,
                                                            onValueChange,
                                                            onKeyDown,
                                                            onBlur,
                                                            disabled,
                                                            disableDate,
                                                            disableTime,
                                                            className,
                                                            disabledDate,
                                                            onClick,
                                                            placement,
                                                            action,
                                                            validationText,
                                                            fieldBody,
                                                            format,
                                                            direction,
                                                            onRemove,
                                                            ...props

                                                        },
                                                        fieldIndex
                                                    ) => (
                                                        <Fragment key={`${name}-${fieldIndex}`}>
                                                            <div
                                                                className={`${className} modal__form-el`}
                                                                key={name}
                                                            >
                                                                <Text
                                                                    type="p"
                                                                    className={`font-medium text-base mb-2 ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                >
                                                                    {title}
                                                                </Text>

                                                                {type === "switch" ? (
                                                                    <Text
                                                                        type="label"
                                                                        className="modal__form-el-label mb-2"
                                                                    >
                                                                        {helperTitle}
                                                                        <Switch
                                                                            className="mx-3"
                                                                            key={name}
                                                                            checked={sendNow}
                                                                            disabled={submitLoading ? true : disabled}
                                                                            style={{ backgroundColor: "#00000040" }}
                                                                            onChange={onChange ? (value, option) => { onChange(value, option, setFieldValue) } : () => null}
                                                                        />
                                                                    </Text>
                                                                ) : type === "dateTimePicker" ? (
                                                                    <div className={`p-3.5 mb-1 mr-2 bg-white rounded-xl 
                                                                        border ${touched[name] && errors[name] ? 'border-red-500' : 'border-[#BFBFBF]'}`}>
                                                                        <DateTimePicker
                                                                            name={name}
                                                                            disableDate={disableDate}
                                                                            disableTime={disableTime}
                                                                            placeholder={placeholder}
                                                                            format={format}
                                                                            onChange={onChange ? (value, option) => { onChange(value, option, setFieldValue) } : () => null}
                                                                            className={`w-full  !border-none flex items-center !border-0 !focus:outline-none ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                            submitLoading={submitLoading}
                                                                        />
                                                                    </div>
                                                                ) : type === "plusIcon" ? (
                                                                    <FieldArray name="categoryFiledArray">
                                                                        {arrayHelpers => (
                                                                            <div className="bg-white w-fit p-3 rounded-full ring-[#BFBFBF] ring-1 mt-8">
                                                                                <PlusIcon
                                                                                    fill='#000'
                                                                                    onClick={() => arrayHelpers.push("")}
                                                                                    className="cursor-pointer"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </FieldArray>
                                                                ) : type === "categoryFiledArray" ? (
                                                                    <FieldArray
                                                                        name={name}
                                                                        render={(arrayHelpers) => (
                                                                            <div className="flex flex-col md:flex-wrap md:flex-row md:gap-4">
                                                                                {values[name] &&
                                                                                    values[name].length > 0 &&
                                                                                    values[name].map((field, index) => (
                                                                                        <div
                                                                                            key={index}
                                                                                            className="flex items-center w-full mb-3 md:w-[45%] lg:w-[30%]"
                                                                                        >
                                                                                            <Field
                                                                                                name={`${name}[${index}]`}
                                                                                                placeholder={`Add category ${index + 1}`}
                                                                                                className="p-3 border border-[#BFBFBF] rounded-xl flex-1"
                                                                                                disabled={submitLoading}
                                                                                            />
                                                                                            <div className="w-14 flex justify-center">
                                                                                                {values[name][index]?.trim() ? (
                                                                                                    <TickIcon
                                                                                                        type="button"
                                                                                                        onClick={() => {
                                                                                                            const newCategory = values[name][index]?.trim();
                                                                                                            if (newCategory) {
                                                                                                                updateCategoryTypes(newCategory);
                                                                                                                arrayHelpers.remove(index);
                                                                                                            }
                                                                                                        }}
                                                                                                        className="bg-white w-fit p-2.5 rounded-full ring-[#BFBFBF] ring-1 cursor-pointer"
                                                                                                    />
                                                                                                ) : (
                                                                                                    <CloseIcon
                                                                                                        type="button"
                                                                                                        onClick={() => {
                                                                                                            if (!values[name][index]?.trim()) {
                                                                                                                arrayHelpers.remove(index);
                                                                                                            }
                                                                                                        }}
                                                                                                        className="bg-white w-fit p-2.5 rounded-full ring-[#BFBFBF] ring-1 cursor-pointer"
                                                                                                    />
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                            </div>
                                                                        )}
                                                                    />


                                                                ) : type === "select" ? (
                                                                    <div className={`p-2 mr-2 bg-white rounded-xl 
                                                                        border ${touched[name] && errors[name] ? 'border-red-500' : 'border-[#BFBFBF]'}`}>
                                                                        <Select
                                                                            name={name}
                                                                            options={options}
                                                                            placeholder={placeholder}
                                                                            disabled={submitLoading ? true : disabled}
                                                                            optionFilterProp="label"
                                                                            showSearch={true}
                                                                            className={`w-full  !border-none flex items-center !border-0 !focus:outline-none ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                            popupClassName={props?.popupClassName}
                                                                            onChange={onChange ? (value, option) => { onChange(value, option, setFieldValue) } : () => null}
                                                                            value={values[name]}
                                                                            error={touched[name] && errors[name]}
                                                                        />
                                                                    </div>
                                                                ) : type === "treeSelect" ? (
                                                                    <TreeSelectDropdown
                                                                        showSearch={true}
                                                                        name={name}
                                                                        options={options}
                                                                        placeholder={placeholder}
                                                                        disabled={submitLoading ? true : disabled}
                                                                        className={`single-select ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                        popupClassName={props?.popupClassName}
                                                                        onChange={onChange}
                                                                        value={values[name]}
                                                                    />
                                                                ) : type === "MultiSelectWithCheckBox" ? (
                                                                    <MultiSelectWithCheckBox
                                                                        name="example"
                                                                        options={options}
                                                                        placeholder={placeholder}
                                                                        value={values[name]}
                                                                        disabled={submitLoading ? true : disabled}
                                                                        onChange={(updatedValues) => setFieldValue(name, updatedValues)}
                                                                    />
                                                                ) : type === "email_input" ? (
                                                                    <div className="">
                                                                        <div
                                                                            className={`w-full ant-select-selector mr-1 ${(touched[name] && errors[name]) || ((name === "email" || name === "room_number") && emailCheck) ||
                                                                                (name === "phone" && phoneCheck) ? 'border-red-500' : 'border-[#BFBFBF]'
                                                                                } bg-white ${name==="phone"? "":"border border-[#BFBFBF]"}  rounded-xl h-[49px]  flex items-center`}
                                                                        >
                                                                            {name === "phone" ? (
                                                                                <div className="relative w-full flex items-center mt-1">
                                                                               <span className="px-2 text-2xl">+</span>
                                                                                   <div className="flex items-center mr-2 border border-[#BFBFBF] bg-white rounded-xl h-[49px]">
                                                                                       <Field
                                                                                           name="countryCode"
                                                                                           as={Input}
                                                                                           placeholder=""
                                                                                           disabled={submitLoading ? true : disabled}
                                                                                           variant="borderless"
                                                                                           className="w-14"
                                                                                           onChange={(e) => { 
                                                                                            handleChange('countryCode', e.target.value, setFieldValue); 
                                                                                            if (e.target.value !== "" && e.target.value !== undefined) {
                                                                                                setPhoneCheck(false); // Reset phone validation on blur
                                                                                              }
                                                                                          }}
                                                                                           maxLength={4}
                                                                                       />
                                                                                   </div>
                                                                                   <PatternFormat
                                                                                    className={`w-full p-2 border rounded-xl border-[#b1b1b1] h-[49px] ${className} ${touched[name] && errors[name] ? 'error' : ''
                                                                                        }`}
                                                                                    key={name}
                                                                                    type="text"
                                                                                    format={format} // Customize the phone number format
                                                                                    allowEmptyFormatting={false}
                                                                                    disabled={submitLoading ? true : disabled}
                                                                                    name={name}
                                                                                    placeholder={placeholder}
                                                                                    value={values[name] || ""}
                                                                                    autoComplete="off"
                                                                                    role="presentation"
                                                                                    onValueChange={(values) => handleChange(name, values.value, setFieldValue)}
                                                                                    onBlur={(e) => {
                                                                                        if (onBlur) {
                                                                                            setFieldTouched(name, e.target.value);
                                                                                            onBlur(e, setFieldValue);
                                                                                        }
                                                                                        if (e.target.value !== "" && e.target.value !== undefined) {
                                                                                            setPhoneCheck(false); // Reset phone validation on blur
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                </div>
                                                                            ) : (
                                                                                <Input
                                                                                    key={name}
                                                                                    className={`w-full ${className}`}
                                                                                    variant="borderless"
                                                                                    type={type}
                                                                                    disabled={submitLoading ? true : disabled}
                                                                                    name={name}
                                                                                    placeholder={placeholder}
                                                                                    value={values[name] || ""}
                                                                                    onChange={(e) => setFieldValue(name, e.target.value)}
                                                                                    onBlur={(e) => {
                                                                                        if (onBlur) {
                                                                                            setFieldTouched(name, e.target.value);
                                                                                            onBlur(e, setFieldValue);
                                                                                        }
                                                                                        if (e.target.value !== "" && e.target.value !== undefined) {
                                                                                            if (name === "email" || name === "room_number") {
                                                                                                setEmailCheck(false);
                                                                                            }
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                        {((name === "email" || name === "room_number") && emailCheck) && (
                                                                            <div className="text-red-500 text-xs mt-1 ml-3">{validationText}</div>
                                                                        )}
                                                                        {name === "phone" && phoneCheck && (
                                                                            <div className="text-red-500 text-xs mt-1 ml-3">{validationText}</div>
                                                                        )}
                                                                        {name === "phone" && countryCodeError && (
                                                                            <div className="text-red-500 text-xs mt-1 ml-3">Please enter the country code for your phone number.</div>
                                                                        )}
                                                                    </div>
                                                                ) : type === "input" ? (
                                                                    <div className=" w-full ant-select-selector mr-2 border border-[#BFBFBF] bg-white rounded-xl h-[49px] p-2 flex items-center">
                                                                        <Input
                                                                            className={`w-full ${className}`}
                                                                            variant='borderless'
                                                                            type={type}
                                                                            disabled={submitLoading ? true : disabled}
                                                                            name={name}
                                                                            placeholder={placeholder}
                                                                            value={values[name] || ""}
                                                                            onChange={(e) => setFieldValue(name, e.target.value)}
                                                                        />
                                                                    </div>
                                                                ) : type === "label" ? (
                                                                    <div className="modal__form-el">
                                                                        <Text className={``}>
                                                                            {title}
                                                                        </Text>
                                                                    </div>
                                                                ) : type === "radio" ? (
                                                                    <div>
                                                                        {options.map((option) => (
                                                                            <label
                                                                                key={option.value}
                                                                                className="modal__form-el-radio custom-radio input"
                                                                            >
                                                                                <input
                                                                                    type="radio"
                                                                                    name={name}
                                                                                    value={option.value}
                                                                                    onChange={onChange}
                                                                                // defaultChecked={option.value}
                                                                                // defaultValue={option.value}
                                                                                />
                                                                                {option.label}
                                                                            </label>
                                                                        ))}
                                                                    </div>
                                                                ) : type === "patternFormat" ? (
                                                                    <div className={`w-full ant-select-selector mr-2 
                                                                        border ${touched[name] && errors[name] ? 'border-red-500' : 'border-[#BFBFBF]'} 
                                                                        bg-white rounded-xl h-[49px] p-2 flex items-center`}>
                                                                        <PatternFormat
                                                                            className={`modal__form-el-field ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                            key={name}
                                                                            type={type}
                                                                            name={name}
                                                                            disabled={submitLoading ? true : disabled}
                                                                            placeholder={placeholder}
                                                                            {...props}
                                                                            format={format}
                                                                            allowEmptyFormatting={false}
                                                                            value={values[name] || ""}
                                                                            autoComplete="off"
                                                                            role="presentation"
                                                                            onValueChange={(values) => handleChange(name, values.value, setFieldValue)}
                                                                        />
                                                                    </div>
                                                                ) :  type === "phoneFormat" ? (
                                                                    <div>
                                                                    <div className="relative w-full flex items-center mt-1">
                                                                    <span className="px-2 text-2xl">+</span>
                                                                        <div className="flex items-center mr-2 border border-[#BFBFBF] bg-white rounded-xl h-[49px]">
                                                                            <Field
                                                                                name="countryCodeEmergency"
                                                                                as={Input}
                                                                                placeholder=""
                                                                                variant="borderless"
                                                                                className="w-14"
                                                                                onChange={(e) => { 
                                                                                 handleChange('countryCodeEmergency', e.target.value, setFieldValue); 
                                                                               }}
                                                                                maxLength={4}
                                                                            />
                                                                        </div>
                                                                        <PatternFormat
                                                                         className={`w-full p-2 border rounded-xl border-[#b1b1b1] h-[49px] ${className} ${touched[name] && errors[name] ? 'error' : ''
                                                                             }`}
                                                                         key={name}
                                                                         type="text"
                                                                         format={format} 
                                                                         allowEmptyFormatting={false}
                                                                         disabled={submitLoading ? true : disabled}
                                                                         name={name}
                                                                         placeholder={placeholder}
                                                                         value={values[name] || ""}
                                                                         autoComplete="off"
                                                                         role="presentation"
                                                                         onValueChange={(values) => handleChange(name, values.value, setFieldValue)}
                                                                         onBlur={onBlur}
                                                                     />
                                                                     
                                                                     </div>
                                                                     {countryCodeErrorEmer && (
                                                                        <div className="text-red-500 text-xs mt-1 ml-3">Please enter the country code for your phone number.</div>
                                                                    )}
                                                                     </div>
                                                                ) : type === "checkBox" ? (
                                                                    <div
                                                                        className={`${className} gap-3 modal__form-el`}
                                                                        key={name}
                                                                    >
                                                                        <Text
                                                                            type="label"
                                                                            className="modal__form-el-label mb-2"
                                                                        >
                                                                            <Checkbox
                                                                                className="mr-3"
                                                                                key={name}
                                                                                type={type}
                                                                                disabled={submitLoading ? true : disabled}
                                                                                name={name}
                                                                                onChange={(e) => {
                                                                                    e.target.checked
                                                                                        ? setFieldValue(name, true)
                                                                                        : setFieldValue(name, false);
                                                                                        if (onChange) {
                                                                                            onChange(e); 
                                                                                          }
                                                                                }} 
                                                                                checked={values[name]}
                                                                            />
                                                                            <span className="ml-2">{helperTitle}</span>
                                                                        </Text>
                                                                        {touched[name] && errors[name] && (
                                                                            <Text
                                                                                type={"error"}
                                                                                className={"error mt-2"}
                                                                            >
                                                                                {errors[name]}
                                                                            </Text>
                                                                        )}
                                                                    </div>
                                                                ) : type === "textarea" ? (
                                                                    <div
                                                                        className={`rounded-xl border p-3 
                                                                            ${touched[name] && errors[name] ? 'border-red-500' : 'border-[#BFBFBF]'}`}
                                                                    >
                                                                        <TextArea
                                                                            className="!border-none !focus:outline-none !w-full"
                                                                            name={name}
                                                                            placeholder={placeholder}
                                                                            disabled={submitLoading ? true : disabled}
                                                                            value={values[name]}
                                                                            onChange={(e) => setFieldValue(name, e.target.value)}
                                                                            style={{ resize: "none" }}
                                                                        />
                                                                    </div>
                                                                ) : type === "number" ? (
                                                                    <div
                                                                        className={`w-full ant-select-selector mr-2 
                                                                        border ${touched[name] && errors[name] ? "border-red-500" : "border-[#BFBFBF]"
                                                                            } 
                                                                        bg-white rounded-xl h-[49px] p-2 flex items-center`}
                                                                    >
                                                                        <Field
                                                                            className={`w-full modal__form-el-field ${touched[name] && errors[name] ? "error" : ""
                                                                                }`}
                                                                            key={name}
                                                                            name={name}
                                                                            disabled={submitLoading ? true : disabled}
                                                                            placeholder={placeholder}
                                                                            value={values[name]}
                                                                            role="presentation"
                                                                            autoComplete="off"
                                                                            onBlur={onBlur}
                                                                            onKeyDown={(e) => {
                                                                                if (
                                                                                    e.key !== "Backspace" &&
                                                                                    e.key !== "Tab" &&
                                                                                    e.key !== "ArrowLeft" &&
                                                                                    e.key !== "ArrowRight" &&
                                                                                    (isNaN(e.key) || e.key === " ")
                                                                                ) {
                                                                                    e.preventDefault();
                                                                                }
                                                                            }}
                                                                            onChange={(e) => {
                                                                                const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                                                                if (onChange) {
                                                                                    onChange(e, setFieldValue);
                                                                                    setFieldValue(name, numericValue);
                                                                                } else {
                                                                                    setFieldValue(name, numericValue);
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                ) : type === "text" ? (
                                                                    <div className={`w-full ant-select-selector mr-2 
                                                                        border ${touched[name] && errors[name] ? 'border-red-500' : 'border-[#BFBFBF]'} 
                                                                        rounded-xl h-[49px] p-2 flex items-center
                                                                        ${disabled ? '[background-color:rgba(0,0,0,0.05)] cursor-not-allowed' : 'bg-white'}`}>
                                                                        {/* Handle ref differently based on whether it's a Field or direct input */}
                                                                        {ref ? (
                                                                            <input
                                                                                className={`w-full modal__form-el-field ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                                key={name}
                                                                                name={name}
                                                                                disabled={submitLoading ? true : disabled}
                                                                                placeholder={placeholder}
                                                                                value={values[name]}
                                                                                role="presentation"
                                                                                autoComplete="off"
                                                                                onBlur={(e) => {
                                                                                    if (onBlur) onBlur(e);
                                                                                    setFieldTouched(name, true);
                                                                                }}
                                                                                onKeyDown={onKeyDown}
                                                                                onChange={(e) => {
                                                                                    if (onChange) {
                                                                                        onChange(e, setFieldValue);
                                                                                    } else {
                                                                                        setFieldValue(name, e.target.value);
                                                                                    }
                                                                                }}
                                                                                ref={ref}
                                                                            />
                                                                        ) : (
                                                                            <Field
                                                                                className={`w-full modal__form-el-field ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                                key={name}
                                                                                name={name}
                                                                                disabled={submitLoading ? true : disabled}
                                                                                placeholder={placeholder}
                                                                                value={values[name]}
                                                                                role="presentation"
                                                                                autoComplete="off"
                                                                                onBlur={onBlur}
                                                                                onKeyDown={onKeyDown}
                                                                                onChange={(e) => {
                                                                                    if (onChange) {
                                                                                        onChange(e, setFieldValue);
                                                                                        setFieldValue(name, e.target.value);
                                                                                    } else {
                                                                                        setFieldValue(name, e.target.value)
                                                                                    }
                                                                                }}
                                                                            />
                                                                        ) }
                                                                        </div>
                                                                ) : 
                                                                 type === "selectWithCustom" ? (
                                                                    <div className={`p-2 mr-2 bg-white rounded-xl 
                                                                        border ${touched[name] && errors[name] ? 'border-red-500' : 'border-[#BFBFBF]'}`}>
                                                                        <Select
                                                                            name={name}
                                                                            options={options}
                                                                            placeholder={placeholder}
                                                                            disabled={submitLoading ? true : disabled}
                                                                            optionFilterProp="label"
                                                                            showSearch={true}
                                                                            className={`w-full  !border-none flex items-center !border-0 !focus:outline-none ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                            popupClassName={props?.popupClassName}
                                                                            onChange={onChange ? (value, option) => { onChange(value, option, setFieldValue) } : () => null}
                                                                            value={values[name] || undefined}
                                                                            error={touched[name] && errors[name]}
                                                                            dropdownRender={(menu) => (
                                                                                <>
                                                                                  {menu}
                                                                                  <div className="flex items-center p-2 border-t border-[#BFBFBF]">
                                                                                    {isAdding ? (
                                                                                    <div className="flex items-center gap-2 w-full">
                                                                                    <div className="border-2 w-full rounded-xl border-[#BFBFBF]">
                                                                                      <Input
                                                                                        value={newOption}
                                                                                        onChange={(e) => setNewOption(e.target.value)}
                                                                                        placeholder="Enter new designation"
                                                                                        onPressEnter={handleAddOption}
                                                                                        variant="borderless"
                                                                                        className="w-full px-2 py-1"
                                                                                      />
                                                                                    </div>
                                                                                    <Button type="primary" className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none" onClick={handleAddOption}>
                                                                                      OK
                                                                                    </Button>
                                                                                  </div>
                                                                                    ) : (
                                                                                        <Button
                                                                                        type="default"
                                                                                        className="w-full text-left px-2 py-1 bg-primary !text-white hover:bg-blue-600 rounded-md focus:outline-none"
                                                                                        style={{ border: 'none', boxShadow: 'none' }} // Forcefully remove border and box-shadow
                                                                                        onClick={() => setIsAdding(true)}
                                                                                      >
                                                                                        + Add Other
                                                                                      </Button>
                                                                                    )}
                                                                                    </div>
                                                                                </>
                                                                            )}
                                                                        />
                                                                    </div>    
                                                                    ): type === "pincode" ? (

                                                                    <div className={`w-full ant-select-selector mr-2 
                                                                        border ${touched[name] && errors[name] ? 'border-red-500' : 'border-[#BFBFBF]'} 
                                                                        bg-white rounded-xl h-[49px] p-2 flex items-center`}>
                                                                        <Field
                                                                            name={name}
                                                                            as={Input}
                                                                            type="text"
                                                                            disabled={submitLoading ? true : disabled}
                                                                            placeholder={placeholder}
                                                                            variant="borderless"
                                                                            className="w-full"
                                                                            maxLength={10}
                                                                            onChange={(e) => {
                                                                                if (onChange) {
                                                                                    onChange(e, setFieldValue);
                                                                                    setFieldValue(name, e.target.value);
                                                                                } else {
                                                                                    setFieldValue(name, e.target.value)
                                                                                }
                                                                            }}
                                                                            // onInput={(e) => {
                                                                            //     e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                                                            // }}
                                                                        />
                                                                    </div>
                                                                )


                                                                    : type === "upload_image" ? (
                                                                        <div
                                                                            className="h-52 border-dashed border-2 border-[#BEBEBE] rounded-xl p-2 flex items-center justify-center flex-col cursor-pointer"
                                                                            onClick={() => document.getElementById('upload_input').click()}
                                                                        >
                                                                            <div className="mb-4">
                                                                                <UploadImageIcon />
                                                                            </div>
                                                                            <input
                                                                                type="file"
                                                                                id="upload_input"
                                                                                disabled={submitLoading ? true : disabled}
                                                                                style={{ display: 'none' }}
                                                                                onChange={(e) => {
                                                                                    const file = e.target.files[0];
                                                                                    if (file) {
                                                                                        setFieldValue('image', file);
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <div className="text-center">
                                                                                <span>Upload image/video</span>
                                                                            </div>
                                                                        </div>

                                                                    ) : type === "upload_image_component" ? (
                                                                        <MultiImageUploader
                                                                            value={values[name]}
                                                                            onChange={(fileList) => {
                                                                                setFieldValue(name, fileList);
                                                                                setFieldTouched(name, true);
                                                                                // Ensure onChange is called correctly
                                                                                if (onChange) {
                                                                                    onChange(fileList, null, setFieldValue);
                                                                                }
                                                                            }}
                                                                            onRemove={onRemove}
                                                                            disabled={disabled}
                                                                            submitLoading={submitLoading}
                                                                            errors={errors[name]}
                                                                        />
                                                                    ) : type === "single_image_upload" ? (
                                                                        <div>
                                                                        <SingleImageUploader
                                                                            value={values[name]}
                                                                            onChange={(file) => {
                                                                                setFieldValue(name, file);
                                                                                setFieldTouched(name, true);
                                                                            }}
                                                                            disabled={submitLoading || disabled}
                                                                            />
                                                                            </div>

                                                                    ) : type === "profile_image" ? (
                                                                        <div>
                                                                        <LogoImageUploader 
                                                                        value={values[name]} 
                                                                        onChange={(file) => {
                                                                            setFieldValue(name, file);
                                                                            setFieldTouched(name, true);
                                                                        }}
                                                                        className= {className}
                                                                        disabled={submitLoading || disabled}
                                                                        type='profile_image'
                                                                        />
                                                                        </div>

                                                                    ) :   type === "logo_image" ? (
                                                                        <div>
                                                                        <LogoImageUploader 
                                                                        value={values[name]} 
                                                                        onChange={(file) => {
                                                                            setFieldValue(name, file);
                                                                            setFieldTouched(name, true);
                                                                        }}
                                                                        className= {className}
                                                                        disabled={submitLoading || disabled}
                                                                        />
                                                                        </div>

                                                                    ) : 
                                                                    type === "pdf_jpeg_upload" ? (
                                                                        <div>
                                                                        <PdfJpegUploader
                                                                          value={values.upload_document}
                                                                          onChange={(fileList) => {
                                                                            setFieldValue('upload_document', fileList);
                                                                            setFieldTouched('upload_document', true);
                                                                            setDocumentsUploaded(fileList && fileList.length > 0);
                                                                          }}
                                                                          
                                                                        />
                                                                        </div>
                                                                        ): type === "radio_button" ? (
                                                                        <Radio.Group
                                                                            name={name}
                                                                            onChange={(e) => {
                                                                                if (onChange) {
                                                                                    onChange(e, setFieldValue);
                                                                                    setFieldValue(name, e.target.value);
                                                                                } else {
                                                                                    setFieldValue(name, e.target.value)
                                                                                }
                                                                            }}
                                                                            value={values[name]}
                                                                            className={`${className}`}
                                                                            disabled={submitLoading ? true : disabled}
                                                                        >
                                                                            <Space direction={direction || 'vertical'} size={12}>
                                                                                {options.map((option, index) => (
                                                                                    <Radio key={index} value={option.value}>
                                                                                        {option.label}
                                                                                    </Radio>
                                                                                ))}
                                                                            </Space>
                                                                        </Radio.Group>

                                                                    ) : (
                                                                        <Field
                                                                            className={`modal__form-el-field ${touched[name] && errors[name] ? 'error' : ''}`}
                                                                            key={name}
                                                                            type={type}
                                                                            name={name}
                                                                            disabled={submitLoading ? true : disabled}
                                                                            placeholder={placeholder}
                                                                            {...props}
                                                                            value={values[name] || null}
                                                                            role="presentation"
                                                                            autoComplete="off"
                                                                        />
                                                                    )}

                                                                {touched[name] && errors[name] && (
                                                                    <Text
                                                                        type={"error"}
                                                                        className={"text-red-600"}
                                                                    >
                                                                        {errors[name]}
                                                                    </Text>
                                                                )}
                                                                <div className="">
                                                                    {fieldBody}
                                                                </div>
                                                            </div>
                                                        </Fragment>

                                                    )
                                                )}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            ))}
                            {additionalBody ? additionalBody : ""}
                            <div className="flex space-x-3 justify-end mt-10">
                                {additionalButtonText}
                                {cancelButtonText && (
                                    <div className="button-container">
                                        <AntButton
                                            type="button"
                                            className="!bg-gray-400 !text-white !rounded-xl"
                                            onClick={() => handleCancel()}
                                        >
                                            {cancelButtonText}
                                        </AntButton>
                                    </div>
                                )}
                              {submitButtonText && (
    <div
        className="button-container"
        style={{
            backgroundColor: "var(--primary-color)",
            borderRadius: "12px",
            pointerEvents: emailCheck || phoneCheck ? "none" : "auto",
            opacity: emailCheck || phoneCheck ? 0.5 : 1,
        }}
    >
        {disableSubmit ? (
            <Tooltip title="Fill all the required fields">
                <AntButton
                    htmlType="submit"
                    loading={submitLoading}
                    style={{
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                        borderRadius: "12px",
                        border: "none"
                    }}
                    className="!hover:bg-primary"
                    disabled={disableButton || disableSubmit}
                >
                    {submitButtonText}
                </AntButton>
            </Tooltip>
        ) : (
            <AntButton
                htmlType="submit"
                loading={submitLoading}
                style={{
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    borderRadius: "12px",
                    border: "none"
                }}
                className="!hover:bg-primary"
                disabled={disableButton || disableSubmit}
            >
                {submitButtonText}
            </AntButton>
        )}
    </div>
)}



                            </div>
                        </Form>
                    </div >
                </Modal >
            )}
        </Formik >
    );
};