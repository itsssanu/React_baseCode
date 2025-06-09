import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { classNames } from '../../../utilities';


export const CustomDropdown = ({ title, options, className, onChange, selectedValue }) => {
    const handleOptionSelect = (optionValue) => {
        const selectedOption = options.find((option) => option.value === optionValue);
        if (selectedOption && selectedOption.onSelect) {
            selectedOption.onSelect();
        }
        onChange(selectedOption ? selectedOption : null);
    };

    const menu = (
        <Menu>
            {options?.map((option) => (
                <Menu.Item key={option.value} onClick={() => handleOptionSelect(option.value)}>
                    {option.label}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown menu={menu} trigger={['click']}>
            <a
                href="/"
                className={classNames('dropdown', className ? className : '')}
                onClick={(e) => e.preventDefault()} 
            >
                <span className="dropdown-title">
                    {title}
                    {selectedValue && (
                        <span className="dropdown-title-selected">
                            {selectedValue}
                        </span>
                    )}
                </span>
                <span className="dropdown-icon" >
                    <DownOutlined />
                </span>
            </a>
        </Dropdown>
    );
};
