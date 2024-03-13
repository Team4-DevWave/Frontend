import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function CustomSelect({ defaultValue, values,  mr, ml, onSelection }) {
  return (
    <>
      <Select
        defaultValue={defaultValue}
        onClick={onSelection}
        sx={{
          color: "var(--color-blue)",
          fontWeight: "bold",
          fontSize: "var(--font-medium)",
          '@media screen and (max-width: 1000px)': {
          fontSize: 'var(--font-very-small)' // Font size for screens <1000px
        },
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
    </>
  );
}

export default CustomSelect;
