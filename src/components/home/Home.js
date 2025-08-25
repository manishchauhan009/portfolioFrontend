import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Typed from "typed.js";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Theme from "../styles/Theme";

export default function Home() {
  const typedRef = useRef(null);
  const typedElRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Typed.js
  useEffect(() => {
    if (!typedElRef.current) return;
    const typed = new Typed(typedElRef.current, {
      strings: [
        "MERN Stack Developer",
        "Data Science Enthusiast",
        "Machine Learning Explorer",
        "Web Developer",
        "Tech Optimist",
      ],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1100,
      loop: true,
    });
    typedRef.current = typed;
    return () => typed.destroy();
  }, []);

  // tsparticles init
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Spotlight effect
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const onMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const { innerWidth, innerHeight } = window;
    setSpot({ x: (e.clientX / innerWidth) * 100, y: (e.clientY / innerHeight) * 100 });
  };

  const colors = Theme.colors;

  return (
    <section
      onMouseMove={onMouseMove}
      className="relative min-h-[100svh] w-full overflow-hidden text-white"
      style={{
        minHeight: "100vh",
        background: `radial-gradient(
      1200px_circle_at_50%_0%,
      ${colors.surface} 0%,
      ${colors.base} 60%,
      #000000 100%
    )`,
      }}
    >
      {/* Layered gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-30"
        style={{
          background: `conic-gradient(from 90deg, ${colors.primary}, transparent, ${colors.secondary})`,
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(closest-side, ${colors.secondary}, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Spotlight */}
      {mounted && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(600px_circle_at_${spot.x}%_${spot.y}%, rgba(34,211,238,0.12), transparent 60%)`,
          }}
        />
      )}

      {/* Particles */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          detectRetina: true,
          particles: {
            number: { value: 50, density: { enable: true, area: 800 } },
            color: { value: [colors.primary, colors.secondary] },
            links: { enable: true, color: colors.secondary, opacity: 0.12, distance: 130 },
            move: { enable: true, speed: 0.6 },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 80, duration: 0.2 } },
          },
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-24 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-16 xl:gap-24">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: colors.primary }} />
            <p className="text-xs font-medium text-gray-300">
              Open to opportunities • Remote / On-site
            </p>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            Chauhan <span style={{ color: colors.primary }}>Manish</span>
          </h1>

          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            <span
              ref={typedElRef}
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
              }}
            />
          </h2>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">
            I build scalable, delightful web apps with the <strong>MERN</strong> stack
            and explore <strong>Data Science</strong> & <strong>ML</strong> to craft
            intelligent, real-world solutions.
          </p>

          {/* Socials */}
          <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
            <SocialIcon href="https://github.com/manishchauhan009" label="GitHub">
              <FaGithub className="text-2xl" />
            </SocialIcon>
            <SocialIcon href="https://instagram.com/__manish__chauhan" label="Instagram">
              <FaInstagram className="text-2xl" />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com/in/manishchauhan0054" label="LinkedIn">
              <FaLinkedin className="text-2xl" />
            </SocialIcon>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Tilt glareEnable glareMaxOpacity={0.35} scale={1.04} transitionSpeed={1600} gyroscope>
              <a
                href="https://drive.google.com/file/d/1LH0-JD5hI3NGBg70KVNDHyXUm1zSuUtx/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-2xl border border-cyan-300/30 bg-gradient-to-r from-cyan-400/20 to-indigo-400/10 px-6 py-3 font-semibold text-cyan-200 shadow-[0_0_40px_-12px_rgba(34,211,238,0.45)] backdrop-blur transition hover:from-cyan-400/30 hover:to-indigo-400/20"
              >
                View Resume <ArrowRight className="transition group-hover:translate-x-0.5" size={18} />
              </a>
            </Tilt>
            <a
              href="projects"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-gray-200 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
            >
              Explore Work
            </a>
          </div>
        </motion.div>

        {/* Right Profile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, rotateX: -8 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Depth rings */}
          <div className="absolute inset-0 -z-10 grid place-items-center">
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute inset-0 rounded-full border"
                  style={{
                    transform: `scale(${1 + i * 0.14})`,
                    borderColor: i % 2 === 0 ? "rgba(167,139,250,0.12)" : "rgba(34,211,238,0.12)",
                    boxShadow: i === 2 ? `0 0 60px -20px ${colors.secondary}` : "none",
                  }}
                />
              ))}
            </div>
          </div>

          <Tilt glareEnable glareMaxOpacity={0.45} scale={1.05} transitionSpeed={2200} gyroscope>
            <div
              className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-2 shadow-2xl backdrop-blur-xl"
              style={{ perspective: "1000px" }}
            >
              <img
                src="./images/profile.png"
                alt="Manish Chauhan portrait"
                loading="lazy"
                className="block h-auto w-[15rem] rounded-2xl object-cover shadow-xl sm:w-[18rem] md:w-[20rem] lg:w-[22rem]"
              />
              {/* Glow bar */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-3 left-1/2 h-1 w-3/4 -translate-x-1/2 rounded-full opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent, ${colors.primary}, ${colors.secondary}, transparent)`,
                  filter: "blur(6px)",
                }}
              />
            </div>
          </Tilt>
        </motion.div>
      </div>

      {/* Bottom grid */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 grid grid-cols-12 opacity-[0.04]">
        {Array.from({ length: 120 }).map((_, i) => (
          <div key={i} className="h-16 border-t border-white/50" />
        ))}
      </div>
    </section>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur transition hover:scale-110 hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
    >
      <span className="sr-only">{label}</span>
      <span className="text-xl text-gray-200 transition group-hover:opacity-100">
        {children}
      </span>
    </a>
  );
}
