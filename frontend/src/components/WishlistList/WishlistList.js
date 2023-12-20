import React from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  ListItem,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { deleteWishlist, getAllWishlists } from "../../api/wishlistApi.js";
import DeleteIcon from "./Trash_font_awesome.svg.png";
import UpdateDialog from "./UpdateDialog.js";
import PostDialog from "./PostDialog.js";
import RandomQuoteGenerator from "./QuoteGen.js";

const url = "http://localhost:8000/api";

class WishlistList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: "",
      filteredItems: [],
    };
  }

  componentDidMount() {
    getAllWishlists().then((result) => {
      this.setState({ data: result });
      this.setState({ filteredItems: result });
    });
  }

  handleDelete = (itemId) => {
    deleteWishlist(itemId);
    window.location.reload();
  };

  handleFilterChange = (val) => {
    const value = val.toLowerCase();
    this.setState({ filter: value });

    const filtered = this.state.data.filter((fItem) =>
      fItem.child.firstname.toLowerCase().includes(val)
    );

    this.setState({ filteredItems: filtered });
  };

  render() {
    const data = this.state.data;
    const { filter, filteredItems } = this.state;

    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <PostDialog />
          <TextField
            label="Filter by Name"
            variant="outlined"
            value={filter}
            onChange={(e) => this.handleFilterChange(e.target.value)}
            style={{ margin: "16px" }}
          />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems ? (
                filteredItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Link
                        to={{
                          pathname: `/${item._id}`,
                        }}
                      >
                        {item.child.firstname} {item.child.lastname}
                      </Link>
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
                      <UpdateDialog item={item} />
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
        <RandomQuoteGenerator />
      </React.Fragment>
    );
  }
}

export default WishlistList;
