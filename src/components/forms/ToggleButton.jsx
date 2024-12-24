const ToggleButton = ({ id, text }) => {
    return (
        <div className="flex items-center">
            <label className="flex items-center cursor-pointer" htmlFor={id}>
                <input type="checkbox" className="sr-only peer" id={id} />
                <span className="transition-all duration-300 relative w-12 h-6 rounded-full peer bg-black-100 after:absolute after:content-[''] after:w-2/5 after:h-4/5 after:rounded-full after:bg-white-default after:top-0.5 after:left-1 peer-checked:bg-primary-default after:peer-checked:left-6 after:transition-all after:duration-300"></span>
            </label>
            <span className="text-black-300 ml-2.5">{text}</span>
        </div>
    );
};
export default ToggleButton;