import { use, useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { assets } from "../assets/assets";
import Message from "./Message";

const ChatBox = () => {
  const containerRef = useRef(null);
  const { selectedChat, theme } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!prompt) return;
    setLoading(true);
    // Call your API or function to send the message
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  useEffect(() => {
   if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">
      <div ref={containerRef} className="flex-1 mb-5 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="h-full flex flex-col justify-center items-center gap-2 text-primary">
            <img
              src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
              className="w-full max-w-56 sm:max-w-68"
              alt=""
            />
            <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white">
              Ask me anything.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {loading && (
          <div className="flex items-center gap-1.5 ml-4 mb-4">
            <div className="w-1.5 h-1.5 rounded-full animate-bounce bg-gray-500 dark:bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full animate-bounce bg-gray-500 dark:bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full animate-bounce bg-gray-500 dark:bg-white"></div>
          </div>
        )}
      </div>
      <form
        className="bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#57317C]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex items-center"
        onSubmit={onSubmit}
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="text-sm outline-none bg-transparent mr-4 border-r border-gray-300 dark:border-gray-600 pr-4"
        >
          <option className="text-sm bg-white dark:bg-[#583C79]" value="text">
            Text
          </option>
          <option className="text-sm bg-white dark:bg-[#583C79]" value="image">
            Image
          </option>
        </select>
        <div className="flex flex-1 gap-2 items-center">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            type="text"
            placeholder="Type your message here..."
            className="flex-1 outline-none bg-transparent border-none border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white"
          />
          <button disabled={loading} className="flex-shrink-0">
            <img
              className="w-8 cursor-pointer hover:opacity-80 transition-opacity"
              src={loading ? assets.stop_icon : assets.send_icon}
              alt=""
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
