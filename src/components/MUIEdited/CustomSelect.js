import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function SelectEdited({ defaultValue, values,  mr, ml, onSelection }) {

  return (
    <>
      <Select
        defaultValue={defaultValue}
        onClick={onSelection}
        sx={{
          color: "var(--color-blue)",
          fontWeight: "bold",
          fontSize: "var(--font-medium)",
          marginRight: mr === 'none' ? 'none' : mr,
          marginLeft: ml === 'auto' ? 'auto' : ml,
        }}
      >
        {values.map((value, index) => (
          <MenuItem
            key={index}
            sx={{
              color: "var(--color-gray)",
              fontSize: "var(--font-small)",
            }}
            value={value}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default SelectEdited;
