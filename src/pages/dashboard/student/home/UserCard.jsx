import { Link } from "react-router-dom";
import Title from "../../../../components/ui/Title";

const UserCard = ({icon, className, titletext, linktext, link, bgcolor, textcolor, btntext }) => {
    return (
        <div className="bg-white-default rounded-xl w-full h-fit shadow-flex">
            <div className="p-5 flex items-center gap-5 justify-between">
                <div className="flex items-center gap-5">
                    <div className={`w-[86px] h-[100px] rounded-lg flex flex-row items-center justify-center ${className}`}>
                        {icon}
                    </div>
                    <div className="flex items-start flex-col gap-2.5">
                        <Title
                            title={titletext}
                            classname="font-medium [&]:text-black-300 capitalize"
                        />
                        <Link className="text-primary-default capitalize underline text-base leading-5 font-bold cursor-pointer" to={link}>{linktext}</Link>
                    </div>
                </div>
                <div className={`rounded-full px-2.5 py-0.5 self-start ${bgcolor}`}>
                    <p className={`text-base font-medium ${textcolor}`}>{btntext}</p>
                </div>
            </div>
        </div>
    );
};

export default UserCard;