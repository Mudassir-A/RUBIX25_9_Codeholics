import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Cards({ title, desc, content }) {
  return (
    <Card className="w-[350px] bg-white rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="bg-background">
          Explore
        </Button>
      </CardFooter>
    </Card>
  );
}
