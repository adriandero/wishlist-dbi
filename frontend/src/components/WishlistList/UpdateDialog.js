import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  deleteWishlist,
  getAllWishlists,
  postWishlist,
  updateWishlist,
} from "../../api/wishlistApi.js";

export default function UpdateDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [year, setYear] = React.useState(props.item.year);
  const [child, setChild] = React.useState({
    firstname: props.item.child.firstname,
    lastname: props.item.child.lastname,
    age: props.item.child.age,
  });

  const handleUpdateWishlist = () => {
    updateWishlist(props.item._id, year, child, props.item.items);
    handleClose();
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            label="Firstname"
            variant="outlined"
            value={child.firstname}
            onChange={(e) => setChild({ ...child, firstname: e.target.value })}
            fullWidth
            sx={{ m: 2 }}
          />
          <TextField
            label="Lastname"
            variant="outlined"
            value={child.lastname}
            onChange={(e) => setChild({ ...child, lastname: e.target.value })}
            fullWidth
            sx={{ m: 2 }}
          />
          <TextField
            id="outlined-number"
            label="Age"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={child.age}
            onChange={(e) => setChild({ ...child, age: e.target.value })}
            fullWidth
            sx={{ m: 2 }}
          />
          <TextField
            id="outlined-number"
            label="Year"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            sx={{ m: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateWishlist}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
