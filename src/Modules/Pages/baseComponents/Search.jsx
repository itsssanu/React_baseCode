import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export const CustomSearch = ({ field, form, patientNames, onNameSelect, onClearSearch, value }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = (value) => {
    if (value) {
      setInputValue(value);
      const filteredOptions = patientNames
        .filter((name, index, self) =>
          name.toLowerCase().includes(value.toLowerCase().slice(0, 3)) &&
          self.indexOf(name) === index
        );
      setOptions(filteredOptions);
    } else {
      setInputValue('');
      form.setFieldValue(field.name, '');
      setOptions([]);
      if (onClearSearch) {
        onClearSearch(); // Call the callback function to clear the search
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 8 && !inputValue && field.value) {
      const words = field.value.split(' ');
      words.pop();
      const newValue = words.join(' ');
      form.setFieldValue(field.name, newValue);
    }
  };

  const handleSelect = (value) => {
    setInputValue(value);
    form.setFieldValue(field.name, value);
    if (onNameSelect) {
      onNameSelect(value); // Call the callback function with the selected name
    }
  };

  const handleClear = () => {
    setInputValue('');
    form.setFieldValue(field.name, '');
    setOptions([]);
    if (onClearSearch) {
      onClearSearch(); // Call the callback function to clear the search
    }
  };

  return (
    <AutoComplete
      dataSource={options}
      onSelect={handleSelect}
      onClear={handleClear}
      onSearch={handleSearch}
      value={value ? value : ''}
      onKeyDown={handleKeyDown}
      placeholder="Search Patient Name"
      suffixIcon={<SearchOutlined />}
    >
    </AutoComplete>
  );
};
