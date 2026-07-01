import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Productmanage.css"
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


    <div className="add-product-container">

        <div className="add-product-card">

            <h1>Add New Product</h1>

            <p>
                Create a new product for your store.
            </p>

            <div className="product-form">

                <label>
                    Product Name
                </label>

                <input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e)=>
                        setName(e.target.value)
                    }
                />

                <label>
                    Product Price
                </label>

                <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e)=>
                        setPrice(e.target.value)
                    }
                />

                <button
                    onClick={addProduct}
                >
                    Add Product
                </button>

            </div>

        </div>

    </div>


    );

}

export default AddProduct;