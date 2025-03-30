import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

const Contact = () => {
 
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validation Function
  const validateForm = () => {
    let newErrors = {};
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Validates Indian mobile numbers

    if (!nameRegex.test(formState.user_name)) {
      newErrors.user_name = "Enter a valid name (min. 3 characters)";
    }
    if (!emailRegex.test(formState.user_email)) {
      newErrors.user_email = "Enter a valid email address";
    }
    if (!phoneRegex.test(formState.user_phone)) {
      newErrors.user_phone = "Enter a valid 10-digit phone number";
    }
    if (formState.user_subject.length < 5) {
      newErrors.user_subject = "Subject should be at least 5 characters";
    }
    if (formState.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage("");

    try {
      // Send data to backend
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      await axios.post(`${backendURL}/api/contacts/submit`, formState);

      // Send email via EmailJS
      await emailjs.sendForm(
        "service_rtq35wk",
        "template_0trjcqt",
        formRef.current,
        "9sy_rMmMFo0xGWDsb"
      );

      setLoading(false);
      setSuccessMessage("Message sent successfully! We will get back to you soon.");

      // Reset form
      setFormState({
        user_name: "",
        user_email: "",
        user_phone: "",
        user_subject: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.error("Error sending message:", error);
      alert("Failed to send the message. Please try again.");
    }
  };

  return (
    <section className="contact bg-gradient-to-b from-gray-900 to-black py-16 px-6 sm:px-12 md:px-20" id="contact">
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-10">
        Contact <span className="text-yellow-400 drop-shadow-lg">Me!</span>
      </h2>

      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        autoComplete="off"
        className="max-w-2xl mx-auto bg-gray-800 bg-opacity-50 p-8 rounded-xl shadow-lg backdrop-blur-md border border-gray-700"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          <InputField name="user_name" label="Full Name" value={formState.user_name} onChange={handleInputChange} error={errors.user_name} />
          <InputField name="user_email" label="Email Address" value={formState.user_email} onChange={handleInputChange} error={errors.user_email} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <InputField name="user_phone" label="Mobile Number" value={formState.user_phone} onChange={handleInputChange} error={errors.user_phone} />
          <InputField name="user_subject" label="Email Subject" value={formState.user_subject} onChange={handleInputChange} error={errors.user_subject} />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formState.message}
            onChange={handleInputChange}
            required
            className={`w-full mt-6 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 ${
              errors.message ? "border-red-500 ring-red-500" : "focus:ring-yellow-500"
            }`}
          />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className={`w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition-all duration-300 ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:shadow-yellow-400 transform hover:scale-105"
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
};

const InputField = ({ name, label, value, onChange, error }) => (
  <div>
    <input
      type="text"
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
      required
      className={`p-3 rounded-lg bg-gray-700 text-white w-[18rem] placeholder-gray-400 outline-none focus:ring-2 ${
        error ? "border-red-500 ring-red-500" : "focus:ring-yellow-500"
      }`}
      aria-label={label}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

export default Contact;
