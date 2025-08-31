import { useState, useEffect } from "react";
import axios from "axios";

export default function Resume() {
    const [resumeLink, setResumeLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const backendURL = process.env.REACT_APP_BACKEND_URL;


    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await axios.get(`${backendURL}/api/resume`);
                setResumeLink(res.data.data?.link || "");
            } catch (err) {
                console.error("Error fetching resume:", err);
            }
        };
        fetchResume();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.put(`${backendURL}/api/resume`, {
                link: resumeLink,
            });
            setMessage("✅ Resume link updated successfully!");
        } catch (err) {
            console.error("Error updating resume:", err);
            setMessage("❌ Failed to update resume link.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Manage Resume Link</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium">
                            Resume Link (Google Drive / Any URL)
                        </label>
                        <input
                            type="url"
                            value={resumeLink}
                            onChange={(e) => setResumeLink(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder="https://drive.google.com/..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 font-semibold transition"
                    >
                        {loading ? "Updating..." : "Save Resume Link"}
                    </button>
                </form>

                {message && <p className="mt-4 text-center text-sm">{message}</p>}
            </div>
        </div>
    );
}
