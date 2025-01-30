import { Link } from "react-router-dom";

const Footer = ({className=""}) => {
    return(
        <footer className="bg-white-default w-full">
            <div className={`w-full flex flex-wrap items-center justify-between py-4 px-5 ${className}`}>
                <div className="font-medium text-black-300">Copyright 2024 © <Link className="text-primary-default underline" to="https://www.cmcludhiana.in">cmcludhian.in</Link></div>
                <div className="font-medium text-black-300">Made with ❤️ by <Link className="text-primary-default underline" to="https://quickcoderz.com">Quickcoderz</Link></div>
            </div>
        </footer>
    )
}

export default Footer;