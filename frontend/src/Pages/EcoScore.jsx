import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/NavBar";
import csvData from "../../../backend/data/navigator-batch-generate-6791c0a80ac9ee145da05aee-data.csv";

export default function EcoScore() {
  const [productDetails, setProductDetails] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    const foundProduct = csvData.find(
      (product) => product["Product Name"]?.toLowerCase() === searchInput.toLowerCase()
    );
    setProductDetails(foundProduct);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="p-4">
        <div className="flex flex-col gap-5 ml-2 p-5 mt-24">
          <div className="grid grid-cols-12 grid-rows-20 gap-3 ">
            <div
              className="col-span-4 row-span-3 h-max shadow-md p-4 bg-white "
              id="">
              <Label htmlFor="email">Enter Barcode</Label>
              <Input
                id="barcode"
                type="text"
                placeholder="Barcode"
                className="bg-transparent"
              />
              Or
              <br></br>
              <Label htmlFor="prodname">Enter Product Name</Label>
              <Input
                id="prodname"
                type="text"
                placeholder="Name"
                className="bg-transparent"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            <div className="col-span-8 row-span-8 shadow-md p-5 rounded-md  bg-background text-black ">
              {productDetails ? (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">{productDetails["Product Name"]}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>Carbon Footprint: {productDetails["Carbon Footprint"]}</div>
                    <div>Water Usage: {productDetails["Water Usage"]}</div>
                    <div>Packaging: {productDetails["Packaging Material"]}</div>
                    <div>Recyclability: {productDetails["Recyclability"]}/10</div>
                    <div>Ethical Sourcing: {productDetails["Ethical Sourcing"] ? "Yes" : "No"}</div>
                    <div>Made in: {productDetails["Manufacturing Location"]}</div>
                    <div>Rating: {productDetails["Sustainability Rating"]}</div>
                    <div>Popularity: {productDetails["Product Popularity"]}</div>
                  </div>
                  {productDetails["Suggested Eco Improvements"] && (
                    <div className="mt-4">
                      <h3 className="font-semibold">Suggested Improvements:</h3>
                      <p>{productDetails["Suggested Eco Improvements"]}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>Enter a product name to see eco details</div>
              )}
            </div>
            <div
              className="center flex flex-col gap-4 border rounded-md shadow-md p-4 h-max col-span-4 row-span-2 bg-white"
              id="TextInfo">
              <h3 className="text-accent-foreground font-medium text-3xl">
                some text
              </h3>
              Either option to upload image or product image after result
            </div>
            <div className="flex gap-2 col-span-4">
              <Button
                variant="outline"
                className="text-lg py-10 bg-secondary text-white hover:bg-white hover:text-secondary"
                onClick={handleSearch}
              >
                Check Eco Score
              </Button>
              <Button className="text-lg py-10 text-secondary ">
                View Alternatives
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
