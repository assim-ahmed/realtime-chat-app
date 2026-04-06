import { TbPointFilled } from "react-icons/tb";
import useFriendsStore from "../stores/useFriendsStore";
import useChatStore from "../stores/useChatStore";
import useAuthStore from "../stores/useAuthStore";
import { useState } from "react";

function Chat() {
        const {sendMessage} = useChatStore();
        const { selectFriend, messages , addNewMessage} = useFriendsStore();
        const friend = selectFriend;

        const { userid } = useAuthStore();
        let point = friend.status == 0 ? 'text-red-500' : 'text-green-500';
        let status = friend.status == 0 ? 'OffLine' : 'Online';
        const [formData, setFormData] = useState("");

        function viewMessages() 
        { 
            if(messages.length == 0)
            {
                return (<div className="flex items-center justify-center h-full">
                    <p className="text-2xl text-gray-500">No messages yet, start the conversation</p>
                </div>)
            }else
            {
                return messages.map((message, index) =>{
                    let isMine = message.mines;
                    if (isMine){
                        return (
                            <div key={index} className="mine bg-blue-500 text-white p-2 rounded w-fit">  
                                {message.content}
                            </div>
                        )
                    }else{
                        return (
                            <div key={index} className="theirs bg-gray-300 text-black p-2 rounded w-fit self-end">
                                {message.content}
                            </div>
                        )
                    }

                })
            }
        }

        if (!selectFriend.id) {
            return (<>
                <div className="chat w-[95%] min-h-[80vh] mx-auto p-2 select-none flex items-center justify-center">
                    <div className="flex items-center justify-center h-full">
                        <p className="text-2xl text-gray-500">Select a friend to start chatting</p>
                    </div>
                </div>
            </>)
        }

        function handleSendMessage(){
            let payload = {
                content : formData ,
                receiver_id : friend.id,
                sender_id : userid,
                type :"message"
            }
            
            sendMessage(payload);
            addNewMessage({...payload , mines : true});
            setFormData("");   
        }

        function handleinputChange(e){
            setFormData(e.target.value);
        }

        return (<>
            <div className="flex-1 p-4">
                <h1 className="text-5xl font-bold mb-2 text-black/70">Chat</h1>
                <div className="bg-white/50 rounded-lg shadow p-1 "></div>

                <div className="chat w-[95%] min-h-[80vh] mx-auto p-2">

                    <div className="contact_info">
                        <div className={`flex gap-2 bg-gray-600 cursor-pointer p-2`}>
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
                    </div>

                    <div className="messages px-5 py-3 bg-gray-400 h-[65vh] overflow-y-auto flex flex-col gap-3">
                        {viewMessages()}
                    </div>
                    <div className="relative">   
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}>
                            <textarea
                                value={formData}
                                onChange={handleinputChange}
                                name="" id="" 
                                className="flex-1 bg-white/50 p-2 w-full resize-none outline-none"
                                placeholder="send your message . . "
                            ></textarea>

                        <button className="bg-blue-500 text-white px-4 py-2 rounded
                        absolute bottom-2 right-2 hover:bg-blue-600 curosr-pointer">Send</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
        );
    }   

export default Chat;