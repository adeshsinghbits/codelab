import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchResourceById,
  updateResource,
  deleteResource,
} from "../../features/resource/resourceThunks";
import ResourceForm from "./ResourceForm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  MdOutlineEdit,
  MdDeleteOutline,
  MdArrowBackIos,
} from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import { toast } from "react-hot-toast";

const ResourceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resource, loading, error } = useSelector((state) => state.resource);
  const { user } = useSelector((state) => state.auth); // ✅ Get logged-in user

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchResourceById(id));
  }, [dispatch, id]);

  const handleUpdate = (data) => {
    dispatch(updateResource(id, data));
    setEditMode(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this resource?")) {
      dispatch(deleteResource(id));
      navigate("/resources");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
        toast.error("Share cancelled or failed.");
      }
    } else {
      toast.error("Sharing not supported on this device.");
    }
  };

  const renderContent = () => {
    const content = resource.content;
    switch (resource.type) {
      case "code":
        return (
          <div>
            
            <button 
              onClick={() => {
                  navigator.clipboard.writeText(content);
                  toast.success("Code copied to clipboard!");
                }}
              className="text-gray-500 cursor-pointer hover:text-gray-700 transition duration-150 active:scale-90"
            >
              <FaRegCopy size={20}/>
            </button>
            <SyntaxHighlighter
              language="javascript"
              style={materialDark}
              showLineNumbers
            >
              {content}
            </SyntaxHighlighter>
          </div>
        );
      case "article":
        return (
          <div className="prose max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        );
      case "video":
        return (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={content}
              title="Video Resource"
              className="w-full h-96 rounded shadow"
              allowFullScreen
            ></iframe>
          </div>
        );
      case "other":
      default:
        return (
          <a
            href={content}
            className="text-blue-600 underline font-medium hover:text-blue-800 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Resource 🔗
          </a>
        );
    }
  };

  const isAuthor =
    user && resource?.author && user.email === resource.author.email;

  if (loading || !resource) return <p className="p-6">Loading resource...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 md:ml-80">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-black transition"
      >
        <MdArrowBackIos className="mr-1" />
        Back to Resources
      </button>

      {editMode ? (
        <>
          <h2 className="text-xl font-semibold mb-4">✏️ Edit Resource</h2>
          <ResourceForm initialData={resource} onSubmit={handleUpdate} />
        </>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2 text-gray-800">
                {resource.title}
              </h1>
              <p className="text-sm text-gray-500 capitalize mb-2">
                📁 Type: <span className="font-medium">{resource.type}</span>
              </p>
              <p className="text-gray-700">{resource.description}</p>
            </div>

            {/* Author OR Share button */}
            {isAuthor ? (
              <div className="space-x-2 flex items-center">
                <button
                  onClick={() => setEditMode(true)}
                  className="p-2 rounded-full border border-gray-300 hover:bg-blue-100 transition"
                >
                  <MdOutlineEdit size={20} className="text-blue-500" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-full border border-gray-300 hover:bg-red-100 transition"
                >
                  <MdDeleteOutline size={20} className="text-red-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleShare}
                className="p-2 rounded-full border border-gray-300 hover:bg-green-100 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 12v-2a4 4 0 014-4h12M4 12v2a4 4 0 004 4h12m0-10l-4 4m4-4l-4-4"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Tags */}
          {resource.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {resource.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 border border-gray-300 px-2 py-1 rounded-full text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">📄 Resource Content</h3>
            <div className="bg-gray-50 p-4 rounded border border-gray-200 overflow-auto">
              {renderContent()}
            </div>
          </div>

          {/* Author Info */}
          {resource.author && (
            <div className="mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <img
                  src={resource.author.picture}
                  alt="author"
                  className="w-9 h-9 rounded-full border shadow"
                />
                <div>
                  <p className="text-gray-800 font-medium">
                    {resource.author.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {resource.author.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>
              🕓 Created:{" "}
              <span className="font-medium">
                {new Date(resource.createdAt).toLocaleString()}
              </span>
            </p>
            <p>
              🔁 Updated:{" "}
              <span className="font-medium">
                {new Date(resource.updatedAt).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceDetails;
