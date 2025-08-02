import { useState } from "react";
import axios from "axios";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // NEW
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
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
      const formattedCategory = category.toLowerCase();
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(`${backendURL}/api/projects/add`, {
        title,
        description,
        category: formattedCategory,
        image: imageUrl,
        link,
      });

      if (response.status === 201) {
        setMessage("🎉 Project added successfully!");
        setTitle("");
        setDescription("");
        setImage(null);
        setCategory(""); // NEW
        setLink("");
      }
    } catch (error) {
      setMessage("❌ Error adding project. Please try again.");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-20 w-full max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Project</h2>

      {message && <p className="mb-4 text-center font-medium">{message}</p>}

      <form onSubmit={addProject} className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Category</option>
          <option value="Web">Web</option>
          {/* <option value="AI">AI</option> */}
          <option value="Data Science">Data Science</option>
        </select>
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
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
