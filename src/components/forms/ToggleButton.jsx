const ToggleButton = ({ id, disabled = false, value = false, onChange, register }) => {
    return (
        <div className={`flex items-center ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
        <label
            className={`flex items-center cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}
            htmlFor={id}
        >
                <input 
                    className="sr-only peer" 
                    type="checkbox"
                    id={id}
                    defaultChecked={value}
                    // onChange={onChange}
                    disabled={disabled}
                    {...(register && register(id))}
                />
                <span 
                    className="transition-all duration-300 relative w-12 h-6 rounded-full peer bg-black-100 
                    after:absolute after:content-[''] after:w-2/5 after:h-4/5 after:rounded-full after:bg-white-default after:top-0.5 after:left-1
                    peer-checked:bg-primary-default after:peer-checked:left-6 after:transition-all after:duration-300"
                ></span>
            </label>
        </div>
    );
};
export default ToggleButton;