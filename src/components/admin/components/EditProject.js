import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing project
  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/projects/${id}`);
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setLink(data.link);
        setCategory(data.category || "");
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const updateProject = async (e) => {
    e.preventDefault();
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    try {
      await axios.post(`${backendURL}/api/projects/update/${id}`, {
        title,
        description,
        image,
        link,
        category,
      });
      toast.success("✅ Project updated successfully!");
      navigate("/admin/projects");
    } catch (err) {
      console.error("Error updating project:", err);
      toast.error("❌ Failed to update project.");
    }
  };

  if (loading) return <p className="text-gray-600 p-6">Loading project...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;

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
          rows="4"
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          <option value="web">Web</option>
          <option value="data science">Data Science</option>
        </select>

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
