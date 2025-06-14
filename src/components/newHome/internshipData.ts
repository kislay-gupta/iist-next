export interface Internship {
  id: number;
  title: string;
  description: string;
  src: string;
  duration: string;
  location: string;
}

export const internships: Internship[] = [
  {
    id: 1,
    title: "Web Development Internship",
    description:
      "Experience the excitement of joining Sparkovation and working on cutting-edge web projects.",
    src: "https://www.fullstackgurupune.com/storage/blog_icons/1b94834e60fd7bc72ea07d7a9a6703de.jpeg",
    duration: "3 months",
    location: "Remote",
  },
  {
    id: 2,
    title: "IoT Engineering Collaboration",
    description:
      "Participate in collaborative projects focused on IoT and enhance your teamwork skills.",
    src: "https://www.invoxico.com/wp-content/uploads/2024/12/What-is-an-IoT-Developer-Responsible-for-1.jpg",
    duration: "2 months",
    location: "On-site",
  },
  {
    id: 6,
    title: "Cybersecurity Hacking",
    description: "Showcase your work and receive valuable feedback from peers on hacking projects.",
    src: "https://media.licdn.com/dms/image/v2/D5612AQGdZfQsKV1Wag/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1727339769347?e=2147483647&v=beta&t=c6DBTJYExNTDemCIGegbBxfad30GljZZQfamHQDtpb0",
    duration: "1 week",
    location: "Remote",
  },
  {
    id: 3,
    title: "Arduino & Embedded Systems Internship",
    description: "Stay ahead by learning and implementing new technologies in embedded systems.",
    src: "https://i.ytimg.com/vi/zJ-LqeX_fLU/maxresdefault.jpg",
    duration: "1 month",
    location: "Remote",
  },
  {
    id: 4,
    title: "Frontend Development",
    description:
      "Engage in daily stand-up meetings to track progress and resolve blockers in IoT projects.",
    src: "https://www.fullstackgurupune.com/storage/blog_icons/1b94834e60fd7bc72ea07d7a9a6703de.jpeg",
    duration: "3 months",
    location: "Hybrid",
  },
  {
    id: 5,
    title: " 3D Printing",
    description: "Contribute your ideas in team brainstorming sessions focused on 3D printing innovations.",
    src: "https://img-c.udemycdn.com/course/480x270/4346776_e126.jpg",
    duration: "2 weeks",
    location: "On-site",
  },
 
];
