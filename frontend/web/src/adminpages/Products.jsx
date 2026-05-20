import React from 'react'
import { Link } from 'react-router-dom'
import { useproductstore } from '../store/productstore'
export default function Products() {
    const {products} = useproductstore();
    console.log(products);
  return (
    <div>
         <Link to="/createproduct">Create Product</Link>
        <h1>All Products</h1>
       
    </div>
  )
}
