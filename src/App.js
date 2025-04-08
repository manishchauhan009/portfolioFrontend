import React from "react";
import { Routes, Route } from "react-router-dom"; // ❌ No BrowserRouter here!
import HeaderPage from "./pages/HeaderPage";
import FooterPage from "./pages/FooterPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectPage from "./pages/ProjectPage";
import ContactPage from "./pages/ContactPage";
import SkillsPage from "./pages/SkillsPage";
import ExperiencePage from "./pages/ExperiencePage";
import Admin from "./components/admin/Admin";
import "./App.css";

const App = () => {
  return (
    <>
      <HeaderPage />
      <main className="mt-[80px]">
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/myjourney" element={<ExperiencePage />} />

          {/* Admin Panel Routes */}
      
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </main>
      <FooterPage />
    </>
  );
};

export default App;
