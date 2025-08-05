import { LogOut, MessageCircle, Settings, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between  bg-gray-900/85
      
    border-b-2 border-blue-300 shadow-md shadow-blue-500 text-white ">
        {/* left section */}
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold">
            <div className="flex  items-center gap-2">
              <MessageCircle
                className="size-10 text-blue-500 bg-blue-950/30 p-2 rounded-full 
             shadow-lg shadow-blue-400 
             drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] 
             hover:scale-105 transition duration-300 animate-pulse"
              />

              <h1 className="text-2xl font-sans font-medium">Chatty</h1>
            </div>
          </Link>
        </div>
        {/* Right Section */}
        <div className="flex mr-7 my-auto gap-4 text-md">
          {/* <Link to="/settings" className="flex  hover:text-blue-400 transition-colors">
            <Settings />
            <span className="ml-2">Settings</span>
          </Link> */}
          {
            authUser&& (
            <>
              <Link to="/profile" className="flex  hover:text-blue-400 transition-colors">
                <User/>
                <span className="">Profile</span>
              </Link>

              <button className="flex  hover:text-blue-400 transition-colors">
                <LogOut/>
                <span className="" onClick={logout}>Logout</span>
              </button>
              </>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Navbar;
