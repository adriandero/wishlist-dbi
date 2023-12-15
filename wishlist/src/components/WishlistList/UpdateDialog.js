import * as React from "react";
import TextField from "@mui/material/TextField/index.js";
import Button from "@mui/material/Button/index.js";
import Dialog from "@mui/material/Dialog/index.js";
import DialogActions from "@mui/material/DialogActions/index.js";
import DialogContent from "@mui/material/DialogContent/index.js";
import DialogContentText from "@mui/material/DialogContentText/index.js";
import DialogTitle from "@mui/material/DialogTitle/index.js";
import {
  deleteWishlist,
  getAllWishlists,
  postWishlist,
  updateWishlist,
} from "../../api/wishlistApi.js";

export default function UpdateDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState();

  const handleUpdateWishlist = () => {
    console.log(props.id);
    updateWishlist(props.id, name, age);
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    handleUpdateWishlist();
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" sx={{ m: 2 }} onClick={handleClickOpen}>
        Update Wishlist
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ m: 2 }}
          />
          <TextField
            id="outlined-number"
            label="Age"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            sx={{ m: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
