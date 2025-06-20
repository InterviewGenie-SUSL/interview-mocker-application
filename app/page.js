'use client';
import { Button } from "@/components/ui/button";
import { FaGithub, FaArrowRight, FaMoon, FaSun } from "react-icons/fa";
import {
  SiJavascript,
  SiPython,
  SiReact,
  SiTypescript,
  SiCplusplus,
  SiOpenjdk,
  SiRust,
  SiGoland
} from "react-icons/si";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const handleGetStartClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4"
      >
        {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
      {/* SVG Logo */}
      <svg id="logo-85" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="ccustom" fillRule="evenodd" clipRule="evenodd" d="M10 0C15.5228 0 20 4.47715 20 10V0H30C35.5228 0 40 4.47715 40 10C40 15.5228 35.5228 20 30 20C35.5228 20 40 24.4772 40 30C40 32.7423 38.8961 35.2268 37.1085 37.0334L37.0711 37.0711L37.0379 37.1041C35.2309 38.8943 32.7446 40 30 40C27.2741 40 24.8029 38.9093 22.999 37.1405C22.9756 37.1175 22.9522 37.0943 22.9289 37.0711C22.907 37.0492 22.8852 37.0272 22.8635 37.0051C21.0924 35.2009 20 32.728 20 30C20 35.5228 15.5228 40 10 40C4.47715 40 0 35.5228 0 30V20H10C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0ZM18 10C18 14.4183 14.4183 18 10 18V2C14.4183 2 18 5.58172 18 10ZM38 30C38 25.5817 34.4183 22 30 22C25.5817 22 22 25.5817 22 30H38ZM2 22V30C2 34.4183 5.58172 38 10 38C14.4183 38 18 34.4183 18 30V22H2ZM22 18V2L30 2C34.4183 2 38 5.58172 38 10C38 14.4183 34.4183 18 30 18H22Z" fill="#5417D7"></path>
      </svg>
      <h2 className="text-6xl font-bold text-gray-800">InterviewGenie</h2>
      <p className="text-lg tracking-wide text-gray-600">
        Your AI-Powered Interview Assistant
      </p>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={handleGetStartClick}
            className="mt-4 bg-[#5417d7] hover:bg-[#5417d7d2] hover:scale-105 active:scale-95 shadow-lg hover:shadow-[#5417d7]/50 transition-all duration-300 ease-in-out rounded-full px-6 py-2 text-white text-lg flex items-center gap-2"
          >
            <span className="transition-transform group-hover:translate-x-1">
              Get Start
              <FaArrowRight className="inline-block ml-2 transition-transform group-hover:translate-x-1" size={18} />
            </span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2 mt-4 text-lg text-black transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-full shadow-md hover:bg-black hover:text-white hover:scale-105 active:scale-95 hover:shadow-black/30">
            Learn More
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-6 py-2 text-lg text-black transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-full shadow-md group hover:bg-black hover:text-white hover:scale-105 active:scale-95 hover:shadow-black/30">
            <FaGithub className="transition-transform group-hover:rotate-12" size={24} />
            GitHub Resource
          </button>
          <button className="relative flex items-center gap-2 px-6 py-2 overflow-hidden text-lg text-black transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-full shadow-md hover:bg-black hover:text-white hover:scale-105 active:scale-95 hover:shadow-black/30">
            <span className="relative z-10">How it works?</span>
            <span className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-10"></span>
          </button>
        </div>
      </div>
      <div className="w-full my-10 overflow-hidden">
        <div className="flex h-16 animate-marquee">
          <div className="flex gap-8 items-center mx-4 [&>*]:text-[48px] [&>*]:transition-all [&>*]:duration-300 [&>*]:hover:scale-125 [&>*]:hover:brightness-110">
            <SiJavascript className="text-yellow-400" />
            <SiPython className="text-blue-500" />
            <SiReact className="text-cyan-400" />
            <SiTypescript className="text-blue-600" />
            <SiCplusplus className="text-purple-600" />
            <SiOpenjdk className="text-red-500" />
            <SiRust className="text-orange-600" />
            <SiGoland className="text-blue-400" />
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex gap-8 items-center mx-4 [&>*]:text-[48px] [&>*]:transition-all [&>*]:duration-300 [&>*]:hover:scale-125 [&>*]:hover:brightness-110">
            <SiJavascript className="text-yellow-400" />
            <SiPython className="text-blue-500" />
            <SiReact className="text-cyan-400" />
            <SiTypescript className="text-blue-600" />
            <SiCplusplus className="text-purple-600" />
            <SiOpenjdk className="text-red-500" />
            <SiRust className="text-orange-600" />
            <SiGoland className="text-blue-400" />
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex gap-8 items-center mx-4 [&>*]:text-[48px] [&>*]:transition-all [&>*]:duration-300 [&>*]:hover:scale-125 [&>*]:hover:brightness-110">
            <SiJavascript className="text-yellow-400" />
            <SiPython className="text-blue-500" />
            <SiReact className="text-cyan-400" />
            <SiTypescript className="text-blue-600" />
            <SiCplusplus className="text-purple-600" />
            <SiOpenjdk className="text-red-500" />
            <SiRust className="text-orange-600" />
            <SiGoland className="text-blue-400" />
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex gap-8 items-center mx-4 [&>*]:text-[48px] [&>*]:transition-all [&>*]:duration-300 [&>*]:hover:scale-125 [&>*]:hover:brightness-110">
            <SiJavascript className="text-yellow-400" />
            <SiPython className="text-blue-500" />
            <SiReact className="text-cyan-400" />
            <SiTypescript className="text-blue-600" />
            <SiCplusplus className="text-purple-600" />
            <SiOpenjdk className="text-red-500" />
            <SiRust className="text-orange-600" />
            <SiGoland className="text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
}