import { Link } from "react-router-dom";
const DropdownLinkBox = ({lists}) => {
    return(
        <div className="hidden group-hover:block bg-white-default w-max absolute shadow-md top-12 right-0 rounded-md">
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
            </ul>
        </div>
    )
}

export default DropdownLinkBox;