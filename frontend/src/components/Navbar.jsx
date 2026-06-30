import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css"


function Navbar(){
 const navigate = useNavigate();
 const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};
    return(
       <nav className="navbar">

    <div className="navbar-logo">
        AI Ecommerce
    </div>

    <div className="navbar-links">

        <Link to="/">Home</Link>

        <Link to="/products">
            Products
        </Link>

        <Link to="/cart">
            Cart
        </Link>

        <Link to="/wishlist">
            Wishlist
        </Link>

        <Link to="/compareproducts">
            Compare
        </Link>

        <Link to="/MyOrder">
            My Orders
        </Link>

        <Link to="/profile">
            Profile
        </Link>

        <Link to="/admin">
            Admin
        </Link>

        <Link to="/login">
            Login
        </Link>

        <Link to="/register">
            Register
        </Link>

        <button
            className="logout-btn"
            onClick={logout}
        >
            Logout
        </button>

    </div>

</nav>
    );
}

export default Navbar;