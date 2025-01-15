import React from "react";
import { motion } from "framer-motion";
import "../assets/styles/about.css";

function AboutPage() {
  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-container">
        <h1>About Lotus</h1>
        <p>
          Welcome to Lotus 1.0, your ultimate companion for exploring Sri Lanka!
        </p>
        <p>
          Our web app is designed to help tourists discover the beauty and
          culture of Sri Lanka with ease. Here are some of the features we
          offer:
        </p>
        <ul>
          <li>
            <strong>Chatbot:</strong> Get instant answers to your questions
            about Sri Lanka. Note: The chatbot has limited tokens for now.
          </li>
          <li>
            <strong>Translator:</strong> Easily translate phrases to and from
            Sinhala and Tamil, the local languages.
          </li>
          <li>
            <strong>Currency Converter:</strong> Convert your currency to Sri
            Lankan Rupees and vice versa.
          </li>
        </ul>
        <p>
          Lotus 1.0 is currently free to use, making it accessible to all
          tourists. We hope you have a wonderful experience exploring Sri Lanka
          with our app!
        </p>
        <p className="creator">
          <strong>Created by:</strong> G.A. Pasindu Vidunitha
        </p>
      </div>
    </motion.div>
  );
}

export default AboutPage;
