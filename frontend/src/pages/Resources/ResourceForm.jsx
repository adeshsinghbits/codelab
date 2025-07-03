import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { FiX } from "react-icons/fi";
import { FaCloudUploadAlt, FaRegSave} from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { uploadFileThunk } from "../../features/resource/resourceThunks";

const ResourceForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    content: initialData.content || "",
    type: initialData.type || "article",
    tags: initialData.tags || [],
  });

  const [tagInput, setTagInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTagAdd = () => {
    const newTag = tagInput.trim();
    if (newTag && !form.tags.includes(newTag)) {
      setForm({ ...form, tags: [...form.tags, newTag] });
      setTagInput("");
    }
  };

  const handleTagRemove = (tag) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    dispatch(uploadFileThunk(file)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setForm((prev) => ({ ...prev, content: res.payload }));
      }
      setUploading(false);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload({ target: { files: [file] } });
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-md space-y-8 border border-gray-200"
    >
      <h1 className="text-3xl font-semibold text-gray-500 mb-4">Craft a <span className="text-gray-800">New Capsule</span></h1>
      <p>“Capsule” implies a bundle of value — works well for articles, code, and more.</p>
      {/* Title */}
      <div>
        <label htmlFor="title" className="text-sm font-semibold text-gray-700">Title *</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="mt-1 w-full bg-green-100 border border-green-400 rounded-xl px-4 py-2 focus:outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 w-full bg-green-100 border border-green-400 rounded-xl px-4 py-2 focus:outline-none"
        />
      </div>

      {/* Type */}
      <div>
        <label htmlFor="type" className="text-sm font-semibold text-gray-700">Type *</label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          className="mt-1 w-full bg-green-100 border border-green-400 rounded-xl px-4 py-2 focus:outline-none"
        >
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="code">Code</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Content */}
      {["article", "code"].includes(form.type) ? (
        <>
          <div>
            <label htmlFor="content" className="text-sm font-semibold text-gray-700">
              {form.type === "article" ? "📝 Markdown Content" : "💻 Code Snippet"}
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={8}
              className="mt-1 w-full bg-green-100 border border-green-400 rounded-xl px-4 py-2 focus:outline-none"
            />
          </div>
          <div className="bg-green-100 p-4 border border-green-400 rounded-xl mt-4">
            <p className="text-sm  font-semibold text-gray-700 mb-2">📄 Preview</p>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{form.content}</ReactMarkdown>
            </div>
          </div>
        </>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`border-2 border-dashed p-6 rounded-xl text-center bg-green-100  transition-all ${
            uploading ? "border-green-400 bg-blue-50" : "border-gray-300 bg-gray-100"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={form.type === "video" ? "video/*" : "*"}
            onChange={handleFileUpload}
            hidden
          />
          <div
            onClick={() => fileInputRef.current.click()}
            className="cursor-pointer flex flex-col items-center justify-center  text-gray-600"
          >
            <FaCloudUploadAlt size={40} className="text-green-500 mb-2" />
            <p className="font-medium">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-500">Accepted: video, PDF, zip, etc.</p>
          </div>

          {uploading && (
            <div className="mt-4 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-green-500 animate-pulse"></div>
            </div>
          )}

          {form.content && (
            <div className="mt-4 text-left text-sm text-gray-700">
              <p className="font-semibold mb-1">✅ Uploaded:</p>
              {form.type === "video" && (
                <video
                  src={form.content}
                  controls
                  className=" w-full max-h-64 rounded border-none"
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="text-sm font-semibold text-gray-700">Tags</label>
        <div className="flex gap-2 mt-2">
          <input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleTagAdd())}
            className="flex-grow bg-green-100 border border-green-400 rounded-xl px-4 py-2 outline-none"
            placeholder="Press Enter to add tag"
          />
          <button
            type="button"
            onClick={handleTagAdd}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700"
          >
            <IoMdAdd className="inline-block mr-1" /> Add Tag
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 px-3 py-1 rounded-xl flex items-center gap-2 text-sm"
            >
              {tag}
              <FiX
                className="cursor-pointer text-red-500"
                onClick={() => handleTagRemove(tag)}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4 flex justify-end gap-4">
        <button type="button" className="border border-green-300 text-green-700 px-5 py-2 rounded-lg hover:bg-green-50">
          <FaRegSave className="inline mr-1" />
          Save as Draft
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl  transition-all flex items-center gap-2 text-base"
        >
          <FaCloudUploadAlt /> Publish Resource
        </button>
      </div>
    </form>
  );
};

export default ResourceForm;
