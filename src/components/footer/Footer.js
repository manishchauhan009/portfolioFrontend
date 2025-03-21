import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer bg-gradient-to-r from-[#2C2C2C] to-[#1E1E1E] text-[#F5F5DC] py-6 px-4 flex flex-col items-center gap-4">
      {/* Footer Text */}
      <div className="footer-text text-center">
        <p className="text-sm sm:text-base">
          Copyright &copy; {new Date().getFullYear()} by Chauhan Manish | All Rights Reserved
        </p>
      </div>

      {/* Back to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-[#50C878] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#2C2C2C] hover:text-[#50C878] hover:scale-110 flex items-center justify-center"
        >
          <FaArrowUp className="text-2xl" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
