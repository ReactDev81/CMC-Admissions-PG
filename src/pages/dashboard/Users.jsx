import { FaArrowsRotate } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { CgAddR } from "react-icons/cg";
import { CiCalendarDate, CiFilter} from "react-icons/ci";
import { LuFileInput } from "react-icons/lu";
import { FaSortAmountDown, FaCloudDownloadAlt} from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { useForm } from "react-hook-form";
import Button from '../../components/ui/Button'
import SelectField from "../../components/forms/SelectField";
import SearchBar from "../../components/ui/Searchbar";

import UserList from "../../fake-api/UserList";

const Users = () => {

    const {control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            category: "",
        },
    });

    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    return(
        <div className="applications">
            <div className="flex gap-2.5 justify-end items-center mt-4 mb-9">
                <span className="h-10 w-10 rounded-full bg-white-default flex items-center justify-center">
                    <FaArrowsRotate className="text-black-300" />
                </span>
                <span className="h-10 w-10 rounded-full bg-white-default flex items-center justify-center">
                    <FiPrinter className="text-black-300" />
                </span>
                <button className="flex items-center bg-primary-200 rounded-full justify-center text-black-300 px-4 py-2.5">
                    <LuFileInput className="text-black-300 mr-2" />
                    Export
                    <IoIosArrowDown className="ml-2" />
                </button>
                <Button
                    classname="flex items-center [&]:rounded-full [&]:px-4 w-auto"
                    icon={<CgAddR className="text-xl mr-2" />}
                    text="Add Students"
                    className="text-white-default"
                />
            </div>

            <div className="bg-white-default py-5 rounded-lg">
                <div className="flex justify-between items-center mb-9 px-5">
                    <h2 className="text-black-default capitalize">Users List</h2>
                    <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white-300">
                            <CiCalendarDate className="text-black-300 mr-2" />
                            <span className="text-black-300 capitalize text-base font-normal">
                                11/01/2024 - 11/07/2024
                            </span>
                        </div>
                        <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white-300">
                            <CiFilter className="text-black-300 mr-2" />
                            <span className="text-black-300 capitalize text-base font-normal">
                                Filter
                            </span>
                            <IoIosArrowDown className="text-black-default ml-2" />
                        </div>
                        <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white-300">
                            <FaSortAmountDown className="text-black-300 mr-2" />
                            <span className="text-black-300 capitalize text-base font-normal">
                                Sort by A-z
                            </span>
                            <IoIosArrowDown className="text-black-default ml-2" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between mb-4 px-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <p className="text-black-300">Row Per Page</p>
                        <SelectField
                            name="category"
                            control={control}
                            options={options}
                            placeholder="10"
                            rules={{ required: "" }}
                            className="w-fit"
                        />
                        <p className="text-base text-black-300">Entries</p>
                    </div>
                    <SearchBar placeholder="Search" />
                </div>
                <table className="table w-full">
                    <thead className="bg-primary-100 text-black-default">
                        <tr>
                            <th className="text-left py-3 px-4 text-base font-medium text-black-default leading-5">Name</th>
                            <th className="text-left py-3 px-4 text-base font-medium text-black-default leading-5">Username</th>
                            <th className="text-left py-3 px-4 text-base font-medium text-black-default leading-5">Email</th>
                            <th className="text-left py-3 px-4 text-base font-medium text-black-default leading-5">Created On</th>
                            <th className="text-left py-3 px-4 text-base font-medium text-black-default leading-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            UserList && UserList.map((User, index) => {
                                return(
                                    <tr key={index} className="bg-white-default text-black-default text-left border-b">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2.5">
                                                <img src={User.image} className="h-10 w-10 rounded-full object-cover" alt="" /><span>{User.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-black-300">{User.username}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-black-300">{User.email}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-black-300">{User.created_on}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-2">
                                                    <IoEye />
                                                    <FaCloudDownloadAlt />
                                                </span>
                                                <HiDotsVertical />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> 
            </div>
        </div>
    )
}

export default Users;