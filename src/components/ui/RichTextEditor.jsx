import { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Button from "./Button";

const RichTextEditor = ({ onSave, buttonText="Save", defaultContent = ""}) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // Convert HTML to EditorState when defaultContent is provided
    useEffect(() => {
        if (defaultContent) {
            const blocksFromHTML = convertFromHTML(defaultContent);
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            setEditorState(EditorState.createWithContent(contentState));
        }
    }, [defaultContent]);

    const handleEditorChange = (newState) => {
        setEditorState(newState);
    };

    const handleSave = () => {
        const htmlContent = stateToHTML(editorState.getCurrentContent());
        onSave(htmlContent);
    };

    return (
        <div className="w-full p-4 text-black-default">
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                editorClassName="border border-gray-300 min-h-[200px] px-4 py-2 bg-white"
            />
            <Button 
                onclick={handleSave}
                text={buttonText} 
                classname="[&]:rounded-full [&]:py-2.5 [&]:px-9 mt-7" 
            />
        </div>
    );
};

export default RichTextEditor;
