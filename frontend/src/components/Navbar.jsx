import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Navbar(){
 const navigate = useNavigate();
 const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};
    return(
        <nav>

            <Link to="/">
                Home
            </Link>
            <Link to="/products">
        Products
         </Link>

            <Link to="/login">
                Login
            </Link>
<Link to="/cart">
    Cart
</Link>
            <Link to="/register">
                Register
            </Link>
            <Link to="/profile">
    Profile
</Link>
<Link to="/MyOrder">
    MyOrders
</Link>
<Link to="/wishlist">WishList</Link>
<button onClick={logout}>
    Logout
</button>
        </nav>
    );
}

export default Navbar;