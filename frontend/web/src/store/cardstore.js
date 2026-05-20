 import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../service/api";

export const usecartstore = create((set, get) => ({
    cart:null,
    loading:false,
    error:null,
    
    addtocart: async (data) => {
        try {
            set({loading:true,error:null});
            const { useauthstore } = await import("./store.js");
            const token = useauthstore.getState().token;
            const response = await api.post("/cart/add", data, {
                headers:{
                    "Authorization":`Bearer ${token}`    
                }
            });
            set({loading:false,error:null,cart:response.data.cart});
        } catch (error) {
            set({error:error.response?.data?.message || "Failed to add to cart",loading:false});
            throw error;
        }
    },
    getcart:async () => {
        try {
            set({loading:true,error:null});
            const { useauthstore } = await import("./store.js");
            const token = useauthstore.getState().token;
            const response = await api.get("/cart/getcart", {
                headers:{
                    "Authorization":`Bearer ${token}`    
                }
            });
            set({loading:false,error:null,cart:response.data.cart});
        } catch (error) {
            set({error:error.response?.data?.message || "Failed to fetch cart",loading:false});
            throw error;
        }
    },
    removecart: async (id) => {

    try {

        set({
            loading: true,
            error: null,
        });

        const { useauthstore } = await import("./store.js");

        const token = useauthstore.getState().token;

        await api.delete(
            `/cart/remove/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Update local Zustand state
        set((state) => ({

            loading: false,

            cart: state.cart
                ? {
                      ...state.cart,

                      items: state.cart.items.filter(
                          (item) => item._id !== id
                      ),
                  }
                : null,
        }));

    } catch (error) {

        set({
            error:
                error.response?.data?.message ||
                "Failed to remove from cart",

            loading: false,
        });

        throw error;
    }
}
}))