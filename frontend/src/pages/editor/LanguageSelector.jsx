import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { LANGUAGE_VERSIONS } from "../../utils/constants";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div className="ml-2 mb-4">
      <p className="mb-2 text-lg font-semibold text-gray-200">Choose Language:</p>

      <Menu as="div" className="relative inline-block text-left w-full max-w-xs">
        <Menu.Button className="w-full flex justify-between items-center px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-sm text-white hover:bg-gray-700 transition duration-150">
          <span className="capitalize">{language}</span>
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-10 mt-2 w-full max-w-xs rounded-md bg-[#1a1328] ring-1 ring-black ring-opacity-10 shadow-lg focus:outline-none">
            <div className="py-1">
              {languages.map(([lang, version]) => (
                <Menu.Item key={lang}>
                  {({ active }) => (
                    <button
                      onClick={() => onSelect(lang)}
                      className={`flex justify-between items-center w-full px-4 py-2 text-sm rounded-md transition ${
                        lang === language
                          ? "bg-gray-900 text-blue-400 font-semibold"
                          : "text-white"
                      } ${active ? "bg-gray-800 text-blue-400" : ""}`}
                    >
                      <span className="capitalize">{lang}</span>
                      <span className="text-gray-500 text-xs">({version})</span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
