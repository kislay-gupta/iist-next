"use client";

import { TeamMember } from "@/components/cards/TeamCard";
import useLoader from "@/hooks/use-loader";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import TeamMemberSkeleton from "./TeamMemberSkeleton";
interface TeamMemberProps {
  sno: number;
  imageLink: string;
  coverImageLink?: string;
  name: string;
  designation: string;
  slug: string;
  subDesignation: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  insta?: string;
  youtube?: string;
}

const Teams = () => {
  const { isLoading, startLoading, stopLoading } = useLoader();
  const [teamMembers, setTeamMember] = useState<TeamMemberProps[] | null>(null);

  const getTeamMemberData = async () => {
    startLoading();
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}teams?req_data=getTeamMembers`,
      );
      setTeamMember(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };
  console.log(teamMembers);

  useEffect(() => {
    getTeamMemberData();
  }, []);
  if (isLoading) {
    return (
      <>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <TeamMemberSkeleton key={index} />
        ))}
      </>
    );
  }
  return (
    <section className="from-background to-background/80 cursor-pointer bg-gradient-to-b py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Our diverse team of experts brings innovation and excellence to
            every project.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers &&
            teamMembers.map((member: TeamMemberProps) => (
              <TeamMember
                key={member.sno}
                imageLink={member.imageLink}
                slug={member.slug}
                coverImageLink={member.coverImageLink}
                name={member.name}
                designation={member.designation}
                subDesignation={member.subDesignation}
                linkedin={member.linkedin}
                twitter={member.twitter}
                facebook={member.facebook}
                instagram={member.insta}
                youtube={member.youtube}
              />
            ))}
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers && teamMembers.slice(0, 3).map((member: TeamMemberProps, index: number) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 my-4 lg:grid-cols-4 gap-6">
          {teamMembers && teamMembers.slice(3).map((member: TeamMemberProps, index: number) => (
            <TeamMember key={index} {...member} />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Teams;
