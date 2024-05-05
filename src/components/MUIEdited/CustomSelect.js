import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function CustomSelect({ defaultValue, values, mr, ml, onSelection }) {
  const handleSelection = (event) => {
    const selectedValue = event.target.value;
    onSelection(selectedValue);
  };

  return (
    <>
      <Select
        value={defaultValue} // Change defaultValue to value
        onChange={handleSelection} // Use onChange instead of onClick
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
