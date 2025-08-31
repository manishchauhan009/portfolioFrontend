// BlogAdd.js
import { useState } from "react";
import axios from "axios";
import Theme from "../../styles/Theme";
import { motion, AnimatePresence } from "framer-motion";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const BlogAdd = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    isPublished: false,
    image: null,
    imagePreview: null,
    authorName: "",
    authorAvatar: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  // ✅ Upload image to Cloudinary
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );
      return {
        url: res.data.secure_url,
        public_id: res.data.public_id,
      };
    } catch (err) {
      console.error("❌ Image upload failed:", err);
      return null;
    }
  };

  // ✅ Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let uploadedImage = null;
      if (formData.image) {
        uploadedImage = await uploadImage(formData.image);
        if (!uploadedImage) {
          setMessage({
            type: "error",
            text: "❌ Image upload failed. Try again.",
          });
          setLoading(false);
          return;
        }
      }

      await axios.post(`${backendURL}/api/blogs`, {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        image: uploadedImage,
        category: formData.category,
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        isPublished: formData.isPublished,
        author: {
          name: formData.authorName || "Admin",
          avatar: formData.authorAvatar || "",
        },
      });


      setMessage({ type: "success", text: "🎉 Blog added successfully!" });

      // reset form
      setFormData({
        title: "",
        description: "",
        content: "",
        category: "",
        tags: "",
        metaTitle: "",
        metaDescription: "",
        isPublished: false,
        image: null,
        imagePreview: null,
        authorName: "",
        authorAvatar: "",
      });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "❌ Failed to add blog. Try again." });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle text + checkbox input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-2xl shadow-xl max-w-4xl mx-auto backdrop-blur-lg"
      style={{
        backgroundColor: "rgba(20, 20, 20, 0.85)",
        border: `1px solid ${Theme.colors.border}`,
        color: Theme.colors.text,
      }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
        ✍️ Add New Blog
      </h2>

      {/* Feedback */}
      <AnimatePresence>
        {message && (
          <motion.p
            key="message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-center mb-4 font-medium ${message.type === "success" ? "text-green-400" : "text-red-400"
              }`}
          >
            {message.text}
          </motion.p>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="grid gap-5">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-4 rounded-lg w-full bg-gray-900 text-white"
        />

        {/* Description */}
        <input
          type="text"
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="p-4 rounded-lg w-full bg-gray-900 text-white"
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="p-4 rounded-lg w-full bg-gray-900 text-white"
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Data Science">Data Science</option>
          <option value="Web Development">Web Development</option>
          <option value="AI">AI</option>
          <option value="Other">Other</option>
        </select>

        {/* Tags */}
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="p-4 rounded-lg w-full bg-gray-900 text-white"
        />

        {/* Author Name */}
        <input
          type="text"
          name="authorName"
          placeholder="Author Name"
          value={formData.authorName}
          onChange={handleChange}
          className="p-4 rounded-lg w-full bg-gray-900 text-white"
        />

        {/* Author Avatar */}
        <input
          type="text"
          name="authorAvatar"
          placeholder="Author Avatar URL"
          value={formData.authorAvatar}
          onChange={handleChange}
          className="p-4 rounded-lg w-full bg-gray-900 text-white"
        />

        {/* Meta Title */}
        <input
          type="text"
          name="metaTitle"
          placeholder="Meta Title (SEO)"
          value={formData.metaTitle}
          onChange={handleChange}
          className="p-4 rounded-lg w-full bg-gray-900 text-white"
        />

        {/* Meta Description */}
        <textarea
          name="metaDescription"
          placeholder="Meta Description (SEO)"
          value={formData.metaDescription}
          onChange={handleChange}
          rows="3"
          className="p-4 rounded-lg w-full bg-gray-900 text-white"
        />

        {/* Content */}
        <div className="bg-gray-900 rounded-lg p-2">
          <ReactQuill
            theme="snow"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            placeholder="Write your blog content here..."
            className="text-white"
            style={{ height: "250px" }}
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-600 rounded-xl bg-gray-900 hover:border-cyan-400 transition cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="imageUpload"
          />
          <label htmlFor="imageUpload" className="cursor-pointer text-gray-300">
            {formData.imagePreview ? (
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="rounded-xl max-h-40 object-cover shadow-md"
              />
            ) : (
              "📸 Click to upload image"
            )}
          </label>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-gray-300">Publish Now</label>
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl font-semibold"
          style={{
            backgroundColor: Theme.colors.primary,
            color: "#000",
            boxShadow: Theme.shadows.glowPrimary,
          }}
        >
          {loading ? "⏳ Adding..." : "🚀 Add Blog"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BlogAdd;
