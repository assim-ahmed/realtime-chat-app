import { create } from "zustand";
import useAuthStore from "./useAuthStore";
import { API } from "../assets/js/apiConfig";

const useFriendsStore = create((set , get)=>({

    friends : [] ,
    selectFriend : {} , 
    messages : [] ,
    
    getFriends : async ()=>{
        let userid = useAuthStore.getState().userid ;
        let response = await API.get(`/get_friends.php?my_id=${userid}`) ;
        set(()=>({
            friends :[...response.data.users],
        }));
    },

    updateFriendStatus : (friend_id , status)=>{
        set((state)=>({

            friends : state.friends.map(friend=>{ 
                if(friend.id === friend_id){
                    return {...friend, status: status};
                }
                return friend;
            }),

            selectFriend : state.selectFriend.id === friend_id ? {...state.selectFriend , status : status} : state.selectFriend
        }))
    },


    setSelectFriend :(friend)=>{
        set((state)=>({
            ...state,
            selectFriend : friend
        }))
        get().getMessages(friend.id);
    },

    getMessages : async (friend_id)=>{
        let my_id = useAuthStore.getState().userid ;
        let response = await API.get(`/get_messages.php?my_id=${my_id}&target_id=${friend_id}`) ;
        set((state)=>({
            ...state,
            messages : [...response.data.messages]
        }))
    },

    addNewMessage : (message)=>{
        set((state)=>({
            ...state,
            messages : [...state.messages , message]
        }))
    },

    setFriendsStore : ()=>{
        set(()=>({
            friends : [] ,
            selectFriend : {} , 
            messages : [] ,
        }))
    },



}))

export default useFriendsStore;