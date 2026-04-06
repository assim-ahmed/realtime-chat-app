import { IoChatbox } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoIosArrowDropright } from "react-icons/io";
import { BiPowerOff } from "react-icons/bi";
import { TbPointFilled } from "react-icons/tb";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import useFriendsStore from "../stores/useFriendsStore";


function Sidebar() {

    const [toggleSide, setToggleSide] = useState(false);
    const { friends, getFriends, selectFriend, setSelectFriend } = useFriendsStore();
    const { logoutAction, username } = useAuthStore();
    let sidePos = toggleSide ? 'left-[80px]' : 'left-[-100%]';

    useEffect(() => { getFriends() }, [])
    
    function viewFirends() {
        return friends.map((friend) => {
            let active = friend.id == selectFriend.id ? 'bg-gray-400' : '';
            let point = friend.status == 0 ? 'text-red-500' : 'text-green-500';
            let status = friend.status == 0 ? 'OffLine' : 'Online';
            return (
                <div
                    onClick={() => { setSelectFriend(friend) }}
                    key={friend.id}
                    className={`flex gap-2 hover:bg-gray-400 cursor-pointer p-2 rounded ${active}`}>
                    <div>
                        <img src={`https://ui-avatars.com/api/?name=${friend.username}&background=random&color=fff`} className="rounded-full size-10" />
                    </div>
                    <div className="select-none">
                        <p className="text-white text-2xl">{friend.username}</p>
                        <p className="text-sm flex text-white/60 ">
                            {status}
                            <TbPointFilled className={`self-center text-green-300 ${point}`} />
                        </p>
                    </div>
                </div>
            )
        }
        )
    }

    return (
        <div className="sidebar flex">

            <div className="sidebar-left w-20 bg-gray-800 border-r-3 border-r-zinc-200">
                <div className="flex flex-col min-h-screen ">
                    <div className="text-white  flex justify-center relative select-none pt-2">
                        <IoChatbox className="text-5xl" />
                        <span className="absolute z-[333] text-black/50 top-3 font-bold text-lg">C</span>
                    </div>

                    <div className="nav-menu mt-10 flex flex-col gap-8">
                        <div
                            title="Profile"
                            className="text-white text-xl flex justify-center
                                hover:bg-white/20 p-2 rounded cursor-pointer">
                            <FaRegUser />
                        </div>
                        <div
                            title="Logout"
                            onClick={() => { logoutAction() }}
                            className="text-white text-xl flex justify-center
                                hover:bg-white/20 p-2 rounded cursor-pointer">
                            <BiPowerOff />
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="pb-10 flex flex-col justify-center items-center gap-5">
                            <img src={`https://ui-avatars.com/api/?name=${username}&background=random&color=fff`} className="rounded-full" alt="" />
                            <span
                                onClick={() => { setToggleSide((pre) => !pre) }}
                                className="text-2xl text-white md:hidden">
                                <IoIosArrowDropright className="hover:text-white/30 cursor-pointer" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`main-sidebar w-60 h-screen bg-gray-800 absolute md:static ${sidePos} duration-700`}>

                <div className="flex justify-center p-2 py-4 select-none border-b-3 border-b-zinc-200">
                    <p className="text-white text-2xl"> Friends </p>
                </div>

                <div className="friends-menu p-3 h-[85vh] overflow-auto flex flex-col gap-2">
                    {viewFirends()}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;