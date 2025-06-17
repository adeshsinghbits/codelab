import { useState } from "react";
import { executeCode } from "../../Api/api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      alert(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
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
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
