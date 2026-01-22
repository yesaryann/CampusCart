import { useState, useEffect, useContext, useRef } from 'react';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';
import io from 'socket.io-client';
import { Send } from 'lucide-react';

const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

const Chat = () => {
    const { user, loading } = useContext(AuthContext);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const messagesEndRef = useRef(null);

    // Initial Chat Fetch
    useEffect(() => {
        if (!user) return;
        const fetchChats = async () => {
            try {
                const { data } = await api.get('/chat');
                setChats(data);
            } catch (error) {
                console.error("Failed to load chats", error);
            }
        };
        fetchChats();
    }, []);

    // Socket Connection
    useEffect(() => {
        if (!user) return;
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));

        return () => {
            socket.disconnect();
        };
    }, [user]);

    // Handle Message Receiving
    useEffect(() => {
        socket.on("message received", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved._id) {
                // If notification system existed, trigger here
            } else {
                setMessages([...messages, newMessageRecieved.messages[newMessageRecieved.messages.length - 1]]);
            }
        });
    });

    // Select Chat and fetch messages (For now we just use the messages array in the chat object, but typically fetch separately) // Actually logic: messages are in chat object in my simple schema? No, schema has messages array. But fetchChats doesn't populate messages deep.
    // Correction: My fetchChats populates productContext. To get messages, I need to open the chat. 
    // My AccessChat returns Full Chat with messages.
    // But fetchChats is summary. 
    // I should probably have a getMessages endpoint if messages array is huge. But for MVP, I populated messages in accessChat?
    // Wait, Schema: messages array. 
    // My fetchChats does NOT populate messages fully. 
    // I will use accessChat to "select" and get full details, or simple logic: just use what I have.
    // Actually, I need to fetch the full chat to get messages if they weren't in the summary.
    // Let's assume on click I call accessChat again or just rely on the object if available. 
    // Simpler: Just rely on accessChat to return fresh chat with messages populated.

    // Correction: In Chat Controller, accessChat populates messages.sender.
    // I will call accessChat(userId) again? No, I have chatId. 
    // I'll implementing a getChatById or just re-use `api.post('/chat', { userId })` if I know the user.
    // But here I assume I click a chat list item.
    // I will just use the chat list item for now, but messages might be truncated.
    // Standard MERN chat apps separate `FetchMessages`.
    // I'll stick to a simple method: Use `accessChat` with the PARTNER ID.

    const openChat = async (chat) => {
        const partner = chat.participants.find(p => p._id !== user.id) || chat.participants[0];
        try {
            const { data } = await api.post('/chat', { userId: partner._id, productId: chat.productContext?._id });
            setSelectedChat(data);
            setMessages(data.messages || []);
            selectedChatCompare = data;
            socket.emit("join chat", data._id);
            scrollToBottom();
        } catch (error) {
            console.error(error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === "" || !selectedChat) return;

        try {
            setNewMessage("");
            const { data } = await api.post('/chat/message', {
                content: newMessage,
                chatId: selectedChat._id
            });

            socket.emit("new message", data);
            setMessages(data.messages);
            scrollToBottom();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="pt-24 text-center">Loading...</div>;
    if (!user) return <div className="pt-24 text-center">Please <a href="/login" className="text-primary hover:underline">login</a> to chat.</div>;

    return (
        <div className="pt-24 pb-4 h-screen bg-gray-50 flex px-4 gap-4 max-w-screen-xl mx-auto">
            {/* Sidebar */}
            <div className={`w-full md:w-1/3 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="font-bold text-lg">Your Chats</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => {
                        const partner = chat.participants.find(p => p._id !== user.id) || chat.participants[0];
                        return (
                            <div
                                key={chat._id}
                                onClick={() => openChat(chat)}
                                className={`p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors ${selectedChat?._id === chat._id ? 'bg-indigo-50/50' : ''}`}
                            >
                                <div className="relative">
                                    <img src={partner?.avatar || "https://ui-avatars.com/api/?name=" + (partner?.username || "User")} className="w-10 h-10 rounded-full" alt="User" />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-semibold text-gray-900 truncate">{partner?.username || "Unknown User"}</h3>
                                        <span className="text-xs text-gray-500">
                                            {/* Date */}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">
                                        {chat.lastMessage || (chat.productContext ? `Interested in ${chat.productContext.title}` : "Start chatting")}
                                    </p>
                                </div>
                                {chat.productContext && (
                                    <img src={chat.productContext.images[0] || ""} className="w-10 h-10 rounded-md object-cover bg-gray-100" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Chat Box */}
            <div className={`w-full md:w-2/3 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center shadow-sm z-10">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setSelectedChat(null)} className="md:hidden text-gray-500 p-1">
                                    Back
                                </button>
                                <img
                                    src={(selectedChat.participants.find(p => p._id !== user.id) || selectedChat.participants[0])?.avatar || "https://ui-avatars.com/api/?name="}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <h3 className="font-bold">{(selectedChat.participants.find(p => p._id !== user.id) || selectedChat.participants[0])?.username}</h3>
                                    {selectedChat.productContext && (
                                        <p className="text-xs text-primary font-medium">Re: {selectedChat.productContext.title}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 space-y-4">
                            {messages.map((m, i) => {
                                const isMe = m.sender._id === user.id;
                                return (
                                    <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${isMe ? 'bg-primary text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                                            <p>{m.content}</p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                className="flex-1 bg-gray-100 border-0 rounded-full px-6 focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button type="submit" className="p-3 bg-primary text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md">
                                <Send size={20} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <MessageCircle size={64} className="mb-4 text-gray-200" />
                        <p className="text-lg">Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
