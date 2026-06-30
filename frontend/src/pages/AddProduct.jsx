import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddProduct() {

    const navigate = useNavigate();

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");

    const addProduct = async () => {

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/products",
                {
                    name,
                    price
                },
                {
                    headers:{
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

            navigate("/admin");

        } catch(error){

            console.log(error);

        }

    };

    return (

        <div>

            <h1>Add Product</h1>

            <input
                placeholder="Name"
                value={name}
                onChange={(e)=>
                    setName(e.target.value)
                }
            />

            <input
                placeholder="Price"
                value={price}
                onChange={(e)=>
                    setPrice(e.target.value)
                }
            />

            <button onClick={addProduct}>
                Add Product
            </button>

        </div>

    );

}

export default AddProduct;