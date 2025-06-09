import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, onChange, className }) => {
    // react-quill options
    const toolbarOptions = [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline"],
        [{ color: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
    ];

    const module = {
        toolbar: toolbarOptions,
    };

    return (
        <ReactQuill
            theme="snow"
            modules={module}
            className={className}
            value={value}
            onChange={onChange}
            placeholder="The generated notes will appear here..."
        />
    );
};

export default Editor;