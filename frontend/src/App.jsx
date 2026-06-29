import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Products from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrder";
import OrderDetails from "./pages/OrderDetail";
import Wishlist from "./pages/Wishlist";
function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<Route  path="/profile" element={<Profile />}/>
<Route path="/products"element={<Products />}/>
<Route path="/products/:id" element={<ProductDetails />} />
<Route   path="/cart" element={<Cart />}/>
<Route   path="/MyOrder" element={<MyOrders />}/>
<Route path="/orders/:id" element={<OrderDetails />}/>
<Route path="/wishlist" element={<Wishlist/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;