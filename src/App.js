// // import React from "react";
// // import Header from "./components/header/Header";
// // import Home from "./components/home/Home";
// // import About from "./components/about/About";
// // import Portfolio from "./components//portfolio/Portfolio";
// // import Contact from "./components/contact/Contact";
// // import Footer from "./components/footer/Footer";
// // import './App.css'

// // function App() {
// //   return (
// //     <>
// //       <Header />
// //       <Home />
// //       <About />
// //       <Portfolio />
// //       <Contact />
// //       <Footer />
// //     </>
// //   );
// // }

// // export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HeaderPage from "./pages/HeaderPage";
// import FooterPage from "./pages/FooterPage";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import ProjectPage from "./pages/ProjectPage";
// import ContactPage from "./pages/ContactPage";

// import Login from "./components/admin/components/Login";
// import Dashboard from "./components/admin/components/Dashboard";
// import Projects from "./components/admin/components/Projects";
// import Contacts from "./components/admin/components/Contacts";
// import AddProject from "./components/admin/components/AddProject";
// import EditProject from "./components/admin/components/EditProject";
// import Admin from "./components/admin/Admin"
// import "./App.css";

// function App() {
 
//   return (
//     <Router>
//       <HeaderPage /> {/* Header will remain persistent across all pages */}
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/project" element={<ProjectPage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/admin" element={<Login />} />
//         <Admin/>
//         {/* <Route path="/admin/dashboard" element={<Dashboard />} />
//         <Route path="/admin/projects" element={<Projects />} />
//         <Route path="/admin/add-project" element={<AddProject />} />
//         <Route path="/admin/edit-project/:id" element={<EditProject />} />
//         <Route path="/admin/contacts" element={<Contacts />} /> */}
//       </Routes>
//       <FooterPage /> {/* Footer will remain persistent across all pages */}
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderPage from "./pages/HeaderPage";
import FooterPage from "./pages/FooterPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectPage from "./pages/ProjectPage";
import ContactPage from "./pages/ContactPage";
import Admin from "./components/admin/Admin";
import "./App.css";

function App() {
  return (
    <Router>
      <HeaderPage /> {/* Persistent Header */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <FooterPage /> {/* Persistent Footer */}
    </Router>
  );
}

export default App;

