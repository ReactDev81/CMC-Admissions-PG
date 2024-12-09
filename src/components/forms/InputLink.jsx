import { Link } from "react-router-dom";

const InputLink = ({ text, href, className}) => {
    return (
        <Link
            to={href}
            className={`text-purple-default text-base leading-5 font-normal text-center inline-block underline ${className ? className : ''}`}
        >
            {text}
        </Link>
    );
};

export default InputLink;