import React, { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaSignOutAlt,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { skillSuggestions } from "../utils/Skills";
import SkillInput from "../components/SkillInput.jsx";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Google User",
    email: "adesh.singh824@gmail.com",
    avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    about: "",
    location: "",
    website: "",
    github: "",
    twitter: "",
    linkedin: "",
  });
  const [skills, setSkills] = useState(["React", "Node.js"]); // example default

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen overflow-y-auto md:ml-0 lg:ml-80 bg-gradient-to-b from-slate-50 to-white text-gray-800">
      <div className="flex flex-col lg:flex-row gap-6 px-6 py-10 lg:px-20">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/2 bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative group w-fit mx-auto">
              <img
                src={formData.avatar || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-purple-200 shadow-md object-cover transition duration-300"
              />
              {isEditing && (
                <label
                  htmlFor="avatar"
                  className="absolute bottom-2 right-2 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-800 transition z-10"
                >
                  <FaEdit className="text-white" />
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {isEditing ? (
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-xl font-semibold text-center bg-gray-100 rounded-lg focus:outline-none mt-2"
              />
            ) : (
              <h1 className="text-xl font-semibold mt-2">{formData.name}</h1>
            )}
            <p className="text-sm text-gray-500">{formData.email}</p>
            <div className="mt-6 flex w-full gap-3">
              <button
                className="flex-1 border-2 border-gray-300 hover:border-emerald-800 shadow-md rounded-lg py-2 text-sm flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <FaSave /> : <FaEdit />}
                {isEditing ? "Save" : "Edit Profile"}
              </button>
              <button className="flex-1 bg-gradient-to-r from-emerald-400 to-teal-800 text-white rounded-lg py-2 text-sm flex items-center justify-center gap-2">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-md font-semibold mb-2">📊 Stats Overview</h3>
            <div className="space-y-3">
              <StatItem title="Active Courses" value="0" color="blue" />
              <StatItem title="Events" value="0" color="green" />
              <StatItem title="Messages" value="0" color="purple" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-1/2 space-y-6">
          <SectionCard title="📄 About">
            {isEditing ? (
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full text-gray-600 bg-gray-100 p-1 focus:outline-none"
              />
            ) : (
              <p className="text-gray-500">
                {formData.about || "No bio provided yet. Add your story!"}
              </p>
            )}
          </SectionCard>

         <SectionCard title="🎯 Skills">
            {isEditing ? (
              <SkillInput
                skills={skills}
                setSkills={setSkills}
                suggestions={skillSuggestions}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium shadow"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills listed. Add to showcase expertise!</p>
                )}
              </div>
            )}
          </SectionCard>

          <SectionCard title="📍 Contact Information">
            <ul className="space-y-2 text-gray-600">
              <li>
                <FaMapMarkerAlt className="inline mr-2" />
                {isEditing ? (
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border-b-2 focus:outline-none"
                  />
                ) : (
                  <span>{formData.location || "Add your Location"}</span>
                )}
              </li>
              <li>
                <FaGlobe className="inline mr-2" />
                {isEditing ? (
                  <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="border-b-2 focus:outline-none"
                  />
                ) : (
                  <a href={formData.website} target="_blank" rel="noreferrer">
                    {formData.website || "Add your Website"}
                  </a>
                )}
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="📣 Social Presence">
            <ul className="space-y-2 text-gray-600">
              {["github", "twitter", "linkedin"].map((field) => {
                const icons = {
                  github: <FaGithub className="inline mr-2" />,
                  twitter: <FaTwitter className="inline mr-2" />,
                  linkedin: <FaLinkedin className="inline mr-2" />,
                };
                return (
                  <li key={field}>
                    {icons[field]}
                    {isEditing ? (
                      <input
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="border-b-2 focus:outline-none"
                      />
                    ) : (
                      <a href={formData[field]} target="_blank" rel="noreferrer">
                        {formData[field] || `Connect your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </SectionCard>
        </main>
      </div>
    </div>
  );
}

const StatItem = ({ title, value, color }) => (
  <div className={`bg-${color}-100 text-${color}-700 p-3 rounded-lg text-center`}>
    <p className="text-sm font-semibold">{title}</p>
    <p className="text-lg font-bold">{value}</p>
    <p className="text-xs text-gray-500">0% vs last month</p>
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-md font-bold mb-2 text-gray-700">{title}</h2>
    {children}
  </div>
);


export default ProfilePage;
