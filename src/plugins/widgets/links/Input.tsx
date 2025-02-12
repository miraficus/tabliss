import React, { FC, useState } from "react";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import { getAllMDIIcons } from "./iconUtils";
import { Link } from "./types";

type Props = Link & {
  onChange: (values: Partial<Link>) => void;
};

const iconListArray = getAllMDIIcons();

const Input: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = iconListArray.filter((icon) =>
    icon.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 border rounded-md shadow-md bg-white dark:bg-gray-900">
      <h5 className="font-semibold mb-3">Shortcut {props.number}</h5>

      {/* URL INPUT */}
      <label className="block mb-2">
        URL
        <input
          type="url"
          value={props.url}
          onChange={(e) => props.onChange({ url: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
        />
      </label>

      {/* NAME INPUT */}
      <label className="block mb-2">
        Name <span className="text-gray-500">(optional)</span>
        <input
          type="text"
          value={props.name}
          onChange={(e) => props.onChange({ name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
        />
      </label>

      {/* ICON SELECTOR */}
      <label className="block">
        Icon <span className="text-gray-500">(optional)</span>
      </label>
      <button
        onClick={() => setOpen(true)}
        className="w-full px-4 py-2 border rounded-md flex items-center justify-between"
      >
        {props.icon ? (
          <>
            <Icon icon={`mdi:${props.icon}`} className="mr-2 h-5 w-5" />
            {props.icon}
          </>
        ) : (
          "Select an Icon"
        )}
      </button>

      {/* REACT MODAL */}
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        contentLabel="Select an Icon"
        className="bg-white dark:bg-gray-900 w-full max-w-4xl p-6 flex flex-col"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        shouldCloseOnOverlayClick
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select an Icon</h2>
          <button onClick={() => setOpen(false)} className="text-gray-600 dark:text-gray-300">
            ✕
          </button>
        </div>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
        />

        {/* ICON GRID */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 p-2">
          {filteredIcons.map((icon) => (
            <button
              key={icon}
              onClick={() => {
                props.onChange({ icon });
                setOpen(false);
              }}
              className="flex flex-col items-center p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Icon icon={`mdi:${icon}`} className="h-10 w-10" />
              <span className="text-xs mt-1">{icon}</span>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Input;
