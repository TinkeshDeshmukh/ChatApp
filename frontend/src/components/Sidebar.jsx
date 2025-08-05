import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Users, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import SidebarSkeleton from './skeletons/SideBarSkeleton';
import clsx from 'clsx'; // Optional, for conditional class handling

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineUsers
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className={clsx(
        'h-full transition-all duration-300 ease-in-out bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white border-r border-slate-700 shadow-xl flex flex-col',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      {/* Header */}
      <div className="border-b border-slate-700 w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-sky-400" />
          {!collapsed && (
            <span className="font-semibold text-sky-300 text-lg">Contacts</span>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-sky-400 transition"
        >
          {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* Online Toggle */}
      {!collapsed && (
        <div className="px-4 mt-1 hidden lg:flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineUsers}
              onChange={(e) => setShowOnlineUsers(e.target.checked)}
              className="checkbox checkbox-sm checkbox-info"
            />
            <span>Show Online</span>
          </label>
          <span className="text-xs text-gray-400">
            ({Math.max(0, onlineUsers.length - 1)} online)
          </span>
        </div>
      )}

      {/* User List */}
      <div className="overflow-y-auto flex-1 w-full py-3 px-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={clsx(
              'w-full flex items-center gap-3 hover:bg-slate-800 rounded-lg transition-all duration-200 p-2 lg:p-3',
              selectedUser?._id === user._id && 'bg-slate-800'
            )}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={
                  user.profilepic ||
                  'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
                }
                alt={user.fullname}
                className="size-10 object-cover rounded-full border border-slate-600"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>

            {!collapsed && (
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium truncate text-white">{user.fullname}</div>
                <div className="text-xs text-gray-400">
                  {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
