"use client";
import Header from "./components/Header";
import SessionManager from "./components/SessionManager";
import StepsManager from "./components/StepsManager";
import SessionUID from "./components/SessionUID";
import { SessionProvider } from "./context/SessionContext";

export default function Home() {
  return (
    <main className="flex flex-col h-full w-full text-black bg-gray bg-gray-100">
      <SessionProvider>
        <Header />
        <div className="w-3/5 mx-[20%] mb-[600px] divide-y divide-slate-900">
          <SessionUID />
          <SessionManager />
          <StepsManager />
        </div>
      </SessionProvider>
    </main>
  );
}
