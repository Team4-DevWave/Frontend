import { Button } from '@mui/material';

function ButtonEdited({ color, value, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        color: color,
        fontWeight: "bold",
        fontSize: "var(--font-medium)",
        textTransform: 'none',
        padding: '5px 15px',
        borderRadius: '10rem',
        border: '1px solid var(--color-blue)',
        ml: 'auto',
          mx: { xs: 'auto', md: 0 }, // Center the button for small screens (<1000px width)
          width: 'fit-content', // Ensure button width adjusts based on content
          '@media screen and (max-width: 1000px)': {
          fontSize: 'var(--font-very-small)' // Font size for screens <1000px
        },

      }}>
      {value}
    </Button>
  );
}

export default ButtonEdited;