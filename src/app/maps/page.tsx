"use client";
import React, { useEffect, useState } from "react";
import { Search, X, MapPin, Navigation } from "lucide-react";
import Link from "next/link";

declare global {
  interface Window {
    initMap: () => void;
  }
}

const MapsPage = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isOrange, setIsOrange] = useState(false);


  

  useEffect(() => {
    // Get the user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);

          // Initialize the map once the latitude and longitude are obtained
          window.initMap = () => {
            const mapOptions = {
              center: { lat, lng },
              zoom: 15,
            };
            const newMap = new google.maps.Map(
              document.getElementById("map") as HTMLElement,
              mapOptions
            );
            setMap(newMap);

            // Add a marker at the user's current location
            new google.maps.Marker({
              position: { lat, lng },
              map: newMap,
              title: "Your Location",
            });
          };

          // Load the Google Maps script
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAPdZyN4RKJKbZeZ7aaVPGWuW-eUzTmOJg&callback=initMap`;
          script.defer = true;
          document.head.appendChild(script);
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden shadow-lg">
      {/* Map Container */}
      <div className="relative flex-grow ">
        {/* Google Map */}
        <div id="map" style={{ height: "100%", width: "100%" }}></div>

        {/* Top controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link href="/">
            <button className="p-2 bg-white rounded-full shadow">
              <X size={20} />
            </button>
          </Link>
          <div className="flex space-x-2">
            <button className="p-2 bg-white rounded-full shadow">
              <MapPin size={20} />
            </button>
            <button className="p-2 bg-white rounded-full shadow">
              <Navigation size={20} />
            </button>
          </div>
        </div>


        {/* yello marker  */}
        <div  className={`orangemaps ${isOrange?"block":"hidden"} h-40 w-40 transition-all duration-1000 absolute top-[35%] left-[30%] rounded-full bg-orange-300/50`}></div>

        {/* Temperature */}
        <div className="absolute bottom-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold shadow">
          16°
        </div>
      </div>

      {/* Bottom panel */}
      <div className="bg-white p-4 rounded-t-3xl -mt-4 shadow-lg">
        {/* Search bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 mt-2  mb-4">
          <Search size={20} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search Maps"
            className="bg-transparent outline-none flex-grow"
          />
          <button className="text-gray-400 font-semibold">AA</button>
        </div>

        {/* Orange Zone */}
        <div className={`${isOrange ? "block" : "hidden"}`}>
          <h3 className="text-sm font-semibold mb-2">Mark Orange Zone</h3>
          <div className="flex items-center bg-orange-100 p-3 rounded-lg">
            <div className="bg-orange-500 rounded-full p-2 mr-3">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold">Orange Zone</p>
              <p className="text-sm text-gray-600">
                This area is marked as Orange
              </p>
            </div>
          </div>
        </div>

        {/* Mark orange Zone */}
        <div className={`${isOrange ? "hidden" : "block"}`}>
          <button
            onClick={() => setIsOrange(!isOrange)}
            className="bg-orange-500/40 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Feeling Unsafe Mark it Orange
          </button>
        </div>

        {/* Siri Suggestions */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Siri Suggestions</h3>
          <div className="flex items-center bg-blue-100 p-3 rounded-lg">
            <div className="bg-blue-500 rounded-full p-2 mr-3">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold">Parked Car</p>
              <p className="text-sm text-gray-600">
                290 m away, near ulica Krasnoarmejska
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;
