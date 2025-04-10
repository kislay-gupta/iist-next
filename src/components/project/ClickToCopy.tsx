"use client";
import React from "react";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

const ClickToCopy = () => {
  return (
    <>
      {" "}
      <Button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied to clipboard!");
        }}
        variant="secondary"
        size="icon"
        className="bg-white/80 backdrop-blur-sm hover:bg-white"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </>
  );
};

export default ClickToCopy;
