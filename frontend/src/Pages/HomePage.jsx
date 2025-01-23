import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import Cards from "@/components/Cards";
import React from "react";

export default function HomePage() {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main>
        <Hero />
        <div className="flex p-8 mt-12 bg-primary justify-evenly">
          <Cards title={"Eco score"} desc={"describing"} content={"some content"}/>
          <Cards title={"Eco score"} desc={"describing"} content={"some content"}/>
          <Cards title={"Eco score"} desc={"describing"} content={"some content"}/>
        </div>
      </main>
    </>
  );
}
