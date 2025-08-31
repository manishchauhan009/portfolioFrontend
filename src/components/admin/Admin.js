import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import AddProject from "./components/AddProject";
import EditProject from "./components/EditProject";
import Contacts from "./components/Contacts";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogAdd from "./components/BlogAdd";
import Blogs from "./components/Blogs";
import EditBlog from "./components/EditBlog";
import Resume from "./components/Resume";

const Admin = () => {
  return (
    <Routes>
      {/* Admin Login Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="edit-project/:id" element={<EditProject />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="add-blog" element={<BlogAdd />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="resume" element={<Resume />} />
          <Route path="edit-blog/:id" element={<EditBlog />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Admin;
