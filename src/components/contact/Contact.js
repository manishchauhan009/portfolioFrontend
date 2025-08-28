import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import InputField from "./InputField";
import { motion } from "framer-motion";
import Theme from "../styles/Theme";

const { colors } = Theme;

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

  // Validation
  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

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

  // Input handler
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      await axios.post(`${backendURL}/api/contacts/submit`, formState);

      const response = await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        toast.success("✅ Message sent successfully! We will get back to you soon.");
        setFormState({
          user_name: "",
          user_email: "",
          user_phone: "",
          user_subject: "",
          message: "",
        });
      } else {
        throw new Error("EmailJS failed to send");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("❌ Failed to send the message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="contact py-16 px-6 sm:px-12 md:px-20"
      id="contact"
      style={{
        background: `linear-gradient(to bottom, ${colors.base}, ${colors.surface})`,
      }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: colors.surface,
            color: colors.text,
            border: `1px solid ${colors.border}`,
          },
        }}
      />

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold text-center mb-10"
        style={{ color: colors.text }}
      >
        Contact <span style={{ color: colors.accent }}>Me!</span>
      </motion.h2>

      {/* Form */}
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        autoComplete="off"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-2xl w-full mx-auto p-8 rounded-xl shadow-lg backdrop-blur-md border"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }}
      >
        {/* Name + Email */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4"
        >
          <InputField
            name="user_name"
            label="Full Name"
            value={formState.user_name}
            onChange={handleInputChange}
            error={errors.user_name}
          />
          <InputField
            name="user_email"
            label="Email Address"
            value={formState.user_email}
            onChange={handleInputChange}
            error={errors.user_email}
          />
        </motion.div>

        {/* Phone + Subject */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
        >
          <InputField
            name="user_phone"
            label="Mobile Number"
            value={formState.user_phone}
            onChange={handleInputChange}
            error={errors.user_phone}
          />
          <InputField
            name="user_subject"
            label="Email Subject"
            value={formState.user_subject}
            onChange={handleInputChange}
            error={errors.user_subject}
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <textarea
            name="message"
            placeholder="Your Message"
            value={formState.message}
            onChange={handleInputChange}
            required
            className="w-full mt-6 p-3 rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2"
            style={{
              backgroundColor: colors.base,
              borderColor: errors.message ? "red" : colors.border,
              boxShadow: errors.message
                ? "0 0 6px red"
                : `0 0 0 2px transparent`,
            }}
          />
          {errors.message && (
            <p className="text-red-400 text-xs mt-1">{errors.message}</p>
          )}
        </motion.div>

        {/* Submit Button with 3D Hover */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, rotateX: 5 }}
          whileTap={{ scale: 0.95, rotateX: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-full mt-6 font-bold py-3 rounded-lg transition-all duration-300 ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
          }`}
          style={{
            backgroundColor: colors.accent,
            color: "#fff", // better contrast
            boxShadow: loading ? "none" : `0 0 20px ${colors.accent}55`,
          }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </section>
  );
};

export default Contact;
