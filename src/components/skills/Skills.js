import React from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase,
  FaGitAlt, FaPython, FaJava, FaChartLine
} from "react-icons/fa";
import {
  SiMongodb, SiTailwindcss, SiNumpy, SiPandas, SiScikitlearn,
  SiTensorflow, SiJupyter, SiAnaconda
} from "react-icons/si";
import Tilt from "react-parallax-tilt";
import Theme from "../styles/Theme";  // import theme

const { colors } = Theme;

const webSkills = [
  { name: "HTML5", icon: <FaHtml5 style={{ color: colors.accent }} /> },
  { name: "CSS3", icon: <FaCss3Alt style={{ color: colors.primary }} /> },
  { name: "JavaScript", icon: <FaJs style={{ color: colors.secondary }} /> },
  { name: "React.js", icon: <FaReact style={{ color: colors.primary }} /> },
  { name: "Node.js", icon: <FaNodeJs style={{ color: colors.accent }} /> },
  { name: "MongoDB", icon: <SiMongodb style={{ color: colors.secondary }} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: colors.primary }} /> },
  { name: "Git & GitHub", icon: <FaGitAlt style={{ color: colors.accent }} /> },
  { name: "Database Management", icon: <FaDatabase style={{ color: colors.secondary }} /> },
  { name: "Java", icon: <FaJava style={{ color: colors.accent }} /> },
];

const dataScienceSkills = [
  { name: "Python", icon: <FaPython style={{ color: colors.primary }} /> },
  { name: "NumPy", icon: <SiNumpy style={{ color: colors.secondary }} /> },
  { name: "Pandas", icon: <SiPandas style={{ color: colors.primary }} /> },
  { name: "Scikit-Learn", icon: <SiScikitlearn style={{ color: colors.secondary }} /> },
  { name: "TensorFlow", icon: <SiTensorflow style={{ color: colors.accent }} /> },
  { name: "Jupyter Notebook", icon: <SiJupyter style={{ color: colors.accent }} /> },
  { name: "Anaconda", icon: <SiAnaconda style={{ color: colors.primary }} /> },
  { name: "Seaborn", icon: <FaChartLine style={{ color: colors.secondary }} /> },
];

const Skills = () => {
  return (
    <section
      className="skills py-16 px-6 sm:px-12 md:px-20"
      id="skills"
      style={{ background: `linear-gradient(to bottom, ${colors.base}, ${colors.surface})` }}
    >
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12" style={{ color: colors.text }}>
        My <span style={{ color: colors.accent }}>Skills</span>
      </h2>

      {/* Web Skills */}
      <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center" style={{ color: colors.text }}>
        Web Development & Programming Skills
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-5xl mx-auto mb-12">
        {webSkills.map((skill, index) => (
          <Tilt
            key={index}
            glareEnable
            glareMaxOpacity={0.45}
            scale={1.05}
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            className="rounded-xl"
          >
            <div
              className="flex flex-col items-center p-6 rounded-xl shadow-lg border transition-all duration-500"
              style={{
                background: `${colors.surface}aa`,
                borderColor: colors.border,
              }}
            >
              <div className="text-4xl sm:text-5xl mb-3">{skill.icon}</div>
              <p style={{ color: colors.text }} className="text-sm sm:text-base font-semibold">{skill.name}</p>
            </div>
          </Tilt>
        ))}
      </div>

      {/* Data Science Skills */}
      <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-center" style={{ color: colors.text }}>
        Data Science
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
        {dataScienceSkills.map((skill, index) => (
          <Tilt
            key={index}
            glareEnable
            glareMaxOpacity={0.45}
            scale={1.05}
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            className="rounded-xl"
          >
            <div
              className="flex flex-col items-center p-6 rounded-xl shadow-lg border transition-all duration-500"
              style={{
                background: `${colors.surface}aa`,
                borderColor: colors.border,
              }}
            >
              <div className="text-4xl sm:text-5xl mb-3">{skill.icon}</div>
              <p style={{ color: colors.text }} className="text-sm sm:text-base font-semibold">{skill.name}</p>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
};

export default Skills;
