import { useState } from "react";
import {Link} from 'react-router-dom';


function Register()
{
    //    ------------- Action -----------;

    const [registerForm , setRegisterForm ] = useState({
        username : "",
        password : "",
        confirm_password :"" ,
    });
    const sumbitHandle = (e)=>{
        e.preventDefault();
    } 
    const fillInputs = (e)=>{
        const { name , value } = e.target ;
        setRegisterForm(()=>({
            ...registerForm , 
            [name] : value ,
        }))
    }


    //    ------------- View -------------;
    return( <div className="min-h-[100vh] bg-linear-to-l from-slate-600 to-stone-600 flex flex-col justify-center items-center"> 
        <div className="p-3 px-5 bg-black/70 text-white select-none  rounded text-lg relative top-5"> Start Now With Chat !</div>

        <div className="p-10 border-l-3 border-r-3 border-b-3 border-gray-500 rounded-xl" >
            <form onSubmit={sumbitHandle} className="flex flex-col gap-3">
                <div>
                    <input
                        name="username"
                        placeholder="Username"
                        className="text-center bg-white/40 text-white outline-none px-20 p-1.5 rounded-lg"
                        type="text"
                        onChange={fillInputs}
                    />
                </div>

                <div>
                    <input
                        name="password"
                        placeholder="Password"
                        className="text-center bg-white/40 text-white outline-none px-20 p-1.5 rounded-lg"
                        type="password"
                        autoComplete="off"
                        onChange={fillInputs}

                    />
                </div>

                <div>
                    <input
                        name="confirm_password"
                        placeholder="Confirm Password"
                        className="text-center bg-white/40 text-white outline-none px-20 p-1.5 rounded-lg"
                        type="password"
                        autoComplete="off" 
                        onChange={fillInputs}

                    />
                </div>

                <div>
                    <input
                        value="Create Account"
                        className="text-center bg-white/40 text-white outline-none px-10 p-1.5 rounded-lg hover:bg-white/90 hover:text-gray-500  duration-150 cursor-pointer"
                        type="submit"
                    />
                </div>

                <div className="text-center text-sm select-none">
                    <p> Have Account?<span className="text-white/40 underline cursor-pointer  hover:text-white "><Link to={"/login"}>Login</Link></span> </p>
                </div>
            </form>
        </div>
     
    </div> )
}
export default Register;