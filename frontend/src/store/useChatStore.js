import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.lib';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';




export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isLoadingMessages:false,
    isUsersLoading:false,
    getUsers:async()=>{
        set({isUsersLoading:true});
        try {
            const res=await axiosInstance.get("/messages/users");
            set({users:res.data});
            
        } catch (error) {
            toast.error("Failed to load users");    
        }finally{
            set({isUsersLoading:false});
        }
    },
    sentMessage:async(messageData)=>{
        const {selectedUser,messages}=get();
        try {

            const res =await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            console.log(res);
            
            
            set({messages:[...messages,res.data]})
            

        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    getMessages:async(userId)=>{
            set({isLoadingMessages:true})
            try {
                const res =await axiosInstance.get(`/messages/${userId}`);
                set({messages:res.data})
            } catch (error) {
                toast.error(error.response.data.messages)
            }finally{
                set({isLoadingMessages:false});
            }
    },

    subscribeToMessage:()=>{
        const {selectedUser}=get();
        if(!selectedUser) return;
        const socket =useAuthStore.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderID!=selectedUser._id) return
            set({
                messages:[...get().messages,newMessage],
            });
        });
   
    },
    unsubscribeToMessage:()=>{
        const {socket} =useAuthStore.getState().socket;
        socket.off("newMessage");

    },
    setSelectedUser:(selectedUser)=>set({selectedUser}),
    
}))  