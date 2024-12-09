const FileFeild = ({ label, labelclass, id }) => {
    return (
        <div className="flex flex-col">
            <label className={`mb-1.5 text-black-300 ${labelclass}`} htmlFor={id}>
                {label}
            </label>
            <div className="file-field border rounded-md">
                <input
                    type="file"
                    placeholder="Choose File"
                    className="text-black-300 text-base font-normal w-full"
                />
            </div>
        </div>
    );
};
export default FileFeild;