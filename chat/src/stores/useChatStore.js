import { create } from 'zustand';
import useFriendsStore from './useFriendsStore';


const useChatStore = create((set, get) => ({

  socket: null,
  isConnected: false,

  connect: (userId) => {

    if (get().socket !== null) return;

    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {

      set({isConnected: true, socket: ws });
      get().socket.send(JSON.stringify({ type: 'login', user_id: userId}));
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'new_message') {

        console.log("");
        useFriendsStore.getState().addNewMessage({
          content : data.content , mines: false 
        });
      }

      if(data.type=="user_status")
      { 
        let userId = data.user_id;
        let status = data.status ; 
        useFriendsStore.getState().updateFriendStatus(userId , status);

      }

    };

    ws.onclose = () => {
      set({ isConnected: false, socket: null });
      console.log("Disconnected.. Reconnecting?");
      // ممكن هنا تعمل logic لإعادة الاتصال تلقائياً
    };
  },

  sendMessage: (payload) => {
    const  socket  = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({...payload }));
    }
  },

  setSoket: () => {
    set({
      socket: null,
      isConnected: false,
    });
  },


}));

export default useChatStore;