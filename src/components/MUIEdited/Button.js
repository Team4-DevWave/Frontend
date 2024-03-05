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
      }}>
      {value}
    </Button>
  );
}

export default ButtonEdited;