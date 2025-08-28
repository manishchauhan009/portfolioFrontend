import { useState } from "react";
import axios from "axios";
import Theme from "../../styles/Theme";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return {
        url: response.data.secure_url,
        public_id: response.data.public_id,
      };
    } catch (error) {
      console.error("Image upload failed", error);
      return null;
    }
  };


  const addProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageData = null;
      if (image) {
        imageData = await uploadImage(image);
        if (!imageData) {
          setMessage("❌ Image upload failed. Please try again.");
          setLoading(false);
          return;
        }
      }

      const backendURL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${backendURL}/api/projects/add`, {
        title,
        description,
        category: category.toLowerCase(),
        image: imageData, // ✅ send both url + public_id
        link,
      });

      if (response.status === 201) {
        setMessage("🎉 Project added successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
        setCategory("");
        setLink("");
      }
    } catch (error) {
      setMessage("❌ Error adding project. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="p-6 mt-20 w-full max-w-screen-lg mx-auto rounded-lg shadow-lg"
      style={{
        backgroundColor: Theme.colors.surface,
        color: Theme.colors.text,
        border: `1px solid ${Theme.colors.border}`,
      }}
    >
      <h2
        className="text-2xl font-semibold mb-4 text-center"
        style={{ color: Theme.colors.primary }}
      >
        Add New Project
      </h2>

      {message && (
        <p
          className="mb-4 text-center font-medium"
          style={{
            color: message.includes("❌") ? "red" : Theme.colors.secondary,
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={addProject} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg focus:outline-none"
          style={{
            backgroundColor: Theme.colors.base,
            color: Theme.colors.text,
            border: `1px solid ${Theme.colors.border}`,
          }}
          required
        />

        {/* Description */}
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg focus:outline-none"
          style={{
            backgroundColor: Theme.colors.base,
            color: Theme.colors.text,
            border: `1px solid ${Theme.colors.border}`,
          }}
          rows="3"
          required
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-lg focus:outline-none"
          style={{
            backgroundColor: Theme.colors.base,
            color: Theme.colors.text,
            border: `1px solid ${Theme.colors.border}`,
          }}
          required
        >
          <option value="">Select Category</option>
          <option value="web">Web</option>
          <option value="data science">Data Science</option>
        </select>

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-3 rounded-lg"
          style={{
            backgroundColor: Theme.colors.base,
            color: Theme.colors.subtle,
            border: `1px solid ${Theme.colors.border}`,
          }}
          required
        />

        {/* Link */}
        <input
          type="text"
          placeholder="Live Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-3 rounded-lg focus:outline-none"
          style={{
            backgroundColor: Theme.colors.base,
            color: Theme.colors.text,
            border: `1px solid ${Theme.colors.border}`,
          }}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg font-medium transition-all shadow-md"
          style={{
            backgroundColor: Theme.colors.primary,
            color: "#fff",
            boxShadow: Theme.shadows.glowPrimary,
          }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProject;
