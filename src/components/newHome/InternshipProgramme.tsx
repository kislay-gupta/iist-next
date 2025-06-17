import React from "react";
import TitleCard from "../shared/TitleCard";
import { internships } from "./internshipData";
import { FocusCards } from "../ui/focus-cards";

const InternshipProgramme = () => {
  return (
    <div className="container mx-auto  my-4 w-4/5">
      <div className="mb-8 flex justify-center">
        <TitleCard bgColor="bg-orange-600" title="Internship Programme" />
      </div>
      <div className=" ">
        <FocusCards cards={internships} />
      </div>
    </div>
  );
};

export default InternshipProgramme;
