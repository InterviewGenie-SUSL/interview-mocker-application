import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaGithub, FaArrowRight } from "react-icons/fa"; // Add FaArrowRight

export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={60}
        height={60}
      />
      <h2 className=" text-6xl font-bold text-gray-800">InterviewGenie </h2>
      <p className=" text-lg text-gray-600 tracking-wide">
        Your AI-Powered Interview Assistant
      </p>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-2 ">
          <button className="mt-4 bg-[#5417d7] hover:bg-[#5417d7d2] transition-all duration-300 ease-in-out  rounded-full px-6 py-2 text-white text-lg flex items-center gap-2">
            Get Start
            <FaArrowRight size={18} />
          </button>
          <button className="mt-4 bg-white text-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out rounded-full px-6 py-2 text-lg flex items-center gap-2 border-1 border-gray-500">
            Learn More
          </button>
        </div>
        <div className="flex gap-2">
          <button className=" bg-white text-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out rounded-full px-6 py-2 text-lg flex items-center gap-2 border-1 border-gray-500">
            <FaGithub size={24} /> {/* GitHub icon */}
            GitHub Resource
          </button>
          <button className=" bg-white text-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out rounded-full px-6 py-2 text-lg flex items-center gap-2 border-1 border-gray-500">
            How it works?
          </button>
        </div>
      </div>
    </div>
  );
}