import { useState } from "react";
import {Link} from 'react-router-dom';
import useAuthStore from "../stores/useAuthStore";
function Login()
{

    const { username  , loginAction,error} =  useAuthStore();

    const [loginForm , setLoginForm ] = useState({
            username : "",
            password : "",
    });

    const fillInputs =(e)=>{
            const { name , value } = e.target ;
            setLoginForm(()=>({
                ...loginForm , 
                [name] : value ,
            }))
    }

    const sumbitHandle =(e)=>{
        e.preventDefault();
        loginAction(loginForm)
    } 

    function errorView()
    {
        if(error.length > 0 )
        {
            return (<div className="bg-red-300 p-2 px-35 rounded-lg text-red-500" > * {error} </div>)
        }
        return "";
    }
    return( <div className="min-h-[100vh] bg-linear-to-l from-slate-600 to-stone-600 flex flex-col justify-center items-center"> 

        {errorView()}

        <div className="p-3 px-5 bg-black/70 text-white select-none  rounded text-lg relative top-5"> Welcome Back !</div>

        <div className="p-10 border-l-3 border-r-3 border-b-3 border-gray-500 rounded-xl" >
         
            <form onSubmit={sumbitHandle} className="flex flex-col gap-3">
                <div>
                    <input
                        onChange={fillInputs}
                        name="username"
                        autoComplete="off"
                        placeholder="Username"
                        className="text-center bg-white/40 text-white outline-none px-20 p-1.5 rounded-lg"
                        type="text" 
                    />
                </div>

                 <div>
                    <input
                        onChange={fillInputs}
                        name="password"
                        placeholder="Password"
                        className="text-center bg-white/40 text-white outline-none px-20 p-1.5 rounded-lg"
                        type="password"
                        autoComplete="off" 
                    />
                </div>

                 <div>
                    <input
                        onChange={fillInputs}
                        value="Login"
                        className="text-center bg-white/40 text-white outline-none px-10 p-1.5 rounded-lg hover:bg-white/90 hover:text-gray-500 text-lg duration-150 cursor-pointer"
                        type="submit"
                    />
                </div>
                <div className="text-center text-sm select-none">
                    <p> You Don't Have Account?<span className="text-white/40 underline cursor-pointer  hover:text-white "><Link to={"/register"}>Create One</Link></span> </p>
                </div>       
            </form>
        </div>
     
    </div>)
}
export default Login;