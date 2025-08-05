import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.lib';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const baseURL = import .meta.env.MODE==="development"?"http://localhost:5000":"/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningIn: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error checking auth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningIn: true });
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      get().connectSocket();
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Error creating account");
    } finally {
      set({ isSigningIn: false });
    }
  },

  login: async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      get().connectSocket();
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("Error logging in:", error.message);
      toast.error("Error logging in");
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disConnectSocket();
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error("Error logging out");
    }
  },

  upadateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error updating profile:", error.message);
      toast.error(error.message || "Error updating profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(baseURL, {
      query: {
        userID: authUser._id
      }
    });

    socket.connect();

    socket.on("getOnlineUsers", (usersIds) => {
      set({ onlineUsers: usersIds });
      console.log("🔁 Online users:", usersIds);
    });

    set({ socket:socket });
    toast.success("Connected");
  },

  disConnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      set({ socket: null, onlineUsers: [] });
      socket.on("getOnlineUsers"); 
      socket.disconnect();
      toast.success("Disconnected");
    } else {
      console.log("Socket not connected or already disconnected.");
    }
  },
}));
