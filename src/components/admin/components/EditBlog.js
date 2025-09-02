import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Theme from "../../styles/Theme";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    content: "",
    category: "Other",
    tags: "",
    author: { name: "", avatar: "" },
    metaTitle: "",
    metaDescription: "",
    isPublished: false,
    image: { url: "", public_id: "" },
  });

  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch blog
  useEffect(() => {
    axios
      .get(`${backendURL}/api/blogs/${id}`)
      .then((res) => {
        const data = res.data;
        setBlogData({
          ...data,
          tags: data.tags ? data.tags.join(", ") : "",
        });
      })
      .catch(() => toast.error("❌ Failed to load blog"))
      .finally(() => setLoading(false));
  }, [id, backendURL]);

  // ✅ Cloudinary upload
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return { url: res.data.secure_url, public_id: res.data.public_id };
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error("❌ Image upload failed");
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("author.")) {
      const field = name.split(".")[1];
      setBlogData((prev) => ({
        ...prev,
        author: { ...prev.author, [field]: value },
      }));
    } else if (type === "checkbox") {
      setBlogData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setBlogData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // ✅ Submit with Cloudinary
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImage = blogData.image;

      // if a new image is chosen, upload it
      if (newImage) {
        const uploaded = await uploadImage(newImage);
        if (!uploaded) {
          setLoading(false);
          return;
        }
        uploadedImage = uploaded;
      }

      // prepare blog update payload
      const payload = {
        title: blogData.title,
        description: blogData.description,
        content: blogData.content,
        category: blogData.category,
        tags: blogData.tags
          ? blogData.tags.split(",").map((t) => t.trim())
          : [],
        author: blogData.author,
        metaTitle: blogData.metaTitle,
        metaDescription: blogData.metaDescription,
        isPublished: blogData.isPublished,
        image: uploadedImage || null, // ✅ send object
      };

      await axios.put(`${backendURL}/api/blogs/${id}`, payload);

      toast.success("✅ Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("❌ Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-400 p-6">Loading blog...</p>;
  }

  const inputStyle = {
    backgroundColor: Theme.colors.surface,
    color: Theme.colors.text,
    border: `1px solid ${Theme.colors.border}`,
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "0.95rem",
    width: "100%",
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "6px",
    color: Theme.colors.subtle,
    display: "block",
  };

  return (
    <div
      className="min-vh-100 py-5 px-3"
      style={{ backgroundColor: Theme.colors.base, color: Theme.colors.text }}
    >
      <div
        className="mx-auto p-4 shadow-lg"
        style={{
          backgroundColor: Theme.colors.surface,
          borderRadius: "16px",
          maxWidth: "850px",
        }}
      >
        <h2
          style={{
            color: Theme.colors.primary,
            fontWeight: "bold",
            textShadow: Theme.shadows.glowPrimary,
          }}
          className="mb-4 text-center"
        >
          ✏️ Edit Blog
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Title */}
          <div>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={blogData.description}
              onChange={handleChange}
              style={inputStyle}
              rows="2"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label style={labelStyle}>Content</label>
            <textarea
              name="content"
              value={blogData.content}
              onChange={handleChange}
              style={inputStyle}
              rows="6"
              required
            />
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Category</label>
              <select
                name="category"
                value={blogData.category}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="Technology">Technology</option>
                <option value="Data Science">Data Science</option>
                <option value="Web Development">Web Development</option>
                <option value="AI">AI</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Tags</label>
              <input
                type="text"
                name="tags"
                value={blogData.tags}
                onChange={handleChange}
                placeholder="e.g. React, AI"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Author Name</label>
              <input
                type="text"
                name="author.name"
                value={blogData.author.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Author Avatar URL</label>
              <input
                type="text"
                name="author.avatar"
                value={blogData.author.avatar}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* SEO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={blogData.metaTitle}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Meta Description</label>
              <textarea
                name="metaDescription"
                value={blogData.metaDescription}
                onChange={handleChange}
                style={inputStyle}
                rows="2"
              />
            </div>
          </div>

          {/* Publish */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={blogData.isPublished}
                onChange={handleChange}
                className="form-check-input"
                style={{ accentColor: Theme.colors.primary }}
              />
              <span style={{ color: Theme.colors.text }}>
                Publish this blog
              </span>
            </label>
          </div>

          {/* Image */}
          <div>
            <label style={labelStyle}>Blog Image</label>
            <input type="file" onChange={handleImageChange} style={inputStyle} />
            {blogData.image?.url && (
              <div className="mt-3">
                <img
                  src={blogData.image.url}
                  alt="Blog"
                  className="rounded-lg"
                  style={{
                    maxWidth: "200px",
                    boxShadow: Theme.shadows.glowSecondary,
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              style={{
                backgroundColor: Theme.colors.accent,
                color: "#fff",
                padding: "10px 20px",
                fontWeight: "600",
                borderRadius: "8px",
                boxShadow: Theme.shadows.glowPrimary,
              }}
            >
              ✅ Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
