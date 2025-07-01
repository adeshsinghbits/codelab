import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../../utils/constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="w-full mt-0 p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Code Editor</h1>
      <div className="flex flex-col md:flex-row gap-4 bg-[#0f0a19] text-gray-500 p-4">
        {/* Left Panel - Editor */}
        <div className="w-full md:w-1/2">
          <LanguageSelector language={language} onSelect={onSelect} />
          <div className="border border-gray-700 rounded-lg overflow-hidden mt-2 shadow-md">
            <Editor
              options={{
                minimap: { enabled: false },
              }}
              height="75vh"
              theme="vs-dark"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              onMount={onMount}
              value={value}
              onChange={(value) => setValue(value)}
            />
          </div>
        </div>

        {/* Right Panel - Output */}
        <div className="w-full md:w-1/2">
          <Output editorRef={editorRef} language={language} />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
