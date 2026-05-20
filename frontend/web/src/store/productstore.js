 import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../service/api";

export const useproductstore = create((set, get) => ({
    products : [],
    singleProduct: null,
    page: 1,
    hasMore: true,
    error:null,
    loading:false,
    category :"",
    createproduct :async (formData )=>{
        try {
            set({loading:true,error:null});
            const { useauthstore } = await import("./store.js");
            const token = useauthstore.getState().token;
            const response = await api.post("/products/admin/createproduct",formData , {
                headers:{
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`    
                }
            }); 
            set((state) =>({
                products : [...state.products,response.data.product],
                loading:false
            }));
        } catch (error) {
            set({error:error.response.data.message,loading:false});
        }
    },
    getallproducts: async () => {
        try {
            const { page, products } = get();
            set({ loading: true });
            const response = await api.get( `/products/getproducts?page=${page}&limit=6` );
            const newProducts = response.data.products;
            const allProducts = [...products, ...newProducts];
            const uniqueProducts = Array.from(new Map(allProducts.map(item => [item._id, item])).values());
            set({
                products: uniqueProducts,
                page: page + 1,
                loading: false,
                hasMore: newProducts.length > 0,
            });
        } catch (error) {
            set({ loading: false });
            console.log(error);
        }
    },
    getbycategory : async(category)=>{
        try {
            set({loading:true,error:null});
            const response = await api.get(`/products/getproductsbycategory/${category}`);
           set((state)=>{
            return {
                products : response.data.categoryProducts,
                loading: false,
                category : category,
            };

        });
        }

        catch (error) {
            set({error:error.response.data.message,loading:false});
        }
    },
    getproductbyid :async(id)=>{
        try {
            set({loading:true,error:null});
            const response = await api.get(`/products/getproductbyid/${id}`);
            console.log(response.data.product);
            const product = response.data.product;
           set(()=>{
            return {
                singleProduct : product,
                loading: false,
            };

        });
        }

        catch (error) {
            set({error:error.response.data.message,loading:false});
        }
    },
    clearSingleProduct: () => { set({ singleProduct: null }); },
}))