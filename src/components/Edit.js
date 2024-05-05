import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditDialog(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
    setText(props.postContent);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Save the changes here
    console.log("Saved text:", text);
    props.onEdit(text);
    setOpen(false);
  };

  const handleChange = (value) => {
    if (ReactQuill.Quill) {
      setText(value);
    }
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <span className="create">
          <EditIcon sx={{ marginRight: "7px", marginBottom: "3px" }} /> Edit
        </span>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <ReactQuill value={text} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditDialog;
