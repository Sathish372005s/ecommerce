import { create } from "zustand";
import api from "../service/api";

const getAuthHeaders = async () => {
    const { useauthstore } = await import("./store.js");
    const token = useauthstore.getState().token;
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const useorderstore = create((set) => ({
    order:[],
    loading:false,
    error:null,
    createonlineorder : async(shippingAddress,phone)=>{
        set({loading:true,error:null})
        try {
            const headers = await getAuthHeaders();
            const res = await api.post("/orders/createorder",{
                shippingAddress,
                phone
            },{
                headers
            })
            set({loading:false})
            return res.data
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Create order failed"
            set({error:message,loading:false})
            throw new Error(message)
        }
    },
    createcodorder : async(shippingAddress,phone)=>{
        set({loading:true,error:null})
        try {
            const headers = await getAuthHeaders();
            const res = await api.post("/orders/createcodorder",{
                shippingAddress,
                phone
            },{
                headers
            })
            set((state) => ({
                order: res.data.order ? [res.data.order, ...state.order] : state.order,
                loading:false
            }))
            return res.data
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Create COD order failed"
            set({error:message,loading:false})
            throw new Error(message)
        }
        
    },
    getmyorders : async()=>{
        set({loading:true,error:null})
        try {
            const headers = await getAuthHeaders();
            const res = await api.get("/orders/myorders", {
                headers
            })
            set({order:res.data.orders,loading:false})
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Fetch orders failed"
            set({error:message,loading:false})
            throw new Error(message)
        }
    },
    getallorders : async()=>{
        set({loading:true,error:null})
        try {
            const headers = await getAuthHeaders();
            const res = await api.get("/orders/getallorders", {
                headers
            })
            set({order:res.data.orders,loading:false})
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Fetch all orders failed"
            set({error:message,loading:false})
            throw new Error(message)
        }
    },
    cancelorder : async(id)=>{
        set({loading:true,error:null})
        try {
            const headers = await getAuthHeaders();
            const res = await api.delete(`/orders/cancelorder/${id}`, {
                headers
            })
            set({loading:false})
            return res.data
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Cancel order failed"
            set({error:message,loading:false})
            throw new Error(message)
        }
    }
}));
