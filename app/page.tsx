"use client";
import Image from "next/image";
import Header from "./components/Header";
import SessionManager from "./components/SessionManager";
export default function Home() {
  return (
<main className="flex flex-col h-full w-full text-black bg-gray bg-gray-100">
  <Header />
  <div className="w-3/5 mx-[20%]">
  <SessionManager/>
  </div>
</main>

  );
}
