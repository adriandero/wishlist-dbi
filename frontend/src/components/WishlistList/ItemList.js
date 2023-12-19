import React from "react";
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
  Typography,
} from "@mui/material";
import { Link, Route, useNavigate } from "react-router-dom";
import {
  deleteWishlist,
  getAllWishlists,
  getOneWishlist,
} from "../../api/wishlistApi.js";
import DeleteIcon from "./Trash_font_awesome.svg.png";
import UpdateDialog from "./UpdateDialog.js";
import PostDialog from "./PostDialog.js";

const url = "http://localhost:8000/api";

class ItemList extends React.Component {
  // Fetch item details based on itemId, or use it as needed
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    getOneWishlist(window.location.pathname.slice(1)).then((result) => {
      this.setState({ data: result });
    });
  }

  render() {
    const child = this.state.data.child;
    const items = this.state.data.items;

    return (
      <React.Fragment>
        {child ? (
          <Typography variant="h3" component="h2" m={1}>
            {child.firstname} {child.lastname}
          </Typography>
        ) : (
          <Typography variant="h3" component="h2" m={1}></Typography>
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items ? (
                items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.currentprice}</TableCell>
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
      </React.Fragment>
    );
  }
}

export default ItemList;
