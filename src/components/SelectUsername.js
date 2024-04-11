import React from "react";
import useAvailableUserName from "../hooks/useAvailableUserName";
import { TextField } from "@mui/material";
import { FaUserAstronaut } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SelectUsername(props) {
  const [username, setUsername] = React.useState("");

  const [touchedUser, setTouchedUser] = React.useState(false);

  const available = useAvailableUserName(username);

  return (
    <form className="login-form">
      <h3>
        {" "}
        <Button>
          <ArrowBackIcon
            onClick={() => props.setStage((prevStep) => prevStep - 1)}
          />
        </Button>
        Choose a Username
      </h3>
      <h6>Username must be 6 characters or above, no spaces allowed</h6>
      <TextField
        InputProps={{
          style: { borderRadius: 25 },
          endAdornment: <FaUserAstronaut />,
        }}
        sx={{ width: "100%", marginBottom: "25px" }}
        label="Username"
        type="text"
        error={
          (!username && touchedUser) ||
          (!available && touchedUser) ||
          (username && username.length < 6 && touchedUser) ||
          (username && username.includes(" ") && touchedUser)
        }
        helperText={
          !username && touchedUser
            ? "Username is required"
            : "" || (!available && touchedUser)
              ? "Username is already taken"
              : "" || (username && username.length < 6 && touchedUser)
                ? "Username must be 6 characters or above"
                : "" || (username && username.includes(" ") && touchedUser)
                  ? "Username must not contain spaces"
                  : "" || (available && username.length > 6)
                    ? "Username is available!"
                    : ""
        }
        required
        color={available && username ? "success" : "primary"}
        onChange={(e) => {
          setUsername(e.target.value);
          props.setUsername(e.target.value);
        }}
        onBlur={() => setTouchedUser(true)}
      />
      <Button
        data-testid="signup-btn"
        variant="contained"
        onClick={() => {
          props.setStage((prevStep) => prevStep + 1);
        }}
        sx={{
          width: "100%",
          borderRadius: "25px",
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#FF5700",
          "&:hover": {
            backgroundColor: "#d32f2f",
          },
        }}
        startIcon={<FiLogIn />}
        disabled={
          !username ||
          !available ||
          username.length < 6 ||
          username.includes(" ")
        }
        type="submit"
      >
        Continue
      </Button>
    </form>
  );
}
