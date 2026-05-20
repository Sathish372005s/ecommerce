import React from 'react'
import {useForm} from 'react-hook-form'
import { useproductstore } from '../store/productstore'
import { useState } from 'react';

export default function Createproduct() {
  const {register,handleSubmit,reset} = useForm();
  const [previewImages, setPreviewImages] = useState([]);
  const [sizes, setSizes] = useState([{ size: "", quantity: 0 }]);
  const {createproduct,loading,error} = useproductstore();

  const onSubmit = async (data) => {
    console.log("form data",data);
    console.log("preview images",previewImages);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("gender", data.gender);
    formData.append("sizes", JSON.stringify(sizes.filter(s => s.size.trim() !== "")));
    formData.append("description", data.description);

    previewImages.forEach((img) => {
      formData.append("images", img.file);
    });

    await createproduct(formData);
    if (!error) {
      reset();
      setPreviewImages([]);
      setSizes([{ size: "", quantity: 0 }]);
    }
  };

  const handleImageschange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    
    setPreviewImages((prev) => [...prev, ...imagePreview]);
  };

  const removeImage = (indexToRemove) => {
    setPreviewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addSize = () => {
    setSizes([...sizes, { size: "", quantity: 0 }]);
  };

  const removeSizeObj = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-8">
          Create Product
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="space-y-5"> {/* for left */}
            <div>
              <label className="block mb-2 font-medium">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full border p-3 rounded-xl outline-none"
                {...register("name", {
                  required: "Product name is required",
                })}
              />
              {/* error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Product Price
              </label>
              <input
                type="number"
                placeholder="Enter product price"
                className="w-full border p-3 rounded-xl outline-none"
                {...register("price", {
                  required: "Product price is required",
                })}
              />
              {/* error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <div>
              <label className="block mb-2 font-medium">
                Product category
              </label>
              <select
                className="w-full border p-3 rounded-xl outline-none"
                {...register("category", {
                  required: "Category is required",
                })}
              >
                <option value="">Select category</option>
                <option value="phants">phants</option>
                <option value="shirts">shirts</option>
                <option value="shoes">shoes</option>
                <option value="accessories">Accessories</option>
                <option value="watches">watches</option>
                <option value="bags">bags</option>
                <option value="jewelry">jewelry</option>
                <option value="innerwear">innerwear</option>
                <option value="swimwear">swimwear</option>
                <option value="sunglasses">sunglasses</option>
                <option value="hats">hats</option>
                <option value="belts">belts</option>
                <option value="socks">socks</option>
                <option value="slippers">slippers</option>
              </select>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <label className="block mb-2 font-medium">
                  Gender
                </label>

                <select
                  className="w-full border p-3 rounded-xl outline-none"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                >
                  <option value="">Select Gender</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="unisex">Unisex</option>
                </select>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div> 
               <div>
                <label className="block mb-2 font-medium">
                  Product Sizes & Quantities
                </label>
                {sizes.map((s, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <input
                      type="text"
                      placeholder="Size (e.g. M, 9)"
                      value={s.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      className="w-1/2 border p-3 rounded-xl outline-none"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={s.quantity}
                      onChange={(e) => handleSizeChange(index, 'quantity', Number(e.target.value))}
                      className="w-1/3 border p-3 rounded-xl outline-none"
                      required
                      min="0"
                    />
                    {sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeObj(index)}
                        className="bg-red-500 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-red-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSize}
                  className="bg-gray-200 text-black px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  + Add Size
                </button>
               </div>
               <div>
                <label>Product Description</label>
                <textarea
                type="text"
                placeholder="Enter product description"
                className="w-full border p-3 rounded-xl outline-none"
                {...register("description", {
                  required: "Product description is required",
                })}
              />
              {/* error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
               </div>
              
            </div>
            
          </div>
          {/* second  */}
            <div className="space-y-5">
              <div>
              {/* images */}
              <label className="block mb-2 font-medium">
                Product Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageschange}
                className="w-full border p-3 rounded-xl bg-gray-50"
              />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {
                  previewImages.map((img,index)=>(
                    <div key={index} className="relative">
                      <img 
                        src={img.preview}
                        alt="preview"
                        className="w-full h-40 object-cover rounded-xl border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        &times;
                      </button>
                    </div>
                  ))
                }
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white p-3 rounded-xl font-medium mt-8 hover:bg-gray-800 disabled:bg-gray-400"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}
