import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Projects = () => {

  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/projects`);
        setProjects(response.data);
      } catch (err) {
        setError("Failed to fetch projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Delete a project
  const deleteProject = async (id) => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${backendURL}/api/projects/delete/${id}`);
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
    } catch (err) {
      alert("Error deleting project. Please try again.");
    }
  };

  return (
    <div className="p-6 md:p-10 mt-20 max-w-5xl mx-auto">
      {/* 🏷️ Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">Manage Projects</h2>
        <Link
          to="/admin/add-project"
          className="mt-4 md:mt-0 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-all shadow-md"
        >
          + Add New Project
        </Link>
      </div>

      {/* ⚠️ Error Message */}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      {/* ⏳ Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="text-gray-600 text-lg animate-pulse">Loading projects...</span>
        </div>
      ) : projects.length === 0 ? (
        <p className="text-gray-600 text-center">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 flex flex-col justify-between transition hover:shadow-xl"
            >
              {/* 📌 Project Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{project.title}</h3>

              {/* 🛠️ Action Buttons */}
              <div className="flex justify-between items-center mt-auto">
                <Link
                  to={`/edit-project/${project._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-md"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProject(project._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
