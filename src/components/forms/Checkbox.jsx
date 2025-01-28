const Checkbox = ({label, id, wrapperClass = "", checkboxClass = "", labelClass = "", register}) => {
    return (
        <label className={`flex items-center gap-x-2 cursor-pointer ${wrapperClass}`} htmlFor={id}>
            <input
                id={id}
                className="w-auto sr-only peer"
                type="checkbox"
                {...(register ? register(id) : {})}
            />
            <div className={`w-[17px] h-[17px] border border-solid border-black-200 rounded relative
                after:content-[''] after:absolute after:top-[2px] after:left-[5px] after:w-1 after:h-2 peer-checked:after:border-r
                peer-checked:after:border-b peer-checked:after:border-solid peer-checked:after:border-black-default after:rotate-45 ${checkboxClass}`}
            ></div>
            <span className={`text-black-default text-base font-medium ${labelClass}`}>
                {label}
            </span>
        </label>
    );
};

export default Checkbox;
