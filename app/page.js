import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen p-4 bg-purple-900">
      {/* <Image
        src="/logo.png"
        alt="Logo"
        width={200}
        height={200}
        className="rounded-full"
      /> */}
      <h2 className=" text-6xl font-bold text-white">InterviewGenie </h2>
      <p className=" text-lg text-gray-300">
        Your AI-Powered Interview Assistant
      </p>
      <Button className="mt-4 bg-purple-600 hover:bg-purple-700 rounded-full px-10 py-6 text-lg">click here</Button>
    </div>
  );
}