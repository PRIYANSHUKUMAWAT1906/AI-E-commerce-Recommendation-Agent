import api from "../services/api";


function Home() {
  const getProfile=async ()=>{
    try{
const token = localStorage.getItem("token");

const response=await api.get("/auth/profile", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
console.log(response.data);
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