// import React, { useEffect, useState } from "react";
// import { FiArrowUpRight } from "react-icons/fi";

// const Portfolio = () => {

//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     // Simulating fetching data from a backend API
//     const fetchProjects = async () => {
//       const backendURL = process.env.REACT_APP_BACKEND_URL;
//       try {
//         const response = await fetch(`${backendURL}/api/projects`);
//         const data = await response.json();
//         setProjects(data);
//       } catch (error) {
//         console.error("Error fetching projects:", error);

//         setProjects([
//           {
//             title: "GujaratParibhraman",
//             description: "Tour Guide Website of Gujarat",
//             image: "images/portfolio1.jpg",
//             link: "https://manishchauhan009.github.io/GujaratParibhraman/",
//           },
//           {
//             title: "My Gallery",
//             description: "Image Gallery Website",
//             image: "images/portfolio2.jpg",
//             link: "https://manishchauhan009.github.io/ImageGallery/",
//           },
//           {
//             title: "Tic Tac Toe",
//             description: "Fun Game Tic Tac Toe",
//             image: "images/portfolio3.jpg",
//             link: "https://manishchauhan009.github.io/TicTacToe/",
//           },
//           {
//             title: "Portfolio",
//             description: "Portfolio website to showcase my skills.",
//             image: "images/portfolio4.jpg",
//             link: "https://manishchauhan009.github.io/modernportfolio/",
//           },
//           {
//             title: "Food Delivery Website",
//             description: "Frontend Project of Food Delivery Website",
//             image: "images/portfolio5.jpg",
//             link: "https://manishchauhan009.github.io/FoodDeliveryWebsite/",
//           },
//         ]);
//       }
//     };

//     fetchProjects();
//   }, []);

//   return (
//     <section className="portfolio bg-gradient-to-br from-black via-gray-900 to-black py-16 px-6 sm:px-12 md:px-24 mt-0" id="portfolio">

//       <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16 tracking-wide">
//         Latest <span className="text-yellow-400 drop-shadow-lg">Projects</span>
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//         {projects.map((project, index) => (
//           <div
//             key={index}
//             className="relative group rounded-xl overflow-hidden shadow-lg bg-gray-900 bg-opacity-50 hover:shadow-2xl transition-all duration-500 backdrop-blur-md border border-gray-700"
//           >
//             {/* Project Image */}
//             <div className="relative w-full h-56 sm:h-64 overflow-hidden rounded-t-xl">
//               <img
//                 src={project.image}
//                 alt={project.title}
//                 loading="lazy"
//                 className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-500"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-500"></div>
//             </div>

//             {/* Project Details */}
//             <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 transition-all duration-500 bg-black bg-opacity-60 group-hover:bg-opacity-80">
//               <h4 className="text-lg sm:text-xl font-bold text-white drop-shadow-md line-clamp-1">
//                 {project.title}
//               </h4>
//               <p className="text-sm sm:text-base text-gray-300 mb-4 line-clamp-3">
//                 {project.description}
//               </p>
//               <a
//                 href={project.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full px-5 py-2 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105"
//               >
//                 <span>View Project</span>
//                 <FiArrowUpRight size={18} />
//               </a>
//             </div>
//           </div>
//         ))}


//       </div>
//     </section>
//   );
// };

// export default Portfolio;
import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const Portfolio = () => {
  const [webProjects, setWebProjects] = useState([]);
  const [dataScienceProjects, setDataScienceProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      try {
        const response = await fetch(`${backendURL}/api/projects`);
        const data = await response.json();

        // Filter and categorize projects
        setWebProjects(data.filter((p) => p.category === "web"));
        setDataScienceProjects(data.filter((p) => p.category === "data-science"));
      } catch (error) {
        console.error("Error fetching projects:", error);

        // Fallback hardcoded data
        const fallbackProjects = [
          {
            title: "GujaratParibhraman",
            description: "Tour Guide Website of Gujarat",
            image: "images/portfolio1.jpg",
            link: "https://manishchauhan009.github.io/GujaratParibhraman/",
            category: "web",
          },
          {
            title: "My Gallery",
            description: "Image Gallery Website",
            image: "images/portfolio2.jpg",
            link: "https://manishchauhan009.github.io/ImageGallery/",
            category: "web",
          },
          {
            title: "Tic Tac Toe",
            description: "Fun Game Tic Tac Toe",
            image: "images/portfolio3.jpg",
            link: "https://manishchauhan009.github.io/TicTacToe/",
            category: "web",
          },
          {
            title: "Portfolio",
            description: "Portfolio website to showcase my skills.",
            image: "images/portfolio4.jpg",
            link: "https://manishchauhan009.github.io/modernportfolio/",
            category: "web",
          },
          {
            title: "Food Delivery Website",
            description: "Frontend Project of Food Delivery Website",
            image: "images/portfolio5.jpg",
            link: "https://manishchauhan009.github.io/FoodDeliveryWebsite/",
            category: "web",
          },
          {
            title: "House Price Prediction",
            description: "Machine Learning model using RandomForest and GridSearchCV.",
            image: "images/ds1.jpg",
            link: "https://github.com/manishchauhan009/house_price_prediction/blob/main/Housing%20Price%20Prediction.ipynb",
            category: "data-science",
          },
        ];

        setWebProjects(fallbackProjects.filter((p) => p.category === "web"));
        setDataScienceProjects(fallbackProjects.filter((p) => p.category === "data-science"));
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

      {/* Web Development Projects */}
      <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-8 mt-10">
        💻 Web Development
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {renderProjects(webProjects)}
      </div>

      {/* Data Science Projects */}
      <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-8 mt-20">
        📊 Data Science & Machine Learning
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {renderProjects(dataScienceProjects)}
      </div>
    </section>
  );
};

export default Portfolio;
