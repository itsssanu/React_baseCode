import React from "react";
import { Field } from "formik";
import { Select, TreeSelect } from "antd";
import { Text } from ".";

export const TreeSelectDropdown = ({
    name,
    label,
    disabled,
    placeholder,
    options,
    value,
    onChange,
    className,
    popupClassName,
    showSearch,
}) => {
    const renderTreeNodes = (data, parentKey = '') =>
        data.map((item, index) => {
            const nodeKey =
                item.value !== null && item.value !== undefined
                    ? String(item.value)
                    : `${parentKey}_${index}_null`;

            if (item.children) {
                return (
                    <TreeSelect.TreeNode
                        key={nodeKey}
                        value={item.value}
                        title={item.title}
                        disabled={item.value}
                    >
                        {renderTreeNodes(item.children, nodeKey)}
                    </TreeSelect.TreeNode>
                );
            }

            return (
                <TreeSelect.TreeNode key={nodeKey} value={item.value} title={item.title} />
            );
        });

    return (
        <Field name={name}>
            {({ field, form: { values, setFieldValue, setFieldTouched } }) => (
                <div className="w-full custom-select-component">
                    {label && (
                        <Text type={"label"} htmlFor={name}>
                            {label}
                        </Text>
                    )}
                    <TreeSelect
                        id={name}
                        variant="borderless"
                        showSearch={showSearch}
                        disabled={disabled}
                        style={{ width: "100%" }}
                        placeholder={placeholder}
                        className={className || "single-select "}
                        popupClassName={popupClassName || ""}
                        // filterTreeNode={(input, option) =>
                        //     option.label.toLowerCase().includes(input.toLowerCase())
                        // }
                        treeDefaultExpandAll={false}
                        dropdownStyle={{
                            zIndex: 999999999,
                            padding: '10px 11px 6px 6px',
                        }}
                        value={value || null}
                        onChange={(selectedValue, option) => {
                            setFieldValue(name, selectedValue);
                            if (onChange) {
                                onChange(selectedValue, option);
                            }
                        }}
                        onBlur={() => {
                            setFieldTouched(name, true);
                        }}
                    >
                        {renderTreeNodes(options)}
                    </TreeSelect>
                </div>
            )}
        </Field>
    );
};
