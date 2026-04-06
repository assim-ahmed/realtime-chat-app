
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import useAuthStore from "../stores/useAuthStore";
import useChatStore from "../stores/useChatStore";
import { useEffect, useRef } from "react";


function Home() {
  const {connect , sendMessage} = useChatStore();
  const {userid} = useAuthStore();

  useEffect(() => {
    connect(userid);
  } , [userid]);

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <Sidebar />
      <Chat />
    </div>
  )

}
export default Home;