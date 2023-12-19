import axios from "axios";
import React, { useState } from "react";

const url = "http://localhost:8000/api";

export const getAllWishlists = async () => {
  try {
    const response = await axios.get(`${url}/getAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlists:", error.message);
  }
};

export const getOneWishlist = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single wishlist: ", error.message);
  }
};

export const postWishlist = (year, child, items) => {
  axios({
    method: "post",
    url: `${url}/post`,
    data: {
      year: year,
      child: child,
      items: items,
    },
  }).then((response) => {
    console.log("successfully created");
    console.log(response);
    return response.data;
  });
};

export const updateWishlist = (id, year, child, items) => {
  axios({
    method: "patch",
    url: `${url}/patch/${id}`,
    data: {
      year: year,
      child: child,
      items: items,
    },
  }).then((response) => {
    console.log("successfully updated");
    console.log(response);
  });
};

export const deleteWishlist = (id) => {
  axios.delete(`${url}/${id}`).then((response) => {
    console.log("successfully deleted");
    console.log(response);
  });
};
