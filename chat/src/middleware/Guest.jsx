import useAuthStore from "../stores/useAuthStore";
import { Outlet , Navigate } from 'react-router-dom'

function Guset()
{
    const {isAuth} = useAuthStore();

    if(!isAuth)
    {
        return <Outlet/>
    }
    
    return <Navigate to={"/"} replace/>
   
}

export default  Guset ;