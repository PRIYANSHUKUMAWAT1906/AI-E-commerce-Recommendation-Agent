import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import api from "../services/api";
function Login(){
const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });

    const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};
const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post(
            "/auth/login",
            formData
        );
localStorage.setItem(
    "token",
    response.data.token
);
navigate("/profile");
   

    } 
    catch (error) {

        console.log(error);

    }
};

    return(
         <div className="login-container">

        <div className="login-card">

            <h1>Login</h1>

            <form
                className="login-form"
                onSubmit={handleSubmit}
            >

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">
                    Login
                </button>

            </form>

            <div className="login-footer" >
                <a onClick={()=>{
                    navigate("/register");
                }}>Don't have an account?</a>
            </div>

        </div>

    </div>

    );
}

export default Login;