import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
    set({ isSoundEnabled: !get().isSoundEnabled })
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  getAllContacts: async () => {
    set({ isUsersLoading: true })
    try {
      const response = await axiosInstance.get("/messages/contacts");
      set({ allContacts: response.data })
    } catch (error) {

      console.log("FULL ERROR:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      set({ isUsersLoading: false })
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true })
    try {
      const response = await axiosInstance.get("/messages/chats");
      set({ chats: response.data })
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isUsersLoading: false })
    }
  },
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true })
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data })
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isMessagesLoading: false })
    }

  },
  sendMessage: async (msgData) => {
    const { selectedUser, messages } = get();
    const authUser = useAuthStore.getState().authUser;
    const tempId = `temp-${Date.now()}`;
    const tempMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: msgData.text,
      image: msgData.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

    }
    set({ messages: [...messages, tempMessage] });
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, msgData);
      set({ messages: [...messages, res.data] })
    }
    catch (error) {
      set({ messages: messages })
      toast.error(error.response?.data?.message || error.message)
    }

  }

}))