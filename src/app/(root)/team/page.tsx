import Teams from "@/components/Team/Teams";
import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Team || IIST Bihar",
};

export default function TeamPage() {
  return (
    <div className=" ">
      <Teams />
    </div>
  );
}
