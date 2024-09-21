"use client"
import React from 'react';
import { Bell, ChevronRight, Edit, HelpCircle, Heart, LogOut, Shield, User, Users } from 'lucide-react';
import { MapPin, Send,  Home, Calendar, UserCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

interface ProfileOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  rightElement?: React.ReactNode;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({ icon, title, description, rightElement }) => (
  <div className="flex items-center p-4 border-b border-gray-200">
    <div className="mr-4 text-gray-400">{icon}</div>
    <div className="flex-grow">
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
    {rightElement}
  </div>
);

const ProfilePage = () => {
  return (
    <div className="max-w-md mx-auto bg-white h-screen flex flex-col">
      <div className="p-4 bg-gray-100">
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      <div className="flex-grow overflow-auto">
        <div className="bg-blue-600 p-4 rounded-lg m-4 flex items-center">
          <img src="https://i.pinimg.com/564x/07/55/38/075538bf5387809a568c5f496d06eb10.jpg" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
          <div className="flex-grow">
            <h2 className="text-white font-bold">Suhani</h2>
            <p className="text-blue-200">@suhani679</p>
          </div>
          <Edit className="text-white" size={20} />
        </div>

        <div className="px-4">
            <Link href="/biodata">
            <ProfileOption
            icon={<User size={20} />}
            title="My Account"
            description="Make changes to your account"
            rightElement={<>
              <div className="mr-2 text-red-500 text-xs">!</div>
              <ChevronRight size={20} className="text-gray-400" />
            </>}
          />
            </Link>
          
          <ProfileOption
            icon={<Users size={20} />}
            title="Saved Beneficiary"
            description="Manage your saved account"
            rightElement={<ChevronRight size={20} className="text-gray-400" />}
          />
          <ProfileOption
            icon={<Shield size={20} />}
            title="Face ID / Touch ID"
            description="Manage your device security"
            rightElement={<Switch />}
          />
          <ProfileOption
            icon={<Bell size={20} />}
            title="Two-Factor Authentication"
            description="Further secure your account for safety"
            rightElement={<ChevronRight size={20} className="text-gray-400" />}
          />
          <ProfileOption
            icon={<LogOut size={20} />}
            title="Log out"
            description="Further secure your account for safety"
            rightElement={<ChevronRight size={20} className="text-gray-400" />}
          />
        </div>

        <div className="px-4 mt-4">
          <h3 className="text-lg font-semibold mb-2">More</h3>
          <ProfileOption
                      icon={<HelpCircle size={20} />}
                      title="Help & Support"
                      rightElement={<ChevronRight size={20} className="text-gray-400" />} description={''}          />
          <ProfileOption
                      icon={<Heart size={20} />}
                      title="About App"
                      rightElement={<ChevronRight size={20} className="text-gray-400" />} description={''}          />
        </div>
      </div>

      <nav className="bg-white border-t border-gray-200 px-4 py-2">
        <ul className="flex justify-between">
            <Link href="/">
            <li className="flex flex-col items-center">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </li>
            </Link>
            <Link href="/maps">
            
          <li className="flex flex-col items-center">
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Visits</span>
          </li>
            </Link>
          
          <li className="flex flex-col items-center">
            <User className="w-6 h-6" />
            <span className="text-xs">Contacts</span>
          </li>
          <li className="flex flex-col items-center">
            <Users className="w-6 h-6" />
            <span className="text-xs">Friends</span>
          </li>
          <li className="flex flex-col items-center">
            <UserCircle className="w-6 h-6" />

            <Link href={'/profile'}><span className="text-xs">Profile</span></Link>
            
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProfilePage;