import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Theme from "../../styles/Theme";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
  
  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/blogs`);
        // console.log("Respoonse is ",response)
        // console.log("Blog Response ",response.data.blogs)
        setBlogs(response.data.blogs);
       
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to fetch blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [backendURL]);

  // Delete Blog
  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${backendURL}/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Error deleting blog. Please try again.");
    }
  };
  console.log("data is ",blogs)
  return (
    <div
      className="p-6 md:p-10 min-h-screen"
      style={{ backgroundColor: Theme.colors.base, color: Theme.colors.text }}
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2
          className="text-3xl font-semibold"
          style={{ color: Theme.colors.primary }}
        >
          Manage Blogs
        </h2>
        <Link
          to="/admin/add-blog"
          className="mt-4 md:mt-0 px-5 py-2 rounded-lg transition-all shadow-md"
          style={{
            backgroundColor: Theme.colors.secondary,
            color: "#fff",
            boxShadow: Theme.shadows.glowSecondary,
          }}
        >
          + Add New Blog
        </Link>
      </div>

      {/* Error */}
      {error && <p style={{ color: "red" }} className="text-lg">{error}</p>}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span
            className="text-lg animate-pulse"
            style={{ color: Theme.colors.subtle }}
          >
            Loading blogs...
          </span>
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-lg" style={{ color: Theme.colors.subtle }}>
          No blogs found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="rounded-lg p-5 flex flex-col justify-between transition hover:shadow-lg"
              style={{
                backgroundColor: Theme.colors.surface,
                border: `1px solid ${Theme.colors.border}`,
              }}
            >
              {/* Blog Image */}
              {blog.image?.url && (
                <img
                  src={blog.image.url}
                  alt={blog.title || "Blog Image"}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}

              {/* Blog Details */}
              <div className="flex-1">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: Theme.colors.text }}
                >
                  {blog.title || "Untitled Blog"}
                </h3>

                <p
                  className="text-sm mb-2 line-clamp-3"
                  style={{ color: Theme.colors.subtle }}
                >
                  {blog.description || "No description available."}
                </p>

                {/* Extra attributes */}
                <div
                  className="text-xs mb-2 space-y-1"
                  style={{ color: Theme.colors.subtle }}
                >
                  <p><strong>Author:</strong> {blog.author?.name || "Unknown"}</p>
                  <p><strong>Category:</strong> {blog.category || "General"}</p>
                  <p><strong>Status:</strong> {blog.status || "Draft"}</p>
                  {blog.publishedAt && (
                    <p>
                      <strong>Published:</strong>{" "}
                      {new Date(blog.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                  {blog.tags?.length > 0 && (
                    <p><strong>Tags:</strong> {blog.tags.join(", ")}</p>
                  )}
                  <p><strong>Views:</strong> {blog.views || 0}</p>
                  <p><strong>Likes:</strong> {blog.likes?.length || 0}</p>
                  <p><strong>Comments:</strong> {blog.comments?.length || 0}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/admin/edit-blog/${blog._id}`}
                  className="px-4 py-2 rounded-lg transition-all shadow-md"
                  style={{
                    backgroundColor: Theme.colors.primary,
                    color: "#fff",
                    boxShadow: Theme.shadows.glowPrimary,
                  }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="px-4 py-2 rounded-lg transition-all shadow-md"
                  style={{
                    backgroundColor: "#dc2626", // Tailwind red-600
                    color: "#fff",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
