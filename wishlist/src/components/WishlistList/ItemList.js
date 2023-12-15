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
} from "@mui/material";
import { Link, Route, useNavigate } from "react-router-dom";
import {
  deleteWishlist,
  getAllWishlists,
  postWishlist,
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
      data: [],
    };
  }

  componentDidMount() {
    let wishlists = getAllWishlists();
    new Promise((resolve) => {
      return resolve(wishlists);
    }).then((res) => this.setState({ data: res }));
  }

  render() {
    const data = this.state.data;
    const { match, location } = this.props;
    const { customprop } = this.props.location.state || {};

    return (
      <TableContainer component={Paper}>
        <PostDialog />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customprop ? (
              customprop.map((item) => (
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

export default ItemList;
