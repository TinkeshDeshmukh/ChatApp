import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import SelectedChats from '../components/SelectedChats';

const Home = () => {
  const {selectedUser}=useChatStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-5'>
        <div className='bg-base-100 rounded-lg shadow-xl w-screen  h-[calc(100vh-7rem)]'>
          <div className='flex  h-full rounded-lg overflow-hidden'>
          <Sidebar/>
          {!selectedUser?<NoChatSelected/>:<SelectedChats/>}
          </div>

        </div>

      </div>

    </div>
  )
}

export default Home