import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function CustomSelectFeed({ setSelectedOption, defaultValue, values, onSelection }) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelection(selectedValue);
  };

  return (
    <Select
      defaultValue={defaultValue}
      onChange={handleChange}
      sx={{
        color: "var(--color-blue)",
        fontWeight: "bold",
        fontSize: "var(--font-medium)",
        marginRight: 'none',
        marginLeft: 'auto',
      }}
    >
      {values.map((value, index) => (
        <MenuItem
          key={index}
          sx={{
            color: "var(--color-gray)",
            fontSize: "var(--font-small)",
          '@media screen and (max-width: 1000px)': {
          fontSize: 'var(--font-very-small)' // Font size for screens <1000px
        },
            
          }}
          value={value}
        >
          {value}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CustomSelectFeed;
