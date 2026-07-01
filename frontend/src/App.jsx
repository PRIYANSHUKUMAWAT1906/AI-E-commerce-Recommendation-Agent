import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Products from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrder";
import OrderDetails from "./pages/OrderDetail";
import Wishlist from "./pages/Wishlist";
import AdminDashboard from "./pages/Admindashboard";
import AIChatbot from "./components/Aichatbox";
import CompareProducts from "./pages/CompareProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AboutContact from "./pages/AboutContact";
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
<Route path="/admin"element={<AdminDashboard />}/>
<Route path="/compareproducts"element={<CompareProducts />}/>
<Route path="/admin/add-product" element={<AddProduct />}/>

<Route path="/admin/edit-product/:id" element={<EditProduct />}/>
<Route path="/about"    element={<AboutContact />}/>
      </Routes>
      <AIChatbot />
    </BrowserRouter>
  );
}

export default App;