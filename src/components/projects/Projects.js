import Spinner from "../spinner/Spinner";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import Theme from "../styles/Theme";

const { colors } = Theme;

const Portfolio = () => {
  const [webProjects, setWebProjects] = useState([]);
  const [dataScienceProjects, setDataScienceProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      try {
        const response = await fetch(`${backendURL}/api/projects`);
        const data = await response.json();

        setWebProjects(data.filter((p) => p.category === "web"));
        setDataScienceProjects(data.filter((p) => p.category === "data science"));
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const renderProjects = (projects) =>
    projects.map((project, index) => (
      <motion.div
        key={index}
        className="relative group rounded-xl overflow-hidden shadow-lg bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-700"
        whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{ perspective: "1000px" }}
      >
        {/* Image */}
        <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-t-xl">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-500"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 transition-all duration-500 bg-black bg-opacity-60 group-hover:bg-opacity-80">
          <h4 className="text-lg sm:text-xl font-bold drop-shadow-md line-clamp-1" style={{ color: colors.accent }}>
            {project.title}
          </h4>
          <p className="text-sm sm:text-base text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-bold rounded-full px-5 py-2 transition-all duration-300 shadow-lg transform hover:scale-105"
            style={{
              backgroundColor: colors.accent,
              color: colors.text,
            }}
          >
            <span>View Project</span>
            <FiArrowUpRight size={18} />
          </a>
        </div>
      </motion.div>
    ));

  return (
    <section
      className="portfolio bg-gradient-to-br from-black via-gray-900 to-black py-16 px-6 sm:px-12 md:px-24 mt-0"
      id="portfolio"
    >
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 tracking-wide">
        My <span style={{ color: colors.accent, textShadow: "0 0 8px rgba(34,211,238,0.7)" }}>Projects</span>
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Web Projects */}
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-8 mt-10">
            Web Development
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {renderProjects(webProjects)}
          </div>

          {/* Data Science Projects */}
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-8 mt-20">
            Data Science & Machine Learning
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {renderProjects(dataScienceProjects)}
          </div>
        </>
      )}
    </section>
  );
};

export default Portfolio;
