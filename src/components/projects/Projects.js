import Spinner from "../spinner/Spinner";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

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
        console.log(data)

        setWebProjects(data.filter((p) => p.category === "web"));
        setDataScienceProjects(data.filter((p) => p.category === "data-science"));
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
      <div
        key={index}
        className="relative group rounded-xl overflow-hidden shadow-lg bg-gray-900 bg-opacity-50 hover:shadow-2xl transition-all duration-500 backdrop-blur-md border border-gray-700"
      >
        <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-t-xl">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-500"></div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 transition-all duration-500 bg-black bg-opacity-60 group-hover:bg-opacity-80">
          <h4 className="text-lg sm:text-xl font-bold text-white drop-shadow-md line-clamp-1">
            {project.title}
          </h4>
          <p className="text-sm sm:text-base text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full px-5 py-2 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105"
          >
            <span>View Project</span>
            <FiArrowUpRight size={18} />
          </a>
        </div>
      </div>
    ));

  return (
    <section
      className="portfolio bg-gradient-to-br from-black via-gray-900 to-black py-16 px-6 sm:px-12 md:px-24 mt-0"
      id="portfolio"
    >
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16 tracking-wide">
        My <span className="text-yellow-400 drop-shadow-lg">Projects</span>
      </h2>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-8 mt-10">
            💻 Web Development
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {renderProjects(webProjects)}
          </div>

          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-8 mt-20">
            📊 Data Science & Machine Learning
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
