import React, { useEffect, useRef } from "react";
import Button from "./Button";

const RichTextEditor = ({ initialContent = "", onSave, editorClassName = "", buttonText }) => {

    const editorRef = useRef(null); // Reference for the DOM element
    const rteInstance = useRef(null); // Store the editor instance

    useEffect(() => {
        // Initialize RichTextEditor when the component mounts
        rteInstance.current = new window.RichTextEditor(editorRef.current);
        rteInstance.current.setHTMLCode(initialContent);

        return () => {
            // Clean up by removing the editor element and nullifying the reference
            if (rteInstance.current && editorRef.current) {
                editorRef.current.innerHTML = ""; // Remove editor's DOM content
                rteInstance.current = null; // Nullify the editor instance
            }
        };
    }, [initialContent]);

    const handleSave = () => {
        if (rteInstance.current) {
            const content = rteInstance.current.getHTMLCode(); // Get editor content
            onSave(content); // Pass the content to the parent component via callback
        }
    };

    return (
        <div>
            <div ref={editorRef} className={editorClassName}></div>
            <Button 
                onclick={handleSave}
                text={buttonText} 
                classname="[&]:rounded-full [&]:py-2.5 [&]:px-9 mt-7" 
            />
        </div>
    );
};

export default RichTextEditor;

