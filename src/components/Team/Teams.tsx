"use client";

import { TeamMember } from "@/components/cards/TeamCard";
import { motion } from "framer-motion";

const teamMembers = [
  {
    imageUrl: "https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b6e19af3075.19873218.png",
    banner: "https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b6e19af3075.19873218.png",
    name: "Anand Vijay",
    designation: "Junior Scientist",
    role: "Team Lead",
    bio: "Anand leads our team with his expertise in scientific research and project management. His innovative approach drives our projects forward.",
    
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/anandvijay/",
      twitter: "https://twitter.com/anandvijay",
      github: "https://github.com/anandvijay"
    }
  },
  {
    imageUrl: "https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b6e19af3075.19873218.png",
    banner: "https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b6e19af3075.19873218.png",
    name: "Pro. Anil Kumar",
    designation: "Junior Scientist",
    role: "Team Lead",
    bio: "Anand leads our team with his expertise in scientific research and project management. His innovative approach drives our projects forward.",
    
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/anandvijay/",
      twitter: "https://twitter.com/anandvijay",
      github: "https://github.com/anandvijay"
    }
  },
  {
    banner:"https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b625a66ea14.22850473.jpg",
    imageUrl: "https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b625a66ea14.22850473.jpg",
    name: "Krishna Kumar",
    designation: "Backend Developer",
    role: "IOT Expert",
    bio: "Krishna specializes in backend development and IoT solutions. His technical expertise ensures our systems run smoothly and efficiently.",
   
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/pushpraj/",
      github: "https://github.com/pushpraj"
    }
  },
  {
    banner:"https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b625a66ea14.22850473.jpg",
    imageUrl: "https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b625a66ea14.22850473.jpg",
    name: "Pushp raj",
    designation: "Backend Developer",
    role: "IOT Expert",
    bio: "Pushp raj specializes in backend development and IoT solutions. His technical expertise ensures our systems run smoothly and efficiently.",
    skills: ["Backend Development", "IoT", "Database Management"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/pushpraj/",
      github: "https://github.com/pushpraj"
    }
  },
  {
    banner:"https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b6edf3444f7.74385563.jpg",
    imageUrl: "https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b69cc53e321.80828341.jpg",
    name: "Kislay Gupta",
    designation: "Front-end Developer",
    role: "Mobile Developer",
    bio: "Kislay brings our designs to life with his front-end and mobile development skills. He ensures our applications are user-friendly and visually appealing.",
    skills: ["Front-end Development", "Mobile Development", "Prompt Engineering"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/kislaygupta/",
      twitter: "https://twitter.com/kissslayyy",
      github: "https://github.com/kislaygupta"
    }
  },
  {
    banner:"https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b6edf3444f7.74385563.jpg",
    imageUrl: "https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b69cc53e321.80828341.jpg",
    name: "Kislay Gupta",
    designation: "Front-end Developer",
    role: "Mobile Developer",
    bio: "Kislay brings our designs to life with his front-end and mobile development skills. He ensures our applications are user-friendly and visually appealing.",
    skills: ["Front-end Development", "Mobile Development", "Prompt Engineering"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/kislaygupta/",
      twitter: "https://twitter.com/kissslayyy",
      github: "https://github.com/kislaygupta"
    }
  },
  {
    banner:"https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b6edf3444f7.74385563.jpg",
    imageUrl: "https://api.iistbihar.com/api/uploads/HostedImages/Proj_678b69cc53e321.80828341.jpg",
    name: "Kislay Gupta",
    designation: "Front-end Developer",
    role: "Mobile Developer",
    bio: "Kislay brings our designs to life with his front-end and mobile development skills. He ensures our applications are user-friendly and visually appealing.",
    skills: ["Front-end Development", "Mobile Development", "Prompt Engineering"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/kislaygupta/",
      twitter: "https://twitter.com/kissslayyy",
      github: "https://github.com/kislaygupta"
    }
  },
];

const Teams = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our diverse team of experts brings innovation and excellence to every project.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.slice(0, 3).map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 my-4 lg:grid-cols-4 gap-6">
          {teamMembers.slice(3).map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;

