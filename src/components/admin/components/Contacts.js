import { useEffect, useState } from "react";
import axios from "axios";
import Theme from "../../styles/Theme";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/contacts`);
        setContacts(response.data);
      } catch (err) {
        setError("Failed to fetch contacts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div
      className="p-6 min-h-screen"
      style={{ backgroundColor: Theme.colors.base, color: Theme.colors.text }}
    >
      <h2
        className="text-3xl font-semibold mb-6 text-center"
        style={{ color: Theme.colors.primary }}
      >
        Contacts
      </h2>

      {loading && (
        <p className="text-center" style={{ color: Theme.colors.subtle }}>
          Loading contacts...
        </p>
      )}
      {error && (
        <p className="text-center" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="p-4 rounded-lg border transition hover:shadow-lg"
            style={{
              backgroundColor: Theme.colors.surface,
              borderColor: Theme.colors.border,
              boxShadow: Theme.shadows.glowPrimary,
            }}
          >
            <h3
              className="text-lg font-semibold"
              style={{ color: Theme.colors.primary }}
            >
              {contact.user_name}
            </h3>
            <p style={{ color: Theme.colors.subtle }}>{contact.user_phone}</p>
            <p style={{ color: Theme.colors.subtle }}>{contact.user_email}</p>
            <p
              className="mt-2 italic"
              style={{ color: Theme.colors.text }}
            >
              "{contact.message}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
