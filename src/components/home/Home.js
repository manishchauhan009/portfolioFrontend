import React, { useEffect, useRef } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Typed from "typed.js";

function Home() {
  const typedRef = useRef(null);

  useEffect(() => {
    typedRef.current = new Typed(".multiple-text", {
      strings: [
        "MERN Stack Developer",
        "Data Science Enthusiast",
        "Machine Learning Explorer",
        "Web Developer",
        "Tech Optimist"
      ],
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
    <section className="home flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen w-full bg-gradient-to-tr from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] px-6 sm:px-12 lg:px-20 py-20">
      {/* Content Section */}
      <div className="home-content text-center lg:text-left text-white lg:w-1/2">
        <h3 className="text-2xl sm:text-3xl font-medium mb-4 tracking-wide">
          Hello, I'm
        </h3>
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
          Chauhan <span className="text-yellow-500">Manish</span>
        </h1>
        <h2
          className="multiple-text text-2xl sm:text-3xl font-bold text-yellow-400 inline-block mb-6 animate-fadeIn"
          aria-label="MERN Stack Developer"
        >
          MERN Stack Developer
        </h2>

        <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
          I'm passionate about building scalable web applications with the MERN stack,
          and I dive deep into data science to uncover insights and build intelligent systems.
          Whether it's full-stack development or machine learning models, I strive to solve
          real-world problems with clean, efficient code and a curious mindset.
        </p>

        {/* Social Media */}
        <div className="social-media flex justify-center lg:justify-start gap-6 mb-8">
          <a
            href="https://github.com/manishchauhan009"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-transform transform hover:scale-110"
          >
            <FaGithub className="text-3xl sm:text-4xl" />
          </a>
          <a
            href="https://instagram.com/__manish__chauhan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-transform transform hover:scale-110"
          >
            <FaInstagram className="text-3xl sm:text-4xl" />
          </a>
          <a
            href="https://linkedin.com/in/manishchauhan0054"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-transform transform hover:scale-110"
          >
            <FaLinkedin className="text-3xl sm:text-4xl" />
          </a>
        </div>

        {/* Resume Button */}
        <a
          href="https://drive.google.com/file/d/1LH0-JD5hI3NGBg70KVNDHyXUm1zSuUtx/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-yellow-500 text-white font-bold rounded-xl shadow-xl hover:bg-yellow-600 hover:shadow-yellow-500/40 transform hover:scale-105 transition duration-300"
        >
          View Resume
        </a>
      </div>

      {/* Profile Image */}
      <div className="home-img flex justify-center lg:justify-end w-full lg:w-1/2 mt-16 lg:mt-0">
        <img
          src="./images/profile.png"
          alt="Manish Chauhan"
          className="rounded-3xl object-cover md:mb-3 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[18rem] xl:w-[22rem] border-4 border-yellow-400 shadow-lg transition-transform duration-300 hover:scale-105 m-4"
        />
      </div>
    </section>
  );
}

export default Home;
