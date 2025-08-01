import React from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase,
  FaGitAlt, FaPython, FaJava, FaChartLine
} from "react-icons/fa";
import {
  SiMongodb, SiTailwindcss, SiNumpy, SiPandas, SiScikitlearn,
  SiTensorflow, SiJupyter, SiAnaconda
} from "react-icons/si";

const webSkills = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "React.js", icon: <FaReact className="text-blue-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "Git & GitHub", icon: <FaGitAlt className="text-red-500" /> },
  { name: "Database Management", icon: <FaDatabase className="text-yellow-500" /> },
  { name: "Java", icon: <FaJava className="text-red-400" /> },
];

const dataScienceSkills = [
  { name: "Python", icon: <FaPython className="text-blue-300" /> },
  { name: "NumPy", icon: <SiNumpy className="text-purple-400" /> },
  { name: "Pandas", icon: <SiPandas className="text-indigo-300" /> },
  { name: "Scikit‑Learn", icon: <SiScikitlearn className="text-yellow-300" /> },
  { name: "TensorFlow", icon: <SiTensorflow className="text-orange-400" /> },
  { name: "Jupyter Notebook", icon: <SiJupyter className="text-orange-500" /> },
  { name: "Anaconda", icon: <SiAnaconda className="text-green-400" /> },
  { name: "Seaborn", icon: <FaChartLine className="text-cyan-300" /> }, // Seaborn placeholder
];

const Skills = () => {
  return (
    <section
      className="skills bg-gradient-to-b from-black to-gray-900 py-16 px-6 sm:px-12 md:px-20"
      id="skills"
    >
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-12">
        My <span className="text-yellow-400 drop-shadow-lg">Skills</span>
      </h2>

      {/* Web Skills */}
      <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
        Web Development & Programming Skills
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-5xl mx-auto mb-12">
        {webSkills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl transition-all duration-500"
          >
            <div className="text-4xl sm:text-5xl mb-3">{skill.icon}</div>
            <p className="text-white text-sm sm:text-base font-semibold">{skill.name}</p>
          </div>
        ))}
      </div>

      {/* Data Science Skills */}
      <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
        Data Science
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
        {dataScienceSkills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl transition-all duration-500"
          >
            <div className="text-4xl sm:text-5xl mb-3">{skill.icon}</div>
            <p className="text-white text-sm sm:text-base font-semibold">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
