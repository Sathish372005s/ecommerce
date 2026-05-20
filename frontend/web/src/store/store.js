import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../service/api";

export const useauthstore = create(
  persist(
    (set, get) => ({

      user: null,
      token: null,
      loading: false,
      otp: null,
      error: null,
      message: null,
      otpsend: false,

      sendotp: async (email) => {

        const { otpsend } = get();

        if (otpsend) {
          return set({
            error: "OTP already sent"
          });
        }

        set({
          loading: true,
          error: null
        });

        try {

          const res = await api.post("/auth/send-otp", {
            email
          });

          set({
            otp: res.data.otp,
            message: res.data.message,
            otpsend: true,
            loading: false
          });

        } catch (error) {

          set({
            error: error.response?.data?.message,
            loading: false
          });

        }
      },

      register: async (name, email, password, otp) => {

        const { otpsend } = get();

        if (!otpsend) {
          return set({
            error: "Send OTP first"
          });
        }

        set({
          loading: true,
          error: null
        });

        try {

          const res = await api.post("/auth/register", {
            name,
            email,
            password,
            otp
          });

          set({
            user: res.data.user,
            token: res.data.token,
            message: res.data.message,
            loading: false,
            otpsend: false
          });

        } catch (error) {

          set({
            error: error.response?.data?.message,
            loading: false
          });

        }
      },

      login: async (email, password) => {

        set({
          loading: true,
          error: null
        });

        try {

          const res = await api.post("/auth/login", {
            email,
            password
          });

          set({
            user: res.data.user,
            token: res.data.token,
            message: res.data.message,
            loading: false
          });

        } catch (error) {

          set({
            error: error.response?.data?.message,
            loading: false
          });

        }
      },

      logout: () => {

        set({
          user: null,
          token: null
        });

      }

    }),
    {
      name: "auth-storage"
    }
  )
);