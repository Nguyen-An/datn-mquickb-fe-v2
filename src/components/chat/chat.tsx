"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Markdown from 'react-markdown';

const SOCKET_SERVER_URL = "http://localhost:8000";
let msgCurent = ""
const ChatPage = () => {
    const [socket, setSocket] = useState<any>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [contentMessages, setContentMessages] = useState<any[]>([]);
    const [isLoadAnswer, setIsLoadAnswer] = useState<boolean>(false); // dùng để disable btn chat khi câu trả lời đang được ren
    const [inputMessage, setInputMessage] = useState<string>("");

    useEffect(() => {
        const socket = io(SOCKET_SERVER_URL, {
            extraHeaders: { Authorization: `${localStorage.getItem("token")}` }
        });
        setSocket(socket);

        // Lắng nghe sự kiện kết nối
        socket.on("connect", () => {
            console.log("Connected to server SocketIO");
        });

        // Lắng nghe sự kiện 'message'
        socket.on("message", (response: string) => {
            // Trích xuất phần JSON từ chuỗi
            const jsonString = response.split('data: ')[1];
            if (!jsonString?.trim()) {
                return;
            }
            const data = JSON.parse(jsonString);
            if (data?.type === 'START') msgCurent = ""

            msgCurent = `${msgCurent}${data?.value}`
            
            if (data?.type === 'EOS') {
                // newMessages.push(msgCurent);
                setContentMessages((prevMessages) =>{
                    let newListMsg = [...prevMessages]
                    newListMsg.push(msgCurent);
                    console.log("newListMsg: ", newListMsg);
                    console.log("msgCurent: ", msgCurent);
                    
                    return newListMsg
                } );

                setIsLoadAnswer(false)
            }
        });

        return () => {
            socket.disconnect(); // Cleanup khi unmount
        };
    }, []);

    const sendChat = () => {
        if (!inputMessage.trim()) return;

        const messageData = {
            thread_id: "thread_GH2K75yxRy5kCR5qLflvGdkc",
            message: inputMessage,
        };

        socket.emit("message", messageData);
        setInputMessage("");
    };

    const loggggg = () => {
        console.log("contentMessages: ", contentMessages);
        console.log("msgCurent: ", msgCurent);
    }

    return (
        <div className="flex flex-col h-[500px] p-4 bg-gray-100">
            <div className="flex-1 overflow-y-auto bg-white shadow-md rounded-md p-4 mb-4">
                {contentMessages.map((message, index) => (
                    <div
                        key={index}
                        className={message.person === 'user' ? 'message-box message-box-user' : 'message-box message-box-assistant'}
                    >
                        {message?.person === 'user'
                            ?
                            <div className="avatar avatar-user">
                                {/* <AvatarComon email={userInfo?.email} width={"39px"} height={"39px"} fontSize={"24px"} /> */}
                            </div>
                            :
                            <div className="avatar avatar-assistant">
                                {/* <img src={avatarLogo.src} alt="logo" /> */}
                            </div>
                        }
                        {/* <div className="content-chat">
                            {
                                index == contentMessages.length - 1 && message.person === 'assistant' ?
                                    <span className="loading">.....</span> :
                                    <Markdown>
                                        {message.text}
                                    </Markdown>
                            }

                        </div> */}
                        {message} <br /> <br />
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={sendChat}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Gửi
                </button>
            </div>
            <div onClick={() => loggggg()}>
                Logg
            </div>
        </div>
    );
};

export default ChatPage;
