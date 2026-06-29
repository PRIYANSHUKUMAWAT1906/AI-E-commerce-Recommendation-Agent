import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Home() {
const navigate = useNavigate();
  const getProfile=async ()=>{
    const token = localStorage.getItem("token");
if(!token){
    alert("Please login first");
        navigate("/login");
        return;
}

    try{
const response=await api.get("/auth/profile", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
navigate("/profile");     
}
    catch (error){
      console.log(error);
    }
  }
  return (<div><h1>Home Page</h1>
  <button onClick={getProfile}>
    Get Profile
</button>
  </div>)
}

export default Home;