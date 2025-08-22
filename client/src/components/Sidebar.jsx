import { useState } from "react";
import { useAppContext } from "../context/Appcontext";
import { assets } from "../assets/assets";
import moment from "moment";

const Sidebar = ({ isMenuopen, setisMenuopen }) => {
  const { chats, setSelectedChat, theme, setTheme, user , navigate} = useAppContext();
  const [search, setSearch] = useState("");
  return (
    <div className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuopen && 'max-md:-translate-x-full'}`}>
      <img
        src={theme === "dark" ? assets.logo_full : assets.logo_full_dark}
        className="w-full max-w-48"
        alt=""
      />

      <button className="flex justify-center items-center p-2 rounded-md hover:bg-[#80609F]/30 transition-all duration-200">
      <span className="mr-2 text-xl">+</span>New Chat
      </button>

      <div className="flex items-center gap-2 p-3 mt-3 border border-gray-400 dark:border-white/20 rounded-md">
        <img src={assets.search_icon} className="w-4 not-dark:invert" alt="" />
        <input onChange={(e)=> setSearch(e.target.value)} value={search} type="text" placeholder="Seacrh Conversations" className="text-xs placeholder:text-gray-400 outline-none" />
      </div>

      {chats.length > 0 && <p className="mt-4 text-sm">Recent Chats</p> }
      <div className="flex-1 overflow-y-scroll mt-3 text-sm space-y-3">
        {
          chats.filter((chat)=> chat.messages[0] ?  chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().includes(search.toLowerCase())).map((chat)=>(
            <div  key={chat._id} className="flex items-center gap-3 p-3 mt-3 border border-gray-400 dark:border-white/20 rounded-md hover:bg-[#80609F]/30 cursor-pointer transition-all duration-200">
                             <div className="flex flex-col">
                <p className="truncate w-full">{chat.messages.length > 0 ? chat.messages[0].content.slice(0,32): chat.name }</p>
                <p className="text-xs text-gray-500 dark:text-[#B1A6C0]">{moment(chat.updatedAt).fromNow()}</p>
              </div>
              <img src={assets.bin_icon} className="hidden group-hover:block w-4 cursor-pointer not-dark:invert" alt="" />
            </div>
          ))
        }
      </div>

      <div onClick={()=> {navigate("/community")}} className="flex items-center gap-3 p-3 mt-3 border border-gray-400 dark:border-white/20 rounded-md hover:bg-[#80609F]/30 cursor-pointer transition-all duration-200">
        <img src={assets.gallery_icon} className="w-4.5 not-dark:invert" alt="" />
        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      <div onClick={()=> {navigate("/credits")}} className="flex items-center gap-3 p-3 mt-3 border border-gray-400 dark:border-white/20 rounded-md hover:bg-[#80609F]/30 cursor-pointer transition-all duration-200">
        <img src={assets.diamond_icon} className="w-4.5 dark:invert" alt="" />
        <div className="flex flex-col text-sm">
          <p>Credits : {user?.credits}</p>
          <p className="text-xs text-gray-400">Purchase credits to use</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 p-3 mt-3 border border-gray-400 dark:border-white/20 rounded-md ">
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.theme_icon} className="w-4 not-dark:invert" alt="" />
          <p>Dark Mode</p>
        </div>
        <label className="relative inline-flex cursor-pointer">
          <input onChange={() => setTheme(theme === "dark" ? "light" : "dark")} type="checkbox" className="sr-only peer" checked={
            theme === "dark"
          } />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all duration-200">
          </div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full  transition-transform  peer-checked:translate-x-4"></span>
        </label>
      </div>

       <div className="flex items-center gap-3 p-3 mt-3 border border-gray-400 dark:border-white/20 rounded-md group">
        <img src={assets.user_icon} className="w-7 rounded-full" alt="" />
         <p className="flex-1 text-sm dark:text-primary truncate">{user ? user.name : "Login your account"} </p>
         {user && <img src={assets.logout_icon} className="h-5 cursor-pointer hidden not-dark:invert group-hover:block" alt="" />}
      </div>

      <img onClick={() => setisMenuopen(false)} src={assets.close_icon} className=" absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert" alt="" />
    </div>
  );
};

export default Sidebar;
