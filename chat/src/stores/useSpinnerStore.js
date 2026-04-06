import { create } from "zustand";

const useSpinnerStore = create(function( set , get ){
    return {
        spinner : false ,

        setSpinner : function(status)
        {
           set(()=>({spinner:status}))
        },
    }
});

export default useSpinnerStore ;