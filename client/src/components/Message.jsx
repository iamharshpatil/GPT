import { assets } from "../assets/assets"
import moment from 'moment'
import { useEffect } from "react";
import Markdown from 'react-markdown';
import Prism from "prismjs";
const Message = ({ message }) => {

    useEffect(()=>{
      Prism.highlightAll();
    },[message.content])

  return (
    
    <div>
        {message.role === "user" ? (
            <div className="flex items-star justify-end my-4 gap-2">
                <div className="flex flex-col gap-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
               <p className="text-sm dark:text-primary reset-tw">{message.content}</p>
               <span className="text-xs text-gray-400 dark:text-gray-500">{moment(message.timestamp).fromNow()}</span>
                </div>
                <img src={assets.user_icon} className="w-8 h-8 rounded-full" alt="User Avatar" />
            </div>
        ) : (
            <div className="inline-flex flex-col gap-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md  ">
                {message.isImage ? <img src={message.content} alt="User Avatar" className="max-w-full rounded-md" /> : (
                    <p className="text-sm dark:text-primary reset-tw"> <Markdown>{message.content}</Markdown></p>
                )}
                <span className="text-xs text-gray-400 dark:text-gray-500">{moment(message.timestamp).fromNow()}</span>
            </div>
        )}
    </div>
  )
}

export default Message