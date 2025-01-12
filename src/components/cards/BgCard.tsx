import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const BgCard = ({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description?: string;
  title?: string;
}) => {
  return (
    <Card className="">
      <CardHeader className="flex flex-row ">
        <CardTitle>{title}</CardTitle>

        <CardDescription className="text-xl font-bold text-black">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="">{children}</CardContent>
    </Card>
  );
};

export default BgCard;
