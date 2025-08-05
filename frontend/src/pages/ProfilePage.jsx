import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, upadateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await upadateProfile({ profilepic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-gradient-to-br from-[#0f172a] to-[#1f2648] ">
      <div className="max-w-2xl mx-auto p-4 py-7 ">
        <div className="border border-sky-300 rounded-3xl p-1  ">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={
                  selectedImg ||
                  authUser.profilepic ||
                  'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
                }
                alt="Profile pic"
                className="size-32 rounded-full object-cover border-2 border-primary"
              />

              <label
                htmlFor="avatar-upload"
                className={`size-8 absolute inset-0 cursor-pointer top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:scale-105 hover:bg-opacity-55 transition-all duration-200 ${
                  isUpdatingProfile ? 'pointer-events-none' : ''
                }`}
              >
                {isUpdatingProfile ? (
                  <span className="border-2 border-white border-t-transparent rounded-full size-5 animate-spin"></span>
                ) : (
                  <Camera className="size-6 text-white" />
                )}
              </label>

              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? 'Updating...' : 'Click to change profile picture'}
            </p>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-6" />
                Full Name
              </div>
              <p className="text-lg font-semibold text-base-content">
                {authUser.fullname || 'No full name provided'}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="size-6" />
                Email Address
              </div>
              <p className="text-lg font-semibold text-base-content">
                {authUser.email || 'No email provided'}
              </p>
            </div>
          </div>

          {/* Account Info Section */}
          <div className="mt-6 bg-blue-400/10 rounded-full p-6">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span className="text-sm text-zinc-400">Member Since</span>
              <span className="text-sm text-base-content">
                {authUser.createdAt?.split('T')[0] || 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span className="text-sm text-zinc-400">Account Status</span>
              <span className="text-sm text-green-500 text-base-content">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
