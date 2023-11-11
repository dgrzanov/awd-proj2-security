"use client";
import { Checkbox } from "@mui/joy";
import AppPage from "./components/AppPage";
import NavBar from "./components/NavBar";
import SqlInjection from "./components/SqlInjection";
import BadAuth from "./components/BadAuth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-700">
      <NavBar />
      <AppPage>
        <h1 className="text-2xl">Project 2 - Security</h1>
        <SqlInjection />
        <BadAuth />
      </AppPage>
    </main>
  );
}
