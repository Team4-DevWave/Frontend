import React from "react";
import { Button } from "@mui/material";
import { FiLogIn } from "react-icons/fi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SelectGender(props) {
  const [gender, setGender] = React.useState("");

  const handleSelect = (value) => {
    setGender(value);
    props.setGender(value);
  };

  return (
    <form className="login-form">
      <h3>
        {" "}
        <Button>
          <ArrowBackIcon
            onClick={() => props.setStage((prevStep) => prevStep - 1)}
          />
        </Button>
        Select Your Gender
      </h3>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Button
        variant="outlined"
          sx={{
            borderRadius: "25px",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: gender === "man" ? "primary.main" : "grey.200",
            color: gender === "man" ? "white" : "default",
          }}
          onClick={() => handleSelect("man")}
        >
          Man
        </Button>

        <Button
        variant="outlined"
          sx={{
            borderRadius: "25px",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: gender === "woman" ? "primary.main" : "grey.200",
            color: gender === "woman" ? "white" : "default",
          }}
          onClick={() => handleSelect("woman")}
        >
          Woman
        </Button>

        <Button
        variant="outlined"
          sx={{
            borderRadius: "25px",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: gender === "other" ? "primary.main" : "grey.200",
            color: gender === "other" ? "white" : "default",
          }}
          onClick={() => {
            handleSelect("other");
          }}
        >
          I prefer not to say
        </Button>
      </div>

      <Button
        data-testid="signup-btn"
        onClick={() => {
          props.setStage((prevStep) => prevStep + 1);
        }}
        variant="contained"
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
        disabled={!gender}
        type="submit"
      >
        Continue
      </Button>
    </form>
  );
}
