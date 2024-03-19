import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#f44336",
      },
      secondary: {
        main: "#3f51b5",
      },
    },
  });

  export { darkTheme, lightTheme };
  