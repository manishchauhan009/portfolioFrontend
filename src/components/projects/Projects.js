import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const Portfolio = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simulating fetching data from a backend API
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${backendURL}/api/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);

        setProjects([
          {
            title: "GujaratParibhraman",
            description: "Tour Guide Website of Gujarat",
            image: "images/portfolio1.jpg",
            link: "https://manishchauhan009.github.io/GujaratParibhraman/",
          },
          {
            title: "My Gallery",
            description: "Image Gallery Website",
            image: "images/portfolio2.jpg",
            link: "https://manishchauhan009.github.io/ImageGallery/",
          },
          {
            title: "Tic Tac Toe",
            description: "Fun Game Tic Tac Toe",
            image: "images/portfolio3.jpg",
            link: "https://manishchauhan009.github.io/TicTacToe/",
          },
          {
            title: "Portfolio",
            description: "Portfolio website to showcase my skills.",
            image: "images/portfolio4.jpg",
            link: "https://manishchauhan009.github.io/modernportfolio/",
          },
          {
            title: "Food Delivery Website",
            description: "Frontend Project of Food Delivery Website",
            image: "images/portfolio5.jpg",
            link: "https://manishchauhan009.github.io/FoodDeliveryWebsite/",
          },
        ]);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      className="portfolio bg-gradient-to-br from-black via-gray-900 to-black py-20 px-6 sm:px-12 md:px-24 mt-6"
      id="portfolio"
    >
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16 tracking-wide">
        Latest <span className="text-yellow-400 drop-shadow-lg">Projects</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-lg bg-gray-900 bg-opacity-50 hover:shadow-2xl transition-all duration-500 backdrop-blur-md border border-gray-700"
          >
            {/* Project Image */}
            <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-t-xl">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
              />
              {/* Subtle Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-500"></div>
            </div>

            {/* Project Details */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 transition-all duration-500 bg-black bg-opacity-60 group-hover:bg-opacity-80">
              <h4 className="text-lg sm:text-xl font-bold text-white drop-shadow-md">
                {project.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-300 mb-4">
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
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
