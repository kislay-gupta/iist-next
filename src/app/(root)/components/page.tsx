import React from "react";
import { Metadata } from "next";
import { ComponentsSlider } from "@/components/sliders";
import Feature from "@/components/component/Feature";
export const metadata: Metadata = {
  title: "Components || IIST Bihar",
  description: "We're crafting beautiful components for you. Stay tuned!",
};
export default function ComponentsPage() {
  return (
    <div className="container ">
      <ComponentsSlider />
      <Feature />
    </div>
  );
}
