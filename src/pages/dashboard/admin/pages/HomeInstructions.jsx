import RichTextEditor from '../../../../components/ui/RichTextEditor';
const HomeInstructions = () => {

    const handleSave = (content) => {
        alert(`Saved content: ${content}`);
    };

    return(
        <>
            <RichTextEditor
                onSave={handleSave}
                editorClassName="border border-gray-300"
                buttonText="Save"
            />
        </>
    )
}

export default HomeInstructions;