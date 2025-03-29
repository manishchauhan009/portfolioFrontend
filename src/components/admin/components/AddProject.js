import { useState } from "react";
import axios from "axios";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // ✅ Correct key


    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/portfolio/image/upload`,
        formData
      );
      return response.data.secure_url;
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
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image);
        if (!imageUrl) {
          setMessage("❌ Image upload failed. Please try again.");
          setLoading(false);
          return;
        }
      }

      const backendURL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${backendURL}/api/projects/add`, {
        title,
        description,
        image: imageUrl,
        link,
      });

      if (response.status === 201) {
        setMessage("🎉 Project added successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
        setLink("");
      }
    } catch (error) {
      setMessage("❌ Error adding project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>

      {message && <p className="mb-4 text-center font-medium">{message}</p>}

      <form onSubmit={addProject} className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Live Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProject;
