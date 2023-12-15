import { postWishlist } from "./wishlistApi.js";

const year = 2023;
const child = {
  firstname: "momo",
  lastname: "sdoso",
  age: 233,
};
const items = [
  {
    name: "Steamers White",
    currentprice: 339.99,
  },
  {
    name: "Toy Car",
    currentprice: 19.99,
  },
  {
    name: "Book Set",
    currentprice: 49.99,
  },
];
postWishlist(year, child, items);
