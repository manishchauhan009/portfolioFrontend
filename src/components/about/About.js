// src/pages/About.js
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Link } from "react-router-dom";
import Theme from "../styles/Theme";

// pull colors from Theme
const { colors } = Theme;

const About = () => {
  const [init, setInit] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => setInit(true), []);

  return (
    <section
      id="about"
      className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 sm:px-12 lg:px-24 pt-24 pb-12 overflow-hidden"
      style={{
        background: `radial-gradient(1200px_circle_at_50%_0%,${colors.surface}_0%,${colors.base} 70%)`,
        color: colors.text,
      }}
    >
      {/* Particles */}
      {init && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="absolute inset-0 -z-10"
          options={{
            background: { color: "transparent" },
            fpsLimit: 60,
            particles: {
              number: { value: 40, density: { enable: true, area: 800 } },
              color: { value: [colors.primary, colors.secondary] },
              links: { enable: true, color: colors.secondary, opacity: 0.15, distance: 150 },
              move: { enable: true, speed: 1 },
              opacity: { value: 0.5 },
              size: { value: { min: 1, max: 3 } },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" }, resize: true },
              modes: { repulse: { distance: 100 } },
            },
          }}
        />
      )}

      {/* About Content */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 text-center md:text-left max-w-2xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
          About <span style={{ color: colors.primary }}>Me</span>
        </h2>
        <h3
          className="text-lg sm:text-xl md:text-2xl font-semibold mb-4"
          style={{ color: colors.secondary }}
        >
          MERN Stack Developer & AI | Data Science Enthusiast
        </h3>
        <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed">
          I am a Computer Science student passionate about building innovative
          solutions using the MERN stack and AI. I enjoy developing scalable web
          applications and exploring intelligent systems that make an impact.
        </p>
        <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed">
          I also actively explore the field of Data Science — working with
          Python, Pandas, NumPy, Scikit-Learn, Matplotlib, and Seaborn. I love
          uncovering insights from data and building ML models to solve
          real-world problems with a data-driven approach.
        </p>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/projects"
            className="inline-block px-8 py-3 rounded-2xl font-bold border backdrop-blur transition"
            style={{
              color: colors.primary,
              borderColor: colors.primary + "40", // semi-transparent border
              background: `linear-gradient(90deg, ${colors.primary}20, ${colors.secondary}20)`,
              boxShadow: `0 0 40px -12px ${colors.primary}73`,
            }}
          >
            Explore My Work
          </Link>
        </motion.div>
      </motion.div>

      {/* Profile Image */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-2 shadow-2xl backdrop-blur-xl">
          <img
            src="/images/profile.png"
            loading="lazy"
            alt="Chauhan Manish - MERN & Data Science Developer"
            title="Chauhan Manish - MERN & Data Science Developer"
            className="max-h-[50vh] w-auto rounded-2xl object-cover shadow-xl transition-transform duration-500 hover:scale-105"
          />
          {/* Glow bar under image */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-3 left-1/2 h-1 w-3/4 -translate-x-1/2 rounded-full opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${colors.primary}, ${colors.secondary}, transparent)`,
              filter: "blur(6px)",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default About;
