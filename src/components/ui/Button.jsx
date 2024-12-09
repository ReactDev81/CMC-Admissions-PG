const Button = ({ text, onclick, id, disabled, icon, classname}) => {
    return (
        <button
            className={`bg-primary-default text-base font-medium leading-5 text-white-default text-center py-3 px-5 border border-primary-default rounded-md disabled:opacity-50 ${classname}`}
            onClick={onclick}
            id={id}
            disabled={disabled}
        >
            {icon}{text}
        </button>
    );
};

export default Button;