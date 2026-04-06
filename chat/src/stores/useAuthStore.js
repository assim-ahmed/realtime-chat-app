import { create } from 'zustand';
import { API } from '../assets/js/apiConfig';
import useSpinnerStore from './useSpinnerStore';
import useFriendsStore from './useFriendsStore';
import useChatStore from './useChatStore';
import { use } from 'react';

const useAuthStore = create((set, get) => ({
    username: "",
    userid: 0,
    isAuth: false,
    success: "",
    error: "",

    setSuccess: (message) => {
        set(() => ({
            success: message,
        }))
    },

    setError: (message) => {
        set(() => ({
            error: message,
        }))
    },

    loginAction: async function (credentials) {
        get().setError("");

        useSpinnerStore.getState().setSpinner(true);
        try {
            const [ response , x ] = await Promise.all([
                API.post("/login.php", credentials) ,
                get().wait(),
            ])
            useSpinnerStore.getState().setSpinner(false);

            localStorage.setItem('token', response.data.token);
            set(() => ({
                username: response.data.username,
                userid: response.data.user_id,
                success: response.data.message,
                isAuth: true,
            }))



        } catch (error) {

            get().setError(error.response.data.message);
            
        }
    },

    logoutAction: async function () {

        let soket = useChatStore.getState().socket;
        if(soket)
        {
            useChatStore.getState().sendMessage({type : "logout" , user_id : get().userid});
            soket.close();
            useChatStore.getState().setSoket();
        }

        useSpinnerStore.getState().setSpinner(true);
        await get().wait();
        localStorage.removeItem("token");

        set(() => ({
            username: "",
            userid: 0,
            isAuth: false,
            success: "",
            error: "",
        }))

        useSpinnerStore.getState().setSpinner(false);
        useFriendsStore.getState().setFriendsStore();
    },

    wait : function(time = 800){
        return new Promise( (resolve)=>{
        setTimeout(() => {
            resolve(); // إغلاق الـ Promise بنجاح
        }, time);
        } )
    },

    refreshAuth : async function()
    {
        useSpinnerStore.getState().setSpinner(true);
        try
        {
            let [request , wait ] = await Promise.all([
                API.get("/refresh_auth.php"),
                get().wait(),
            ]);

        useSpinnerStore.getState().setSpinner(false);
            localStorage.setItem("token" , request.data.token);
            set(() => ({
                username : request.data.username,
                userid : request.data.user_id,
                isAuth: true,
            }))
        }catch(error)
        {
            get().logoutAction()
        }
    }
}))

export default useAuthStore;