// ----------- Components ---------;
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loader from "./components/Loader";


// ----------- Middle Ware --------; 
import Auth from "./middleware/Auth";
import Guest from "./middleware/Guest";

// ----------- Hooks --------------;
import useAuthStore from "./stores/useAuthStore";
import useSpinnerStore from "./stores/useSpinnerStore";
import { useEffect } from "react";

// ----------- React Router -------;
import { Route , Routes } from "react-router-dom";

function App() {
  const {refreshAuth} = useAuthStore();
  const {spinner , setSpinner} = useSpinnerStore();
  useEffect(()=>{
    refreshAuth()
    setSpinner(false)
  } , []);

  function Load ()
  {
    if(spinner)
    {
      return  <Loader/>
    }
  }


  return (
    <>
   
      {Load()}
      <Routes>
        <Route element={<Auth/>}>
          <Route path="/" element={<Home/>} />  
        </Route> 

        <Route element={<Guest/>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
