import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section
      className="about flex flex-col-reverse md:flex-row items-center justify-between bg-[#121212] min-h-screen pt-24 px-6 sm:px-12 lg:px-24"
      id="about"
    >
      {/* About Content */}
      <motion.div
        className="w-full md:w-1/2 text-center md:text-left max-w-2xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-white leading-tight">
          About <span className="text-yellow-400">Me</span>
        </h2>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-300">
          MERN Stack Developer & AI Enthusiast
        </h3>
        <p className="text-base md:text-lg text-gray-400 mb-6 leading-relaxed">
          I am a Computer Science student passionate about building innovative
          solutions using the MERN stack and AI. My focus is on solving
          real-world problems through technology and continuously upgrading my
          skills.
        </p>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/project"
            className="inline-block px-8 py-3 bg-yellow-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
          >
            Explore My Work
          </Link>
        </motion.div>
      </motion.div>

      {/* Profile Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/images/profile.png"
          loading="lazy"
          alt="Chauhan Manish - MERN Developer"
          title="Chauhan Manish - MERN Developer"
          className="max-h-[50vh] w-auto rounded-2xl shadow-xl object-cover transition-transform duration-500 hover:scale-105"
        />
      </motion.div>
    </section>
  );
};

export default About;
