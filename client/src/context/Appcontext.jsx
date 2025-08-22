import { createContext, use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [them, setThem] = useState(localStorage.getItem("them") || "light");

  const fetchUser = async () => {
    setUser(dummyUserData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUserchat = async () => {
    setChats(dummyChats);
    setSelectedChat(dummyChats[0]);
  };

  useEffect(() => {
    if (user) {
      fetchUserchat();
    } else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);

  useEffect(()=>{
    if(them === "dark"){
        document.documentElement.classList.add("dark")
    }else{
        document.documentElement.classList.remove("dark")
    }
  },[them])

  const value = {
    navigate,
    user,
    setUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    them,
    setThem,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
