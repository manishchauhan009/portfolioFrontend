import { Routes, Route } from "react-router-dom"; 
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
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";


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
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blogs/:id" element={<BlogDetailsPage />} />
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
