import { useState } from "react";
import { executeCode } from "../../utils/axiosInstance";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);

      // Handle HTML Preview
      if (language === "html") {
        const blob = new Blob([sourceCode], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        setOutput(<iframe src={url} className="w-full h-[75vh] border rounded bg-white" />);
        return;
      }

      // Handle other code execution
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n")); // array of strings
      result.stderr ? setIsError(true) : setIsError(false);

    } catch (error) {
      alert(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  const renderOutput = () => {
    if (!output) return 'Click "Run Code" to see the output here';

    // Check if it's a JSX element (like iframe)
    if (typeof output === "object" && !Array.isArray(output)) {
      return output;
    }

    // Else treat as string array
    return output.map((line, i) => <p key={i}>{line}</p>);
  };

  return (
    <div className="w-full">
      <p className="mb-2 text-lg font-semibold text-white">Output</p>
      <button
        onClick={runCode}
        disabled={isLoading}
        className={`mb-4 px-4 py-2 border rounded text-sm font-medium 
        ${isLoading ? "bg-green-900 text-gray-400 cursor-not-allowed" : "bg-transparent hover:bg-green-600 text-green-400 border-green-500"}`}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>

      <div
        className={`h-[75vh] overflow-y-auto p-2 text-sm rounded border ${
          isError ? "text-red-400 border-red-500" : "text-white border-[#333]"
        }`}
      >
        {renderOutput()}
      </div>
    </div>
  );
};

export default Output;
