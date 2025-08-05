import { Image, Send, X } from 'lucide-react';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useChatStore } from '../store/useChatStore';

const MessageInput = () => {
  const [text,setText]=useState();
  const [imagePreview,setImagePreview]=useState();
  const fileInputRef=useRef(null);
  const {sentMessage}=useChatStore();
  const HandleImageChange=(e)=>{
    const  file =e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast("Select a image");
      return;
    }
    const reader =new FileReader()
    reader.onload=()=>{
      setImagePreview(reader.result)
    }
    reader.readAsDataURL(file);
  };
  const removeImage=()=>{
    setImagePreview(null)
    if(fileInputRef.current) fileInputRef.current.value="";
  };
  const HandleMessageSend=async(e)=>{
    // console.log("enter send");
    
    e.preventDefault();
    if(!text && !imagePreview) return;
    try {
      await sentMessage({
        text:text,
        image:imagePreview
      })
       const sendSound = new Audio('/public/happy-message-ping-351298.mp3'); 
  sendSound.play()
      setText("");
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value="";
      
    } catch (error) {
      console.log("MessageInput: "+error.message);
      
    }
  }
  return (
    <div className='p-4 w-full'>
      {imagePreview&&(
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
              <img src={imagePreview} alt="Preview" className='w-20 h-20 object-cover rounded-lg border border-zinc-700' />
              <button onClick={removeImage} className='absolute -top-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center' type='button'>

                <X className='size-3'/>
              </button>
          </div>

        </div>
      )}

      <form onSubmit={HandleMessageSend} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2 '>
            <input 
            type="text" 
            className='w-full input input-bordered rounded-lg input-sm sm:input-md' placeholder='Type a message'
            value={text}
            onChange={(e)=>setText(e.target.value)} />
            <input 
            type="file"
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={HandleImageChange}
             />
             <button type='button'
             className={`hidden sm:flex btn btn-circle ${imagePreview?"text-emerald-500":"text-zinc-400"}`}
             onClick={()=>fileInputRef.current?.click()}
             >
              <Image size={20}/>

             </button>
        </div>
        <button
        type='submit'
        className='btn btn-sm btn-circle'
        disabled={!text&&!imagePreview}
        >
          <Send size={20}/>
        </button>
      </form>
    </div>
  )
}

export default MessageInput