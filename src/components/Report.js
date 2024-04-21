import React, { useEffect } from "react";
import ReasonForReport from "./ReasonForReport";
import ReasonRadio from "./ReasonRadio";
import ReasonRadioRules from "./ReasonRadioRules";
import axios from "axios";
import PropTypes from "prop-types";
import { Dialog, DialogContent } from "@mui/material";
import "../pages/LoginForm.css";
import RadioGroup from "@mui/material/RadioGroup";
import { Alert, AlertTitle } from "@mui/material";

function Report() {
  const [stage, setStage] = React.useState(1);

  const [reasons, setReasons] = React.useState([]);

  const [submitAlert, setSubmitAlert] = React.useState(false);

  let bearerToken = "";

  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` },
  };

  const handleReasons = (event) => {
    setReasons(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setStage(1);
    setOpen(false);
  };

  const renderDialogContent = () => {
    if (stage === 2) {
      if (reasons[0] === "Breaks Community rules") {
        return (
          <DialogContent>
            <ReasonRadioRules
              stage={stage}
              setStage={setStage}
              reasons={reasons}
              setReasons={setReasons}
              handleCloseModal={handleCloseModal}
            />
          </DialogContent>
        );
      } else {
        return (
          <DialogContent>
            <ReasonRadio
              stage={stage}
              setStage={setStage}
              reasons={reasons}
              setReasons={setReasons}
              handleCloseModal={handleCloseModal}
            />
          </DialogContent>
        );
      }
    }
  };

  return (
    <>
      <div onClick={handleClickOpen}>
        <span className="create">Report</span>
      </div>
      {open && (
        <Dialog
          sx={{
            ".MuiPaper-root": {
              borderRadius: "16px",
            },
          }}
          open={open}
          onClose={handleCloseModal}
        >
          {stage === 1 && (
            <ReasonForReport
              stage={stage}
              setStage={setStage}
              reasons={reasons}
              setReasons={setReasons}
            />
          )}

          {renderDialogContent()}
        </Dialog>
      )}
    </>
  );
}

export default Report;
