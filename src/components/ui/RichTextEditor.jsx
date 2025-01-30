import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import Button from "./Button";

const RichTextEditor = ({ onSave, buttonText="Save", initialValue= ""}) => {

    const editorRef = useRef(null);
    const handleGetContent = () => {
        if (editorRef.current) { 
            onSave(editorRef.current.getContent());
        }
    };

    return (
        <div className="w-full p-4 text-black-default">
            <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={initialValue}
                init={{
                    height: 400,
                    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
                    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                }}
            />
            <Button 
                onclick={handleGetContent}
                text={buttonText} 
                classname="[&]:rounded-full [&]:py-2.5 [&]:px-9 mt-7" 
            />
        </div>
    );
};

export default RichTextEditor;
