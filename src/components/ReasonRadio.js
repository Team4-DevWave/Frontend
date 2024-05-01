import React, { useEffect } from "react";
import { useState } from "react";
import { Chip, Button, Box, Paper } from "@mui/material";
import { FiLogIn } from "react-icons/fi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography } from "@mui/material";
import "../pages/LoginForm.css";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";

export default function ReasonRadio(props) {
  const [radioValue, setRadioValue] = useState("");

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setReasons(radioValue);
    props.handleCloseModal();
    axios
      .get("https://www.threadit.tech/api/v1/report", {
        params: {
          reportedID: "",
          type: "",
          additional_info: "",
          rule_reason: "",
          userID: "",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
      <p>Who is the victim?</p>
      <div>
        <RadioGroup value={radioValue} onChange={handleRadioChange}>
          <FormControlLabel value="you" control={<Radio />} label={<>You</>} />

          <FormControlLabel
            value="someone else"
            control={<Radio />}
            label={<>Someone else</>}
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
