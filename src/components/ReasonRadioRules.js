import React, { useEffect } from "react";
import { useState } from "react";
import { Chip, Button, Box, Paper } from "@mui/material";
import { FiLogIn } from "react-icons/fi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { reasons } from "../utils/reasons";
import { Typography } from "@mui/material";
import "../pages/LoginForm.css";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export default function ReasonRadio(props) {
  const [radioValue, setRadioValue] = useState("");

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setReasons(radioValue);
    props.handleCloseModal();
  };

  return (
    <form style={{ height: "500px", width: "400px", margin: "20px" }}>
      <Button>
        <ArrowBackIcon
          sx={{ borderRadius: 25 }}
          onClick={() => {
            props.setStage((prevStep) => prevStep - 1);
            console.log("back", props.stage);
          }}
        />
      </Button>
      <Typography variant="h6" fontWeight="bold">
        Submit a report
      </Typography>
      <p>Which community rule does this violate?</p>
      <div>
        <RadioGroup value={radioValue} onChange={handleRadioChange}>
          <FormControlLabel
            value="Rule #1"
            control={<Radio />}
            label={<>Remember the human</>}
          />
          <FormControlLabel
            value="Rule #2"
            control={<Radio />}
            label={<>Behave like you would in real life</>}
          />
          <FormControlLabel
            value="Rule #3"
            control={<Radio />}
            label={<>Look for the original source of content</>}
          />
          <FormControlLabel
            value="Rule #4"
            control={<Radio />}
            label={<>Search for duplicates before posting</>}
          />
          <FormControlLabel
            value="Rule #5"
            control={<Radio />}
            label={<>Read the communitys rules</>}
          />
        </RadioGroup>
      </div>

      <Button
        data-testid="report-btn"
        variant="contained"
        onClick={(e) => {
          props.setStage((prevStep) => prevStep + 1);
          handleSubmit(e);
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
        disabled={!radioValue}
        type="submit"
      >
        {radioValue ? "Submit" : "Submit"}
      </Button>
    </form>
  );
}
