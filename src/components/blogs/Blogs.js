import { useEffect, useState } from "react";
import axios from "axios";
import Theme from "../styles/Theme.js";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/blogs`);
        setBlogs(res.data.blogs || []); // make sure it's an array
      } catch (err) {
        setError("⚠️ Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div
      className="p-6 md:p-10 min-h-screen"
      style={{ backgroundColor: Theme.colors.base, color: Theme.colors.text }}
    >
      <h2
        className="text-3xl font-semibold text-center mb-8"
        style={{ color: Theme.colors.primary }}
      >
        📖 Blogs
      </h2>

      {error && <p className="text-center text-red-400">{error}</p>}

      {loading ? (
        <p className="text-center animate-pulse text-gray-400">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-400">No blogs available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="rounded-xl p-6 shadow-lg transition-transform hover:scale-105"
              style={{
                backgroundColor: Theme.colors.card,
                boxShadow: Theme.shadows.glowPrimary,
              }}
            >
              {/* Blog Image */}
              <img
                src={blog.image?.url || "/default-blog.png"}
                alt={blog.title}
                className="rounded-lg w-full h-40 object-cover mb-4"
              />

              {/* Blog Title */}
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: Theme.colors.secondary }}
              >
                {blog.title}
              </h3>

              {/* Blog Meta */}
              <div className="text-xs text-gray-400 mb-2 flex flex-wrap gap-2">
                <span>✍️ {blog.author?.name || "Admin"}</span>
                {blog.publishedAt && (
                  <span>📅 {new Date(blog.publishedAt).toLocaleDateString()}</span>
                )}
                <span>📂 {blog.category}</span>
              </div>

              {/* Blog Excerpt */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {blog.description}
              </p>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-lg text-xs"
                      style={{
                        backgroundColor: Theme.colors.primary,
                        color: "#fff",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Engagement */}
              <div className="flex justify-between text-xs text-gray-400 mb-3">
                <span>👀 {blog.views || 0} views</span>
                <span>❤️ {Array.isArray(blog.likes) ? blog.likes.length : 0} likes</span>
                <span>💬 {blog.comments?.length || 0} comments</span>
              </div>

              {/* Read More */}
              <Link
                to={`/blogs/${blog._id}`}
                className="inline-block px-4 py-2 rounded-lg transition-all text-sm font-medium"
                style={{
                  backgroundColor: Theme.colors.primary,
                  color: "#fff",
                  boxShadow: Theme.shadows.glowPrimary,
                }}
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
