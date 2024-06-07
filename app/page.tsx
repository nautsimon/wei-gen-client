"use client";
import Image from "next/image";
import Header from "./components/Header";
import SessionManager from "./components/SessionManager";
import StepsManager from "./components/StepsManager";
import SessionUID from "./components/SessionUID";
export default function Home() {
  return (
    <main className="flex flex-col h-full w-full text-black bg-gray bg-gray-100">
      <Header />
      <div className="w-3/5 mx-[20%] mb-[400px] divide-y divide-slate-900">
        <SessionUID uid ={"sss"}/>
        <SessionManager />
        <StepsManager />
      </div>
    </main>
  );
}
