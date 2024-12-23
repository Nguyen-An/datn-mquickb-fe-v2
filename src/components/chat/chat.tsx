"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Markdown from 'react-markdown';
import { Spin } from "antd";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
// let msgCurent = ""
const ChatPage = () => {
    const [socket, setSocket] = useState<any>(null);
    const [threadId, setThreadId] = useState<any>(null);
    const [testText, setTestText] = useState<any>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    // const [messages, setMessages] = useState<string[]>([]);
    const messageCurrentRef = useRef("")
    const [contentMessages, setContentMessages] = useState<any[]>([]);
    const [isLoadAnswer, setIsLoadAnswer] = useState<boolean>(false); // dùng để disable btn chat khi câu trả lời đang được ren
    const [inputMessage, setInputMessage] = useState<string>("");
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };

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
            if (data?.type === 'START') {
                messageCurrentRef.current = ""
            }
            // console.log(data?.value);

            setTestText((prevText: string) => prevText + data?.value);

            messageCurrentRef.current = `${messageCurrentRef.current}${data?.value}`

            if (data?.type === 'EOS') {
                console.log("testText: ", testText);

                setContentMessages((prevMessages) => {
                    let newListMsg = [...prevMessages]
                    newListMsg.push({
                        role: 'bot',
                        message: messageCurrentRef.current
                    });
                    return newListMsg
                });
                setTestText("")
            }
        });

        socket.on('thread', (response) => {
            setThreadId(response)
        });

        return () => {
            socket.disconnect(); // Cleanup khi unmount
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [contentMessages, testText]);

    const sendChat = () => {
        if (!inputMessage.trim()) return;

        const messageData = {
            // thread_id: "thread_VdGchV3tOX8Z6O60OJSYL57K",
            thread_id: threadId,
            message: inputMessage,
        };
        socket.emit("message", messageData);

        setContentMessages((prevMessages) => {
            let newListMsg = [...prevMessages]
            newListMsg.push({
                role: 'user',
                message: inputMessage
            });
            return newListMsg
        });

        setInputMessage("");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-75px)] p-4 bg-gray-100">
            <Spin spinning={isLoadAnswer} size='large' fullscreen />
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
                        <div className={`${message?.role == 'user' ? 'flex flex-row-reverse' : ''}`}>
                            <div className={`${message?.role == 'user' ? 'flex flex-row-reverse' : ''} w-[calc(100%-100px)]`}>
                                <div className="bg-[#ccc] p-2 rounded-[10px]">
                                    <Markdown>
                                        {message?.message}
                                    </Markdown>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                ))}

                {testText ? (<div className="message-box message-box-assistant">
                    <div className="w-[calc(100%-100px)]">
                        <div className="bg-[#ccc] p-2 rounded-[10px]">
                            <Markdown>
                                {testText}
                            </Markdown>
                        </div>
                    </div>
                </div>) : <></>}

                <div ref={messagesEndRef} />
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
        </div>
    );
};

export default ChatPage;
