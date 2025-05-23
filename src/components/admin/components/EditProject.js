import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProject = () => {
  const { id } = useParams(); // Get project ID from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project details when component mounts
  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/projects/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.image);
        setLink(response.data.link);
      } catch (err) {
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Update project on form submission
  const updateProject = async (e) => {
    e.preventDefault();
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    try {
      await axios.put(`${backendURL}/api/projects/update/${id}`, {
        title,
        description,
        image,
        link,
      });
      alert("Project updated successfully!");
      navigate("/admin/projects");
    } catch (err) {
      alert("Failed to update project. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-gray-600 p-6">Loading project details...</p>;
  }
  if (error) {
    return <p className="text-red-500 p-6">{error}</p>;
  }

  return (
    <div className="p-6 mt-20 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Project</h2>
      <form onSubmit={updateProject} className="space-y-4 bg-gray-100 p-6 rounded-lg shadow-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Live Link"
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProject;
