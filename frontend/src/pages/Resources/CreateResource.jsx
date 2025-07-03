// pages/CreateResource.jsx
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { createResource } from "../../features/resource/resourceThunks";
import ResourceForm from "./ResourceForm";

const CreateResource = () => {
  const dispatch = useDispatch();

  const handleSubmit = (formData) => {
    dispatch(createResource(formData));
  };

  return (
    <div className="p-6 md:ml-80">
      <Link to="/library" className="flex items-center mb-6">
        <IoArrowBackSharp className="mr-2 text-xl" /> Back to Library
      </Link>
      <ResourceForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateResource;
