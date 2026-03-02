import { ImageIcon, XIcon, Send } from "lucide-react";
import React, { useState, useRef } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";



const MessageInput = () => {
  const { playRandomKeySound } = useKeyboardSound(); 
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if(!text.trim() && !imagePreview){
      return;
    }
    if (isSoundEnabled) playRandomKeySound();

    sendMessage({text: text.trim(),image:imagePreview});
    setText("");
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
     toast.error("Please select an image file");
     return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  }
  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }
  return (
    <div className="p-4 w-full bg-[#1a2133] border-t border-slate-700/50">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-slate-600/50" />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer"
              type="button"
            >
              <XIcon className="w-3.5 h-3.5 text-slate-300" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`p-2 rounded-full sm:rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors shrink-0 ${
            imagePreview ? "text-cyan-400 bg-slate-700/50" : ""
          }`}
        >
          <ImageIcon className="w-5 cursor-pointer h-5 sm:w-6 sm:h-6" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if(isSoundEnabled) playRandomKeySound();
          }}
          placeholder="Type your message..."
          className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 text-sm sm:text-base rounded-full sm:rounded-lg px-4 py-2 sm:py-3 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-500 flex-1"
        />
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="p-2 sm:p-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 ml-1"
        >
          <Send className="w-4 cursor-pointer h-4 sm:w-5 sm:h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;