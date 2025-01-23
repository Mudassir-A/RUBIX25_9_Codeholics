import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <Card className="shadow-none border-0 m-8 bg-cover bg-center min-h-[600px] flex flex-row items-center">
      {/* Left side: Text and Search Bar */}
      <div className="flex flex-col items-start justify-center w-3/4 pl-8 pr-8">
        <CardHeader>
          <CardTitle className="text-3xl md:text-5xl text-left text-black font-semibold">
            Some Slogan
          </CardTitle>
          <CardDescription className="text-lg md:text-2xl text-left text-black">
            Some description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col md:flex-row gap-2 max-w-[900px] w-full rounded-3xl shadow-xl border-4 p-3 bg-white bg-opacity-60">
            <div className="w-full flex flex-row items-center">
              <Input
                placeholder="Search for something"
                className="h-[50px] w-full md:w-[400px] rounded-2xl dark:border-gray-50"
              />
            </div>
            <Button className="w-[100px] h-[50px] rounded-3xl md:ml-2 bg-primary text-secondary font-bold mt-3 md:mt-0">
              <Search className="md:w-[20px] mr-2" />
              Search
            </Button>
          </form>
        </CardContent>
      </div>

      {/* Right side: Space for Image */}
      <div className="w-1/2 bg-[url('https://t3.ftcdn.net/jpg/08/78/93/10/360_F_878931049_TRG1uGW7bukLxpfEPmojMGBHrkgdAzP2.jpg')] bg-cover bg-center min-h-[600px]"></div>
    </Card>
  );
}
