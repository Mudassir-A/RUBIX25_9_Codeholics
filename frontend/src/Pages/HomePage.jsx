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
          <Cards
            title={"Eco score"}
            desc={"Get to know the eco score of your products"}
          />
          <Cards
            title={"Community"}
            desc={"Join Community to get more insights on sustainable shopping"}
          />
          <Cards
            title={"View Alternatives"}
            desc={"Reduce Your carbon footprint"}
          />
        </div>
      </main>
    </>
  );
}
