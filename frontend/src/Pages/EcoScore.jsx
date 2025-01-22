import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/NavBar";
export default function EcoScore() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="flex flex-col gap-5 ml-2 p-5">
          <div className="grid grid-cols-12 grid-rows-20 gap-3">
            <div
              className="col-span-4 row-span-3 h-max shadow-md p-4 rounded-md
           bg-secondary"
              id="">
              <Label htmlFor="email">Enter Barcode</Label>
              <Input id="barcode" type="text" placeholder="Barcode" />
              Or
              <br></br>
              <Label htmlFor="email">Enter Product Name</Label>
              <Input id="prodname" type="text" placeholder="Name" />
            </div>

            <div className="col-span-8 row-span-8 shadow-md p-5 rounded-md bg-secondary ">
              Results and scores here
            </div>
            <div
              className="center flex flex-col gap-4 border rounded-md shadow-md p-4 h-max col-span-4 row-span-2 bg-secondary"
              id="TextInfo">
              <h3 className="text-accent-foreground font-medium text-3xl">
                some text
              </h3>
              Either option to upload image or product image after result
            </div>
            <div className="flex gap-2 col-span-4">
              <Button variant="outline" className="text-lg py-10 bg-secondary hover:bg-transparent">
                Check Eco Score
              </Button>
              <Button className="text-lg py-10">
                <Link to="/remediate">View Alternatives</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
