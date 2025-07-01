// components/SkillInput.jsx
import React, { useState } from "react";

const SkillInput = ({ skills, setSkills, suggestions }) => {
  const [inputValue, setInputValue] = useState("");

  const addSkill = (skill) => {
    if (!skills.includes(skill) && skill.trim() !== "") {
      setSkills([...skills, skill]);
    }
    setInputValue("");
  };

  const removeSkill = (index) => {
    const updated = [...skills];
    updated.splice(index, 1);
    setSkills(updated);
  };

  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(inputValue.toLowerCase()) &&
      !skills.includes(s)
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputValue.trim());
    }
  };

  return (
    <div className="w-full">
      {/* Display added skills */}
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium shadow hover:bg-emerald-200 cursor-pointer"
            onClick={() => removeSkill(i)}
          >
            {skill} ×
          </span>
        ))}
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press enter"
        className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
      />

      {/* Suggestions */}
      {inputValue && filteredSuggestions.length > 0 && (
        <ul className="bg-white border mt-2 rounded-md shadow-md max-h-40 overflow-y-auto">
          {filteredSuggestions.map((suggestion, i) => (
            <li
              key={i}
              onClick={() => addSkill(suggestion)}
              className="px-4 py-2 hover:bg-emerald-100 cursor-pointer text-sm text-gray-700"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-gray-400 mt-1">
        Click on a skill to remove it. Suggestions appear as you type.
      </p>
    </div>
  );
};

export default SkillInput;
