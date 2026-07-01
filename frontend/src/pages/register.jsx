import { useState } from "react";
import api from "../services/api";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
function Register() {
const navigate = useNavigate();
   const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
});
const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};
const handleSubmit = (e) => {
  e.preventDefault();
  try{

    (async()=>{ const response =
            await api.post(
                "/auth/register",
                formData
            );

        console.log(response.data);
        })();
    }
    catch(error){

        console.log(error);
    }
};

    return (

    <div className="register-container">

        <div className="register-card">

            <h1>Create Account</h1>

            <form
                className="register-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">
                    Register
                </button>

            </form>

            <div className="register-footer">
                <a onClick={()=>{
                    navigate("/login")
                }} >Already Have account</a>
            </div>

        </div>

    </div>

);
}

export default Register;