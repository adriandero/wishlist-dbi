import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Wishlist from "./components/WishlistList/WishlistList.js";
import ItemList from "./components/WishlistList/ItemList.js";

import { Outlet, Link } from "react-router-dom";

const NoPage = () => {
  return <h1>404</h1>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Wishlist />} />
        <Route path="" element={<Wishlist />} />
        <Route path=":id" element={<ItemList />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
