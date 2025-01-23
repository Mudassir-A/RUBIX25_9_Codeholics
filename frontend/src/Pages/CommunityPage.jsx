import React from "react";
import NavBar from "@/components/NavBar";
import CommunityHub from "@/components/CommunityHub";
export default function CommunityPage() {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>
        <CommunityHub />
      </main>
    </>
  );
}
