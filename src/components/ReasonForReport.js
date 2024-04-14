import React, { useEffect } from "react";
import { useState } from "react";
import { Chip, Button, Box, Paper } from "@mui/material";
import { FiLogIn } from "react-icons/fi";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { reasons } from "../utils/reasons";
import { Typography } from "@mui/material";
import "../pages/LoginForm.css";

export default function ReasonForReport(props) {
  const [hasPicked, setHasPicked] = React.useState(false);

  const [selectedReasons, setSelectedReasons] = useState([]);

  const toggleReason = (Reason) => {
    if (selectedReasons.includes(Reason)) {
      setSelectedReasons([]);
    } else {
      setSelectedReasons([Reason]);
    }
  };

  useEffect(() => {
    if (selectedReasons.length > 0) {
      console.log(selectedReasons);
      setHasPicked(true);
    } else {
      setHasPicked(false);
    }
  }, [selectedReasons]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setReasons(selectedReasons);
    console.log(selectedReasons);
  };

  return (
    <form className="login-form">
      <Typography variant="h6" fontWeight="bold">
        Submit a report
      </Typography>
      <p>
        Thanks for looking out for yourself and your fellow threaditors by
        reporting things that break the rules. Let us know what's happening, and
        we'll look into it.
      </p>
      <div>
        {reasons.map((reason, i) => (
          <Button
            sx={{ borderRadius: 25, margin: "4px" }}
            key={i}
            onClick={() => toggleReason(reason)}
            variant={
              selectedReasons.includes(reason) ? "contained" : "outlined"
            }
          >
            {reason}
          </Button>
        ))}
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
        disabled={!hasPicked}
        type="submit"
      >
        {hasPicked ? "Next" : "Pick a reason for report"}
      </Button>
    </form>
  );
}
