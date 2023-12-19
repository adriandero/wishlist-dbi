import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
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
} from "../../api/wishlistApi.js";

export default function PostDialog() {
  const [open, setOpen] = React.useState(false);
  const [year, setYear] = React.useState(2023);
  const [child, setChild] = React.useState({
    firstname: "",
    lastname: "",
    age: 0,
  });
  const [items, setItems] = React.useState([]);

  const [itemName, setItemName] = React.useState("");
  const [itemCurrentPrice, setItemCurrentPrice] = React.useState();

  const addItem = () => {
    if (itemName && itemCurrentPrice) {
      // Create a new item object
      const newItem = {
        name: itemName,
        currentprice: itemCurrentPrice,
      };

      // Update the items state with the new item
      setItems([...items, newItem]);

      // Clear the input fields
      setItemName("");
      setItemCurrentPrice("");
    }
  };
  const handleAddWishlist = () => {
    postWishlist(year, child, items);
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
      <Button variant="contained" sx={{ m: 2 }} onClick={handleClickOpen}>
        Add Wishlist
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Wishlist</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a wishlist.
          </DialogContentText>
          <TextField
            label="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Child's First Name"
            value={child.firstname}
            onChange={(e) => setChild({ ...child, firstname: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Child's Last Name"
            value={child.lastname}
            onChange={(e) => setChild({ ...child, lastname: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Child's Age"
            value={child.age}
            type="number"
            onChange={(e) =>
              setChild({ ...child, age: parseInt(e.target.value) })
            }
            fullWidth
            margin="normal"
          />

          <TextField
            label="item name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="item price"
            value={itemCurrentPrice}
            type="number"
            onChange={(e) => setItemCurrentPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell>currentprice</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.currentprice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button onClick={addItem}>Add Item</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddWishlist}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
