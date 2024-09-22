"use client"
import React, { useEffect, useState } from 'react';
import { MapPin, Send, User, Home, Calendar, Users, UserCircle } from 'lucide-react';
import Link from 'next/link';

interface AvatarProps {
  name: string;
  image: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, image }) => (
  <div className="flex flex-col items-center">
    <img src={image} alt={name} className="w-16 h-16 rounded-full" />
    <span className="mt-1 text-xs">{name}</span>
  </div>
);

export default function SaharaApp() {
  const avatars = [
    { name: 'Roshan', image: 'https://i.pinimg.com/564x/7a/87/f7/7a87f754fc4d20a85e19410ee598f321.jpg' },
    { name: 'Shaan', image: 'https://i.pinimg.com/564x/43/b4/01/43b401a63c6c71b4f94c4cbb4a3b83e2.jpg' },
    { name: 'Sarthak', image: 'https://i.pinimg.com/564x/5c/37/d9/5c37d977e014aa17fdfb7eff52b4a57e.jpg' },
    { name: 'Ayushi', image: 'https://i.pinimg.com/564x/6c/77/2d/6c772dcd658fc559b6c958270b812a1d.jpg' },
  ];
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null })
  const [isSending, setIsSending] = useState(false);
  const[isSent,setIsSent]=useState(false);


      
  interface Location {
    latitude: number | null
    longitude: number | null
}

useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            },
            (error) => {
                console.error("Error fetching location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}, []);

// Trigger OTP handling only after location state is updated
useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
        console.log("Location updated:", location);
        // handleOTP();
    }
}, [location]); // This useEffect depends on 'location'



  const handleOTP=async()=>{
    try {
        setIsSending(true);
        const res = await fetch("https://sahaara-app.vercel.app/api/otp", {
            method: "POST",
            body: JSON.stringify({location:location})
        })
        if(res.status === 200){
            // setShowOTP(true)
            setIsSent(true)
        }
        else{
            throw new Error("Please fill the details");

        }
        
    } catch (error) {
        console.error("OTP fetch error:", error);
        setIsSending(false);
        setIsSent(false);
        
    }
    // window.location.href = "https://www.figma.com/proto/VZP39Apl2495E8tnosXhVT/Untitled?node-id=4-828&node-type=canvas&t=TRZEuNX8JlSmAKgm-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4%3A828"

}

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      {/* Status Bar */}
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <span className="font-bold">9:41</span>
        <div className="flex space-x-1">
          <span className="font-bold">•••</span>
          <span className="font-bold">Wi-Fi</span>
          <span className="font-bold">100%</span>
        </div>
      </div>

      {/* Header */}
      <header className="px-4 py-2 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sahara</h1>
        <button className="rounded-full w-10 h-10 bg-gray-200 p-2">
          <span className="text-xl rounded-full">?</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl">Hi Suhani!</h2>
          <Link href="/profile">
          <img src="https://i.pinimg.com/564x/07/55/38/075538bf5387809a568c5f496d06eb10.jpg" alt="User" className="w-8 h-8 rounded-full" />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {avatars.map((avatar) => (
            <Avatar key={avatar.name} {...avatar} />
          ))}
        </div>
          <Link href="/maps">
        <div className="flex justify-end mb-8">
          <div className="flex flex-col items-center space-y-2 bg-gray-100 rounded-lg p-2">
            <MapPin className="w-6 h-6" />
            <Send className="w-6 h-6" />
          </div>
        </div>
        </Link>

        <div onClick={handleOTP} className="flex justify-center mb-8">
          <button className="w-40 h-40 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg">
            <span  className="text-white text-4xl font-bold">{isSending ? (isSent ? "Sent" : "Sending") : "SOS" }</span>
          </button>
        </div>

        <div className="flex justify-center items-center space-x-1 mb-2">
          <img src="https://i.pinimg.com/564x/6c/77/2d/6c772dcd658fc559b6c958270b812a1d.jpg" alt="Avatar 1" className="w-6 h-6 rounded-full" />
          <img src="https://i.pinimg.com/564x/5c/37/d9/5c37d977e014aa17fdfb7eff52b4a57e.jpg" alt="Avatar 2" className="w-6 h-6 rounded-full" />
          <img src="https://i.pinimg.com/564x/7a/87/f7/7a87f754fc4d20a85e19410ee598f321.jpg" alt="Avatar 3" className="w-6 h-6 rounded-full" />
          <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xs">UB</span>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600">Your SOS will be sent to nearby people</p>
      </main>

      {/* Navigation Bar */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2">
        <ul className="flex justify-between">
          <li className="flex flex-col items-center">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </li>
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
          <Link href={'/profile'}>
          <li className="flex flex-col items-center">
            <UserCircle className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}