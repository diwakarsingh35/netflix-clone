import React, { useState } from "react";
import parse from "html-react-parser";
import { FaPlus, FaMinus } from "react-icons/fa";
import "../Section/Accordion.css";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      {/* Header */}
      <div
        className="accordion-title"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span className="accordion-icon">
          {isOpen ? <FaMinus /> : <FaPlus />}
        </span>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="accordion-content">
          {parse(content)}
        </div>
      )}
    </div>
  );
};

export default Accordion;
