import { useState } from "react";
import api from "../services/api";
function Register() {

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
        <div>
            <h1>Register</h1>
<form onSubmit={handleSubmit}>
 <input
    type="text"
    name="name"
    placeholder="name"
    value={formData.name}
    onChange={handleChange}
/>

<input
    type="email"
    name="email"
    placeholder="email"
    value={formData.email}
    onChange={handleChange}
/>

<input
    type="password"
    name="password"
    placeholder="password"
    value={formData.password}
    onChange={handleChange}
/>
            <button type="submit">
                Register
            </button>
</form>
          
           
        </div>
    );
}

export default Register;