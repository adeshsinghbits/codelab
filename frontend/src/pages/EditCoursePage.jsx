import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleCourseThunk,
  updateCourseThunk,
} from "../features/course/courseThunk";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditCoursePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { currentCourse, loading } = useSelector((state) => state.course);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    dispatch(fetchSingleCourseThunk(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    if (currentCourse) {
      setTitle(currentCourse.title);
      setDescription(currentCourse.description);
      setTags(currentCourse.tag?.join(", "));
    }
  }, [currentCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Title and Description are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", JSON.stringify(tags.split(",").map(t => t.trim())));

    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (video) formData.append("video", video);

    try {
      await dispatch(updateCourseThunk({ courseId, formData })).unwrap();
      toast.success("Course updated successfully");
      navigate("/courses");
    } catch (err) {
      toast.error(err || "Failed to update course");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-green-700">✏️ Edit Course</h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block font-medium mb-1">Title*</label>
          <input
            type="text"
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
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Thumbnail Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Intro Video File (optional)</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
}

export default EditCoursePage;
