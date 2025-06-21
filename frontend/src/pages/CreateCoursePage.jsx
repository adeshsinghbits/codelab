import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourseThunk } from "../features/course/courseThunk";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateCoursePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.course);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !thumbnail || !video) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", JSON.stringify(tags.split(",").map(t => t.trim())));
    formData.append("thumbnail", thumbnail);
    formData.append("video", video);

    try {
      const result = await dispatch(createCourseThunk(formData)).unwrap();
      toast.success("Course created successfully");
      navigate("/courses");
    } catch (error) {
      toast.error(error || "Failed to create course");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-green-700">🎓 Create a New Course</h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block font-medium mb-1">Title*</label>
          <input
            type="text"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description*</label>
          <textarea
            rows={4}
            placeholder="Write a brief course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            placeholder="e.g., JavaScript, React, Web Dev"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Thumbnail Image*</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Intro Video File*</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}

export default CreateCoursePage;
