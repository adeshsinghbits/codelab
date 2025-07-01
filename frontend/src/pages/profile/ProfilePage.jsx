import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutThunk } from "../../features/auth/authThunk.js";
import { saveUserThunk, uploadPicThunk } from "../../features/user/userThunk.js";
import toast from "react-hot-toast";
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
import { skillSuggestions } from "../../utils/Skills.js";
import SkillInput from "./SkillInput.jsx";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    picture: "",
    about: "",
    location: "",
    portfolioLink: "",
    githubLink: "",
    twitterLink: "",
    linkedinLink: "",
    skillsProficientAt: [],
    websiteLink: "",
  });
  const [skills, setSkills] = useState([]);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user.skills);
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        picture: user.picture || "",
        about: user.about || "",
        location: user.location || "",
        portfolioLink: user.portfolioLink || "",
        githubLink: user.githubLink || "",
        twitterLink: user.twitterLink || "",
        linkedinLink: user.linkedinLink || "",
        skills: user.skills || [],
        websiteLink: user.website || "",
      });
      setSkills(user.skills || []);
    }
  }, [user]);



  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      dispatch(uploadPicThunk(file)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setFormData((prev) => ({
            ...prev,
            picture: res.payload.url,
          }));
          toast.success("Picture uploaded successfully");
        } else {
          toast.error(res.error.message);
        }
      });
    }
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      skills: skills,
    };
    dispatch(saveUserThunk(updatedData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsEditing(false);
        toast.success("User details saved successfully");
      }  else {
        toast.error(res.error.message);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const Createdate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const Updatedate = new Date(user.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen overflow-y-auto md:ml-0 lg:ml-80 bg-gradient-to-b from-slate-50 to-white text-gray-800">
      <div className="flex flex-col lg:flex-row gap-6 px-6 py-10 lg:px-20">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/2 bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative group w-fit mx-auto">
              <img
                src={formData.picture || "https://via.placeholder.com/150"}
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
            {isEditing ? (
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="text-md font-semibold text-center bg-gray-100 rounded-lg focus:outline-none mt-2"
              />
            ) : (
              <p className="text-md font-semibold mt-2">username: <span className="font-semibold bg-gray-200 p-1 rounded">{formData.username || user.username}</span></p>
            )}
            <p className="text-sm text-gray-500">{formData.email}</p>
            <p className="text-sm my-1 text-gray-500">Joined: <span className="font-semibold bg-gray-200 p-1 rounded">{Createdate}</span></p>
            <p className="text-sm my-1 text-gray-500">Updated: <span className="font-semibold bg-gray-200 p-1 rounded">{Updatedate}</span></p>

            <div className="mt-6 flex w-full gap-3">
              <button
                className="flex-1 border-2 border-gray-300 hover:border-emerald-800 shadow-md rounded-lg py-2 text-sm flex items-center justify-center gap-2 cursor-pointer"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? <FaSave /> : <FaEdit />}
                {isEditing ? "Save" : "Edit Profile"}
              </button>
              <button
                onClick={() => dispatch(logoutThunk())}
                className="flex-1 bg-gradient-to-r from-emerald-400 to-teal-800 text-white rounded-lg py-2 text-sm flex items-center justify-center gap-2"
              >
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
        <main className="w-full space-y-6 lg:w-1/2">
          <SectionCard title="📄 About">
            {isEditing ? (
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className=" text-gray-600 bg-gray-100 p-1 focus:outline-none"
              />
            ) : (
              <p className="w-96 text-gray-500">
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
                    className="bg-gray-100 focus:outline-none"
                  />
                ) : (
                  <span>{formData.location || "Add your Location"}</span>
                )}
              </li>
              <li>
                <FaGlobe className="inline mr-2" />
                {isEditing ? (
                  <input
                    name="websiteLink"
                    value={formData.websiteLink}
                    onChange={handleChange}
                    className="bg-gray-100 focus:outline-none"
                  />
                ) : (
                  <a href={formData.websiteLink} target="_blank" rel="noreferrer">
                    Website Link
                  </a>
                )}
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="📣 Social Presence">
            <ul className="space-y-2 text-gray-600">
              {[
                { name: "githubLink", icon: <FaGithub />, label: "GitHub" },
                { name: "twitterLink", icon: <FaTwitter />, label: "Twitter" },
                { name: "linkedinLink", icon: <FaLinkedin />, label: "LinkedIn" },
              ].map(({ name, icon, label }) => (
                <li key={name} className="flex items-center">
                  {icon}
                  {isEditing ? (
                    <input
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="ml-2 bg-gray-100 focus:outline-none"
                    />
                  ) : (
                    <a
                      href={formData[name]}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2"
                    >
                      {label}
                    </a>
                  )}
                </li>
              ))}
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
