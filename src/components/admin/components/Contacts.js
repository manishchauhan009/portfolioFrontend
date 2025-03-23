import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="p-6 mt-20">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Contacts
      </h2>

      {loading && <p className="text-gray-600 text-center">Loading contacts...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div key={contact._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{contact.user_name}</h3>
            <p className="text-gray-600">{contact.user_phone}</p>
            <p className="text-gray-600">{contact.user_email}</p>
            <p className="mt-2 text-gray-700 italic">"{contact.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
