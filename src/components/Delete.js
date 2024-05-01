import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Delete(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // Call the onDelete prop when the delete button is clicked
    props.onDelete();
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <span className="create">
          <DeleteIcon sx={{ marginRight: "7px", marginBottom: "3px" }} /> Delete
        </span>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant={"outlined"}
            sx={{ borderRadius: 25 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant={"contained"}
            autoFocus
            sx={{ borderRadius: 25 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Delete;
