import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { Link, Route, useNavigate } from "react-router-dom";
import {
  deleteWishlist,
  getAllWishlists,
  postWishlist,
} from "../../api/wishlistApi.js";
import axios from "axios";
import DeleteIcon from "./Trash_font_awesome.svg.png";
import Button from "@mui/material/Button/index.js";
import { spacing } from "@mui/system";
import Dialog from "@mui/material/Dialog/index.js";
import DialogActions from "@mui/material/DialogActions/index.js";
import DialogContent from "@mui/material/DialogContent/index.js";
import DialogContentText from "@mui/material/DialogContentText/index.js";
import DialogTitle from "@mui/material/DialogTitle/index.js";
import UpdateDialog from "./UpdateDialog.js";
import PostDialog from "./PostDialog.js";

const url = "http://localhost:8000/api";

class WishlistList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    let wishlists = getAllWishlists();
    new Promise((resolve) => {
      return resolve(wishlists);
    }).then((res) => this.setState({ data: res }));
  }

  /*
  getAllWishlists = async () => {
    try {
      const response = await axios.get(`${url}/getAll`);
      this.setState({ data: response.data });
    } catch (error) {
      console.error("Error fetching wishlists:", error.message);
    }
  };
  */
  handleDelete = (itemId) => {
    deleteWishlist(itemId);
    window.location.reload();
  };

  render() {
    const data = this.state.data;
    const { expandedRowId } = this.state;
    return (
      <TableContainer component={Paper}>
        <PostDialog />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell
                    component={(props) => (
                      <Link
                        to={{
                          pathname: `/${item._id}`,
                          state: { customprop: item.items },
                        }}
                        {...props}
                      />
                    )}
                  >
                    {item.child.firstname} {item.child.lastname}
                  </TableCell>

                  <TableCell>{item.year}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      onClick={() => this.handleDelete(item._id)}
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      <img
                        src={DeleteIcon}
                        alt="logo"
                        style={{ width: "20px" }}
                      />
                    </IconButton>
                    <UpdateDialog id={item._id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>  
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      // <List>
      //   {items.map((item) => (
      //     <ListItem key={item.id}>
      //       <ListItemText
      //         primary={`${item.firstname} ${item.lastname} | ${item.year}`}
      //         // Add more ListItemText properties as needed
      //       />
      //       <ListItemSecondaryAction>
      //         <IconButton
      //           edge="end"
      //           aria-label="delete"
      //           onClick={() => handleDelete(item.id)}
      //         >
      //           <DeleteIcon />
      //         </IconButton>
      //       </ListItemSecondaryAction>
      //     </ListItem>
      //   ))}
      // </List>
    );
  }
}

export default WishlistList;
