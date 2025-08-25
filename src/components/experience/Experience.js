import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import Theme from "../styles/Theme";

const { colors } = Theme;

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
      className="py-20 px-4 sm:px-12 lg:px-24"
      style={{
        background: colors.base,
        color: colors.text,
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold text-center mb-20"
      >
        My <span style={{ color: colors.accent }}>Journey</span>
      </motion.h2>

      <div className="relative">
        {/* Central line */}
        <div
          className="hidden sm:block absolute w-1 left-1/2 top-0 bottom-0 transform -translate-x-1/2 opacity-20"
          style={{ background: colors.accent }}
        ></div>

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
              {/* Card with 3D Hover Effect */}
              <motion.div
                whileHover={{ rotateY: isLeft ? -8 : 8, rotateX: 4, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`w-full sm:w-1/2 px-4 sm:px-8 perspective-1000 ${
                  isLeft ? "sm:pr-16" : "sm:pl-16"
                }`}
              >
                <div
                  className="p-6 rounded-2xl border transition-shadow duration-300 group"
                  style={{
                    background: `linear-gradient(135deg, ${colors.surface}, ${colors.base})`,
                    borderColor: colors.accent + "50",
                    boxShadow: `0 10px 30px ${colors.accent}25`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      className="p-3 rounded-full shadow-lg"
                      style={{ background: colors.accent }}
                    >
                      {item.type === "experience" ? (
                        <FaBriefcase className="text-white text-lg" />
                      ) : (
                        <FaGraduationCap className="text-white text-lg" />
                      )}
                    </motion.div>
                    <h3
                      className="text-xl sm:text-2xl font-semibold"
                      style={{ color: colors.accent }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm mb-3 italic" style={{ color: colors.subtle }}>
                    {item.duration}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
                    {item.description.map((point, i) => (
                      <li key={i} style={{ color: colors.text }}>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Timeline node with Glow */}
              <div className="hidden sm:flex flex-col items-center justify-center px-4">
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      `0 0 10px ${colors.accent}`,
                      `0 0 20px ${colors.accent}`,
                      `0 0 10px ${colors.accent}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-6 rounded-full border-4"
                  style={{
                    background: colors.accent,
                    borderColor: colors.base,
                  }}
                ></motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
