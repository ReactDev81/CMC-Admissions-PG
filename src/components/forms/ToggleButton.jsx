const ToggleButton = ({ id, text }) => {
    return (
        <div className="flex items-center">
            <label
                htmlFor={id}
                className={`bg-black-100 cursor-pointer w-12 h-6 rounded-full relative peer-checked:bg-primary-default ${id}`}
            >
                <input type="checkbox" id={id} className="sr-only peer" />
                <span className="w-2/5 h-4/5 bg-white-default absolute rounded-full top-0.5 left-1 peer-checked:bg-primary-default peer-checked:left-6 transition-all duration-500"></span>
            </label>
            <span className="text-black-300 ml-2.5">{text}</span>
        </div>
    );
};

export default ToggleButton;