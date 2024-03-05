import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function SelectEdited({ defaultValue, values,  mr, ml }) {
  return (
    <Select
      defaultValue={defaultValue}
      sx={{
        color: "var(--color-blue)",
        fontWeight: "bold",
        fontSize: "var(--font-medium)",
        marginRight: mr === 'none' ? 'none' : mr, // Set marginRight to 'none' if mr is 'none', otherwise set it to the provided value
        marginLeft: ml === 'auto' ? 'auto' : ml, // Set marginLeft to 'auto' if ml is 'auto', otherwise set it to the provided value
      }}
    >
      {values.map((value, index) => (
        <MenuItem
          key={index} // Ensure each MenuItem has a unique key
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
  );
}

export default SelectEdited;
