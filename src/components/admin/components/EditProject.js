import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Theme from "../../styles/Theme";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // new file
  const [existingImage, setExistingImage] = useState(null); // existing image object
  const [loading, setLoading] = useState(true);

  // Fetch existing project
  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/projects/update/${id}`);
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setLink(data.link);
        setCategory(data.category || "");
        setExistingImage(data.image); // { url, public_id }
      } catch (err) {
        toast.error("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // Upload image to Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return { url: response.data.secure_url, public_id: response.data.public_id };
    } catch (error) {
      console.error("Image upload failed", error);
      return null;
    }
  };



const updateProject = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let updatedImage = existingImage;

    if (image) {
      const uploaded = await uploadImage(image);
      if (!uploaded) {
        toast.error("❌ Image upload failed");
        setLoading(false);
        return;
      }
      updatedImage = uploaded;
    }

    const backendURL = process.env.REACT_APP_BACKEND_URL;
    await axios.put(`${backendURL}/api/projects/update/${id}`, {
      title,
      description,
      link,
      category,
      image: updatedImage || null, // ✅ always send object or null
    });

    toast.success("✅ Project updated successfully!");
    navigate("/admin/projects");
  } catch (err) {
    console.error("Error updating project:", err);
    toast.error("❌ Failed to update project.");
  } finally {
    setLoading(false);
  }
};


  if (loading) return <p className="text-gray-400 p-6">Loading project...</p>;

  return (
    <div
      className="p-6 mt-20 max-w-3xl mx-auto rounded-2xl shadow-lg"
      style={{ backgroundColor: Theme.colors.base, color: Theme.colors.text }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-center" style={{ color: Theme.colors.primary }}>
        ✨ Edit Project
      </h2>

      <form onSubmit={updateProject} className="space-y-5 p-6 rounded-2xl">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          required
          className="w-full p-3 rounded-lg"
          style={{ backgroundColor: Theme.colors.overlay, border: `1px solid ${Theme.colors.border}` }}
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
          required
          rows="4"
          className="w-full p-3 rounded-lg"
          style={{ backgroundColor: Theme.colors.overlay, border: `1px solid ${Theme.colors.border}` }}
        />

        {/* Existing Image Preview */}
        {existingImage?.url && (
          <div className="mb-4">
            <p className="mb-2">Current Image:</p>
            <img src={existingImage.url} alt="Project" className="w-48 rounded-lg mb-2" />
          </div>
        )}

        {/* Upload New Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-3 rounded-lg"
          style={{ backgroundColor: Theme.colors.overlay, border: `1px solid ${Theme.colors.border}` }}
        />

        {/* Link */}
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Live Link"
          required
          className="w-full p-3 rounded-lg"
          style={{ backgroundColor: Theme.colors.overlay, border: `1px solid ${Theme.colors.border}` }}
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-3 rounded-lg"
          style={{ backgroundColor: Theme.colors.overlay, border: `1px solid ${Theme.colors.border}` }}
        >
          <option value="">Select Category</option>
          <option value="web">🌐 Web</option>
          <option value="data science">📊 Data Science</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="w-full px-4 py-3 font-semibold rounded-lg"
          style={{ backgroundColor: Theme.colors.primary, color: "#000" }}
        >
          🚀 Update Project
        </button>
      </form>
    </div>
  );
};

export default EditProject;
