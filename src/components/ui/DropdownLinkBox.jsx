import { Link } from "react-router-dom";
const DropdownLinkBox = ({lists, buttonItem}) => {
    return(
        <div className="invisible opacity-0 translate-y-[30px] group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 bg-white-default w-max absolute shadow-md top-12 right-0 rounded-md z-50 ease-linear duration-300">
            <ul className="transition-all text-black-default p-2.5">
                {
                    lists.map((list, index) => {
                        return(
                            <li key={index}>
                                <Link to={list.path} className="flex flex-wrap items-center gap-[10px] p-2.5 group/item">
                                    <list.icon className="group-hover/item:text-primary-default"  />
                                    <span className="text-base font-medium text-black-300 group-hover/item:text-primary-default">{list.title}</span>
                                </Link>
                            </li>
                        )
                    })
                }
                {buttonItem}
            </ul>
        </div>
    )
}

export default DropdownLinkBox;