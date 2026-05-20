import React, { useState , useEffect } from 'react';
import { useproductstore } from '../store/productstore';
import { useNavigate } from 'react-router-dom';

export default function Category() {
    const navigate = useNavigate();

    const categories = [
        "phants",
        "shirts",
        "shoes",
        "accessories",
        "watches",
        "bags",
        "jewelry",
        "innerwear",
        "swimwear",
        "sunglasses",
        "hats",
        "belts",
        "socks",
        "slippers"
    ];

    const [cat, setcat] = useState("");

    const { getbycategory,products} = useproductstore();

    const handleCategory = async (category) => {

        setcat(category);

        console.log("Selected:", category);

        await getbycategory(category);
        navigate("/prodcat");
    };

    useEffect(() => {
        console.log("Updated Products:", products);
    }, [products]);

    return (
        <div className='flex items-center justify-center'>
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => handleCategory(category)}
                    className={`bg-gray-300 px-4 py-2 m-1  rounded ${cat === category ? "bg-violet-400 text-white" : "bg-gray-300"}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}