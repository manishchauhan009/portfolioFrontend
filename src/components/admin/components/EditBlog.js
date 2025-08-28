import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Theme from "../../styles/Theme";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/blogs/${id}`);
        const data = res.data;
        setTitle(data.title);
        setDescription(data.description);
        setContent(data.content);
        setImage(data.image || "");
        setImagePreview(data.image || null);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );
      return { url: res.data.secure_url, public_id: res.data.public_id };
    } catch (err) {
      console.error("Image upload failed:", err);
      return null;
    }
  };


  const deleteOldImage = async (public_id) => {
    try {
      await axios.post(`${backendURL}/api/blogs/delete-image`, { public_id });
    } catch (err) {
      console.error("Failed to delete old image:", err);
    }
  };


  const updateBlog = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let newImageObj = image; // already { url, public_id }

      // Upload new image if selected
      if (newImageFile) {
        const uploaded = await uploadImage(newImageFile);
        if (!uploaded) {
          toast.error("❌ Image upload failed.");
          setLoading(false);
          return;
        }
        newImageObj = uploaded;

        // Delete old image if exists
        if (image?.public_id) {
          await deleteOldImage(image.public_id);
        }
      }

      await axios.post(`${backendURL}/api/blogs/update/${id}`, {
        title,
        description,
        content,
        image: newImageObj,
      });

      toast.success("✅ Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("❌ Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };


  if (loading) return <p className="text-gray-400 p-6">Loading blog...</p>;
  if (error) return <p className="text-red-400 p-6">{error}</p>;

  return (
    <div
      className="p-6 mt-20 max-w-3xl mx-auto rounded-2xl shadow-lg"
      style={{
        backgroundColor: Theme.colors.base,
        color: Theme.colors.text,
      }}
    >
      <h2
        className="text-3xl font-semibold mb-6 text-center"
        style={{
          color: Theme.colors.primary,
          textShadow: Theme.shadows.glowPrimary,
        }}
      >
        📝 Edit Blog
      </h2>

      <form
        onSubmit={updateBlog}
        className="space-y-5 p-6 rounded-2xl"
        style={{
          backgroundColor: Theme.colors.surface,
          boxShadow: Theme.shadows.glowSecondary,
        }}
      >
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          required
          className="w-full p-3 rounded-lg focus:outline-none"
          style={{
            backgroundColor: Theme.colors.overlay,
            border: `1px solid ${Theme.colors.border}`,
            color: Theme.colors.text,
          }}
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Blog Short Description"
          required
          rows="3"
          className="w-full p-3 rounded-lg focus:outline-none"
          style={{
            backgroundColor: Theme.colors.overlay,
            border: `1px solid ${Theme.colors.border}`,
            color: Theme.colors.text,
          }}
        />

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Full Blog Content"
          required
          rows="6"
          className="w-full p-3 rounded-lg focus:outline-none"
          style={{
            backgroundColor: Theme.colors.overlay,
            border: `1px solid ${Theme.colors.border}`,
            color: Theme.colors.text,
          }}
        />

        {/* Image Upload with Preview */}
        <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-600 rounded-xl bg-gray-900 hover:border-cyan-400 transition cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="cursor-pointer text-gray-300">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-xl max-h-40 object-cover shadow-md"
              />
            ) : (
              "📸 Click to upload new image"
            )}
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 font-semibold rounded-lg transition-colors"
          style={{
            backgroundColor: Theme.colors.primary,
            color: "#000",
            boxShadow: Theme.shadows.glowPrimary,
          }}
        >
          {loading ? "⏳ Updating..." : "🚀 Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
