import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

const roadmapItems = [
  {
    type: "experience",
    title: "Web Developer Intern – Script India",
    duration: "Dec 2024 – Mar 2025",
    description: [
      "Built and maintained a Member Management System.",
      "Used Mongoose, SQL, Node.js, Express for CRUD operations.",
      "Validated forms using Formik & Yup in React.",
      "Collaborated in Agile team to improve performance.",
    ],
  },
  {
    type: "experience",
    title: "Summer Intern – MERN Stack Project",
    duration: "May – June 2024",
    description: [
      "Developed a scalable MERN web app (20% faster).",
      "Worked in a 5-member Agile team.",
      "Applied system design for robust architecture.",
    ],
  },
  {
    type: "education",
    title: "B. Tech in Computer Science & Engineering",
    duration: "2021 – Present",
    description: ["Parul Institute of Technology", "CGPA: 8.76"],
  },
  {
    type: "education",
    title: "XII (CBSE) – LG Haria Multipurpose School",
    duration: "2021",
    description: ["Percentage: 82.6%"],
  },
  {
    type: "education",
    title: "X (GSEB) – Winners English High School",
    duration: "2019",
    description: ["Percentage: 81.6%"],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="bg-[#0e0e0e] text-white min-h-screen py-20 px-6 sm:px-12 lg:px-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold text-center mb-16"
      >
        My <span className="text-yellow-400">Journey</span>
      </motion.h2>

      <div className="relative pl-8 before:absolute before:top-0 before:left-6 before:bottom-0 before:w-1 before:bg-gradient-to-b from-yellow-400 to-transparent before:animate-pulse">
        {roadmapItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="relative mb-12"
          >
            {/* Icon */}
            <div className="absolute left-[-6px] top-2 bg-yellow-500 rounded-full p-3 shadow-md animate-pulse z-10">
              {item.type === "experience" ? (
                <FaBriefcase className="text-white text-sm sm:text-base" />
              ) : (
                <FaGraduationCap className="text-white text-sm sm:text-base" />
              )}
            </div>

            {/* Card */}
            <div className="ml-10 bg-[#1b1b1b] hover:bg-[#262626] border border-yellow-900/40 p-6 rounded-xl shadow-lg backdrop-blur-md transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold mb-1 text-yellow-400">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3 italic">{item.duration}</p>
              <ul className="list-disc pl-5 text-gray-300 space-y-1 text-sm sm:text-base">
                {item.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
