import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Theme from "../styles/Theme";

const BlogDetails = () => {
  const { id } = useParams(); // blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/blogs/${id}`);
        const blogData = res.data;

        setBlog(blogData);
        setLikeCount(Array.isArray(blogData.likes) ? blogData.likes.length : 0);
        setComments(blogData.comments || []);

        // Check if current IP already liked
        const userIp = res.data.userIp || "::1"; // fallback if needed
        setLiked(blogData.likes?.includes(userIp));

        // Increment views
        axios.patch(`${backendURL}/api/blogs/${id}/views`).catch((err) => {
          console.warn("View increment failed:", err.message);
        });
      } catch (err) {
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, backendURL]);

  // Handle Like
  const handleLike = async () => {
    try {
      const res = await axios.patch(`${backendURL}/api/blogs/${id}/likes`);
      setLikeCount(res.data.likes.length || 0); // update like count
      setLiked(true);
    } catch (err) {
      console.error("Error liking blog:", err.message);
    }
  };

  // Handle Comment Submit
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`${backendURL}/api/blogs/${id}/comment`, {
        text: newComment,
        author: "Anonymous",
      });

      setComments(res.data.comments); // backend returns updated comments
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err.message);
    }
  };

  if (loading) return <p className="text-center animate-pulse text-gray-400">Loading blog...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;
  if (!blog) return <p className="text-center text-gray-400">Blog not found.</p>;

  return (
    <div
      className="p-6 md:p-10 min-h-screen"
      style={{ backgroundColor: Theme.colors.base, color: Theme.colors.text }}
    >
      {/* Back Link */}
      <Link
        to="/blogs"
        className="inline-block mb-6 text-sm font-medium hover:underline"
        style={{ color: Theme.colors.primary }}
      >
        ← Back to Blogs
      </Link>

      {/* Blog Image */}
      {blog.image?.url && (
        <img
          src={blog.image.url}
          alt={blog.title || "Blog image"}
          className="rounded-xl w-full max-h-[400px] object-cover mb-6"
        />
      )}

      {/* Blog Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: Theme.colors.secondary }}>
        {blog.title || "Untitled Blog"}
      </h1>

      {/* Author, Category, Reading Time, Views */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
        {blog.author?.name && <span>✍️ {blog.author.name}</span>}
        {blog.category && <span>📂 {blog.category}</span>}
        {blog.readingTime && <span>⏱ {blog.readingTime} min read</span>}
        {typeof blog.views === "number" && <span>👁 {blog.views} views</span>}
      </div>

      {/* Description */}
      {blog.description && (
        <p className="text-gray-400 italic mb-6">{blog.description}</p>
      )}

      {/* Content */}
      <div
        className="prose prose-invert max-w-none leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content || "" }}
      />

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs rounded-lg"
              style={{
                backgroundColor: Theme.colors.card,
                color: Theme.colors.primary,
                boxShadow: Theme.shadows.glowPrimary,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Like Button */}
      <div className="mt-6">
        <button
          onClick={handleLike}
          disabled={liked}
          className="px-4 py-2 rounded-lg font-medium flex items-center gap-2"
          style={{
            backgroundColor: liked ? Theme.colors.secondary : Theme.colors.card,
            color: liked ? "#fff" : Theme.colors.primary,
            boxShadow: Theme.shadows.glowPrimary,
          }}
        >
          👍 {likeCount} {liked ? "Liked" : "Like"}
        </button>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: Theme.colors.secondary }}>
          💬 Comments ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <p className="text-gray-400">No comments yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((c, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg"
                style={{ backgroundColor: Theme.colors.card }}
              >
                <p className="text-sm font-semibold" style={{ color: Theme.colors.primary }}>
                  {c.author || "Anonymous"}
                </p>
                <p className="text-gray-300 text-sm">{c.text}</p>
                <span className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment */}
        <form onSubmit={handleCommentSubmit} className="mt-6 flex flex-col gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-3 rounded-lg text-sm"
            style={{ backgroundColor: Theme.colors.card, color: Theme.colors.text }}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-medium self-start"
            style={{
              backgroundColor: Theme.colors.primary,
              color: "#fff",
              boxShadow: Theme.shadows.glowPrimary,
            }}
          >
            Post Comment
          </button>
        </form>
      </div>

      {/* Timestamps */}
      <p className="text-xs text-gray-500 mt-6">
        Published: {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "N/A"} | Updated:{" "}
        {blog.updatedAt ? new Date(blog.updatedAt).toLocaleDateString() : "N/A"}
      </p>
    </div>
  );
};

export default BlogDetails;
