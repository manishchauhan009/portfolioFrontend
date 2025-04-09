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
      className="bg-[#0e0e0e] text-white py-20 px-4 sm:px-12 lg:px-24"
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold text-center mb-20"
      >
        My <span className="text-yellow-400">Journey</span>
      </motion.h2>

      <div className="relative">
        <div className="hidden sm:block absolute w-1 bg-yellow-500 left-1/2 top-0 bottom-0 transform -translate-x-1/2 opacity-20"></div>

        {roadmapItems.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`mb-16 flex flex-col sm:flex-row items-center ${
                isLeft ? "sm:justify-start" : "sm:justify-end"
              }`}
            >
              <div
                className={`w-full sm:w-1/2 px-4 sm:px-8 ${
                  isLeft ? "sm:pr-16" : "sm:pl-16"
                }`}
              >
                <div className="bg-gradient-to-br from-[#1b1b1b] to-[#252525] p-6 rounded-2xl border border-yellow-900/30 shadow-[0_0_20px_-4px_rgba(234,179,8,0.3)] hover:shadow-yellow-500/20 transition-shadow duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-yellow-500 p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {item.type === "experience" ? (
                        <FaBriefcase className="text-white text-lg" />
                      ) : (
                        <FaGraduationCap className="text-white text-lg" />
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3 italic">
                    {item.duration}
                  </p>
                  <ul className="list-disc pl-5 text-gray-300 space-y-1 text-sm sm:text-base">
                    {item.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Timeline node */}
              <div className="hidden sm:flex flex-col items-center justify-center px-4">
                <div className="w-5 h-5 bg-yellow-500 rounded-full border-4 border-[#0e0e0e] shadow-lg animate-pulse"></div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
