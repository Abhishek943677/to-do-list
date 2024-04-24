import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useLocalStorageArray } from "../hooks/useLocalStorage";
import ShowNote from "./ShowNote";
import { IconButton, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AddIcon from "@mui/icons-material/Add";

export default function AddTask() {
  const [items, setItems, pushItem, removeItem, clearData] =
    useLocalStorageArray("noteData", []);

  const [editorContent, setEditorContent] = useState("");
  const [defaultContent, setDefaultContent] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const editorRef = useRef();

  const emptyFormData = {
    time: "",
    noteContent: "",
    reminder: "",
    done: false,
  };
  const [formData, setFormData] = useState(emptyFormData);
  const [isEdit, setIsEdit] = useState(false);

  function truncateEmptyLines(html) {
    // Use a regular expression to remove empty <p> elements with <br> inside
    const truncatedHtml = html.replace(/<p><br><\/p>$/g, "");

    // Return the modified HTML
    return truncatedHtml;
  }



  const handleKeyDown = (e) => {
    
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (isEdit == false) {
        e.preventDefault();
        
        formData.id = new Date().getTime();
        formData.time = new Date().getTime();
        formData.noteContent = truncateEmptyLines(editorContent);

        pushItem(formData); // through uselocalstoragearray hook
        setDefaultContent("");
        setEditorContent("");
        
        setFormData(emptyFormData);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        
        const oldItems = JSON.parse(localStorage.getItem("noteData"));
        const newItems = oldItems.filter((i) => i.id !== formData.id);
        localStorage.setItem("noteData", JSON.stringify(newItems));

        formData.id = new Date().getTime();
        formData.time = new Date().getTime();
        formData.noteContent = truncateEmptyLines(editorContent);

        pushItem(formData);
        setDefaultContent("");
        setEditorContent("");
        setFormData(emptyFormData);
        
        setIsEdit(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
  ];

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }],
      ["link", "image"],
    ],
  };

  return (
    <form className="caret-red-800 space-y-2 mb-4" id="editor">
      <IconButton
        onClick={() => setShowEditor((old) => !old)}
        aria-label="delete"
        size="medium"
        style={{ backgroundColor: "blue" }}
      >
        <AddIcon fontSize="inherit" style={{ color: "white" }} />
      </IconButton>

      {showEditor ? (
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={editorContent}
          onChange={(content) => setEditorContent(content)}
          modules={modules}
          formats={formats}
          onKeyDown={handleKeyDown}
          defaultValue={defaultContent}
        />
      ) : (
        ""
      )}

      <ShowNote
        items={items}
        removeItem={removeItem}
        setFormData={setFormData}
        setEditorContent={setEditorContent}
        setIsEdit={setIsEdit}
        setShowEditor={setShowEditor}
      />
    </form>
  );
}
