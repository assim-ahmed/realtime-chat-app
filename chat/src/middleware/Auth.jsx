import useAuthStore from "../stores/useAuthStore";
import { Outlet , Navigate } from 'react-router-dom'

function Auth()
{
    const {isAuth} = useAuthStore();

    if(!isAuth)
    {
        return <Navigate to={"/login"} replace/>
    }

    return <Outlet/>
   
}

export default  Auth ;