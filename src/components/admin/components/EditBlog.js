import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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

  // Fetch Blog Data
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
      .catch((err) => console.error(err));
  }, [id]);

  // Handle input changes
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

  // Handle Image Upload
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Submit Update
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("content", blogData.content);
    formData.append("category", blogData.category);
    formData.append(
      "tags",
      blogData.tags
        ? blogData.tags.split(",").map(tag => tag.trim())
        : []
    );
    formData.append("authorName", blogData.author.name);
    formData.append("authorAvatar", blogData.author.avatar);
    formData.append("metaTitle", blogData.metaTitle);
    formData.append("metaDescription", blogData.metaDescription);
    formData.append("isPublished", blogData.isPublished ? "true" : "false");

    if (newImage) {
      formData.append("image", newImage);
    }

    await axios.put(`${backendURL}/api/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("✅ Blog updated successfully!");
    navigate("/admin/blogs");
  } catch (error) {
    console.error("Error updating blog:", error);
    if (error.response?.data?.errors) {
      alert(error.response.data.errors.map(e => e.msg).join(", "));
    } else {
      alert("❌ Failed to update blog");
    }
  }
};


  return (
    <div className="container mt-4">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={blogData.description}
            onChange={handleChange}
            className="form-control"
            rows="2"
            required
          />
        </div>

        {/* Content */}
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            value={blogData.content}
            onChange={handleChange}
            className="form-control"
            rows="6"
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={blogData.category}
            onChange={handleChange}
            className="form-control"
          >
            <option value="Technology">Technology</option>
            <option value="Data Science">Data Science</option>
            <option value="Web Development">Web Development</option>
            <option value="AI">AI</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <label className="form-label">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={blogData.tags}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* Author */}
        <div className="mb-3">
          <label className="form-label">Author Name</label>
          <input
            type="text"
            name="author.name"
            value={blogData.author.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author Avatar URL</label>
          <input
            type="text"
            name="author.avatar"
            value={blogData.author.avatar}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* SEO Fields */}
        <div className="mb-3">
          <label className="form-label">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={blogData.metaTitle}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Meta Description</label>
          <textarea
            name="metaDescription"
            value={blogData.metaDescription}
            onChange={handleChange}
            className="form-control"
            rows="2"
          />
        </div>

        {/* Publish Status */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="isPublished"
            checked={blogData.isPublished}
            onChange={handleChange}
            className="form-check-input"
          />
          <label className="form-check-label">Published</label>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="form-control"
          />
          {blogData.image?.url && (
            <div className="mt-2">
              <img
                src={blogData.image.url}
                alt="Blog"
                style={{ width: "120px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
