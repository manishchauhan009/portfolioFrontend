// import React, { useEffect, useState, useRef } from "react";
// import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
// import Typed from "typed.js";
// import axios from "axios";

// function Home() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const typedRef = useRef(null); // Reference for Typed.js

//   useEffect(() => {
//     // Fetch user data from backend
//     axios
//       .get("https://your-backend-api.com/user")
//       .then((response) => {
//         setUserData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setError("Failed to load user data");
//         setLoading(false);
//       });

//     return () => {
//       // Cleanup if Typed instance exists
//       if (typedRef.current) {
//         typedRef.current.destroy();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (userData && typedRef.current) {
//       typedRef.current = new Typed(".multiple-text", {
//         strings: ["Web Developer", "Entrepreneur", "Traveler"],
//         typeSpeed: 80,
//         backSpeed: 50,
//         backDelay: 1200,
//         loop: true,
//       });
//     }
//   }, [userData]); // Initialize after userData is loaded

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-white text-2xl">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500 text-2xl">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <section className="home flex flex-col-reverse lg:flex-row items-center justify-center w-full min-h-screen bg-gradient-to-r from-black via-gray-900 to-black px-6 sm:px-12 lg:px-20">
//       {/* Content Section */}
//       <div className="home-content text-center lg:text-left text-white py-8 lg:w-1/2">
//         <h3 className="text-3xl sm:text-4xl font-semibold mb-4 tracking-wide">
//           Hello, I'm
//         </h3>
//         <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
//           {userData?.name} <span className="text-yellow-500">{userData?.surname}</span>
//         </h1>
//         <h2 className="multiple-text text-3xl sm:text-4xl font-bold text-yellow-400 inline-block mb-4"></h2>
//         <p className="text-lg sm:text-xl mb-6 font-light text-gray-300 leading-relaxed">
//           {userData?.bio}
//         </p>

//         {/* Social Media Links */}
//         <div className="social-media flex justify-center lg:justify-start gap-6 my-6">
//           {userData?.github && (
//             <a
//               href={userData.github}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-400 transition-transform transform hover:scale-110"
//             >
//               <FaGithub className="text-4xl" />
//             </a>
//           )}
//           {userData?.instagram && (
//             <a
//               href={userData.instagram}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-400 transition-transform transform hover:scale-110"
//             >
//               <FaInstagram className="text-4xl" />
//             </a>
//           )}
//           {userData?.linkedin && (
//             <a
//               href={userData.linkedin}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-yellow-400 transition-transform transform hover:scale-110"
//             >
//               <FaLinkedin className="text-4xl" />
//             </a>
//           )}
//         </div>

//         {/* Resume Button */}
//         <a
//           href={userData?.resume}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-6 inline-block px-8 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition-all duration-300 shadow-lg transform hover:scale-105"
//         >
//           Download Resume
//         </a>
//       </div>

//       {/* Profile Image Section */}
//       <div className="home-img flex justify-center lg:justify-end w-full lg:w-1/2 lg:pr-10 mt-10 sm:mt-16 md:mt-20">
//         <img
//           src={userData?.profileImage}
//           alt={`${userData?.name} ${userData?.surname}`}
//           className="rounded-3xl shadow-xl border-4 border-yellow-400 max-w-[80%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[18rem] xl:max-w-[22rem] h-auto object-cover transition-transform duration-300 hover:scale-105"
//         />
//       </div>
//     </section>
//   );
// }

// export default Home;

import React, { useEffect, useRef } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Typed from "typed.js";

function Home() {
  const typedRef = useRef(null);

  useEffect(() => {
    typedRef.current = new Typed(".multiple-text", {
      strings: ["Web Developer", "Traveler"],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1200,
      loop: true,
    });

    return () => {
      if (typedRef.current) typedRef.current.destroy();
    };
  }, []);

  return (
    <section className="home flex flex-col-reverse lg:flex-row items-center justify-center w-full min-h-screen bg-gradient-to-r from-black via-gray-900 to-black px-6 sm:px-12 lg:px-20">
      {/* Content Section */}
      <div className="home-content text-center lg:text-left text-white py-8 lg:w-1/2">
        <h3 className="text-3xl sm:text-4xl font-semibold mb-4 tracking-wide">
          Hello, I'm
        </h3>
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
          Chauhan <span className="text-yellow-500">Manish</span>
        </h1>
        <h2 className="multiple-text text-3xl sm:text-4xl font-bold text-yellow-400 inline-block mb-4"></h2>
        <p className="text-lg sm:text-xl mb-6 font-light text-gray-300 leading-relaxed">
          Passionate Web Developer, problem solver, and tech enthusiast. I love building scalable, user-friendly applications.
        </p>

        {/* Social Media Links */}
        <div className="social-media flex justify-center lg:justify-start gap-6 my-6">
          <a
            href="https://github.com/manishchauhan009"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-transform transform hover:scale-110"
          >
            <FaGithub className="text-4xl" />
          </a>
          <a
            href="https://instagram.com/__manish__chauhan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-transform transform hover:scale-110"
          >
            <FaInstagram className="text-4xl" />
          </a>
          <a
            href="https://linkedin.com/in/manishchauhan0054"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-transform transform hover:scale-110"
          >
            <FaLinkedin className="text-4xl" />
          </a>
        </div>

        {/* Resume Button */}
        <a
          href="https://drive.google.com/file/d/1LH0-JD5hI3NGBg70KVNDHyXUm1zSuUtx/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block px-8 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition-all duration-300 shadow-lg transform hover:scale-105"
        >
          Resume
        </a>
      </div>

      {/* Profile Image Section */}
      <div className="home-img flex justify-center lg:justify-end w-full lg:w-1/2 lg:pr-10 sm:mt-16 mt-24">
        <img
          src="./images/profile.png"
          alt="John Doe"
          className="rounded-3xl shadow-xl border-4 border-yellow-400 max-w-[80%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[18rem] xl:max-w-[22rem] h-auto object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </section>
  );
}

export default Home;
