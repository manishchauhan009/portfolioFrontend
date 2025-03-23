import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Projects";
import AddProject from "./components/AddProject";
import EditProject from "./components/EditProject";
import Contacts from "./components/Contacts";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const Admin = () => {
  return (
    <Routes>
      {/* Admin Login Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="edit-project/:id" element={<EditProject />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Admin;
