import { Button } from '@mui/material';

function ButtonDelete(){
  return (
        <div className="settingsItem">
          <Button
            color="error"
            sx={{
                color: "var(--color-light-red)",
                fontWeight: "bold",
                fontSize: "var(--font-very-small)",
                borderRadius: '10rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                ml: 'auto',
                '@media screen and (max-width: 1000px)': {
                    mx: 'auto',
                fontSize: 'var(--font-very-small)' 
                },
              
            }}
          >
            DELETE ACCOUNT
          </Button>
        </div>
  );
}

export default ButtonDelete;