import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { useState } from "react";
import UserList from "../fake-api/UserList";
import { IoEyeOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDownloadCloudLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { CgToggleOff } from "react-icons/cg";
import { RiLockLine } from "react-icons/ri";
import { BsTrash3 } from "react-icons/bs";


const AllApplication = () => {

    const [menuOpen, setMenuOpen] = useState(null);

    const toggleMenu = (rowIndex) => {
        setMenuOpen(menuOpen === rowIndex ? null : rowIndex);
    };

    const onAction = (action, rowData) => {
        console.log(`Action: ${action}`, rowData);
    };

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => {
                const firstLetter = row.original.name.charAt(0).toUpperCase();
                const colors = ['#3a6052', '#1ABE17', '#48A3D7', '#C95E9E', '#1ABE17'];
                const color = colors[row.index % colors.length];
                return(
                    <div className="flex items-center gap-2.5">
                        {/* <img
                            src={cell.row.original.image}
                            className="h-10 w-10 rounded-full object-cover"
                            alt={`${cell.row.original.name}`}
                        /> */}
                        <div className="h-10 w-10 rounded-full flex items-center justify-center text-white-default font-semibold"
                            style={{ backgroundColor: color }}
                        >
                            {firstLetter}
                        </div>
                        <span>{row.original.name}</span>
                    </div>
                )
            },
        },
        {
            accessorKey: 'application_no',
            header: 'Application No',
            cell: ({ row }) => {
                return (
                    <p className="text-info-default">{row.original.application_no}</p>
                )
            }
        },
        {
            accessorKey: 'email',
            header: 'Email',
            Cell: props => props.column.email,
        },
        {
            accessorKey: 'mobile',
            header: 'Mobile',
            Cell: props => props.column.mobile,
        },
        {
            accessorKey: 'applied',
            header: 'Applied',
            Cell: props => props.column.applied,
        },
        {
            accessorKey: 'created_at',
            header: 'Created At',
            Cell: props => props.column.created_at,
        },
        {
            accessorKey: 'submission_date',
            header: 'Submission Date',
            Cell: props => props.column.submission_date,
        },
        {
            accessorKey: 'Actions',
            header: 'Actions',
            cell: ({ row }) => {
                return(
                    <div className="flex justify-between w-full">
                        <div className="flex items-center">
                            <button
                                className="text-black-300 mr-2"
                                onClick={() => onAction('view', cell.row.original)}
                            >
                                <IoEyeOutline size={18} />
                            </button>
                            <button
                                className="text-black-300"
                                onClick={() => onAction('download', cell.row.original)}
                            >
                                <RiDownloadCloudLine size={18} />
                            </button>
                        </div>
                        <div className="relative flex items-center justify-end">
                            <button
                                className="text-black-300"
                                onClick={() => toggleMenu(row.index)}
                            >
                                <BsThreeDotsVertical size={16} />
                            </button>

                            {/* Dropdown Menu */}
                            {menuOpen === row.index && (
                                <div className="py-3 absolute right-0 top-3 mt-2 min-w-44 w-36 bg-white-default rounded-md shadow-flex z-10">
                                    <button
                                        className="flex gap-x-2.5 px-5 py-3 text-left font-base leading-5 text-black-300 hover:bg-gray-100 w-full"
                                        onClick={() => onAction("edit", row.original)}
                                    >
                                        <FiEdit3 size={19} />
                                        Edit
                                    </button>
                                    <button
                                        className="flex gap-x-2.5 px-5 py-3 text-left font-base leading-5 text-black-300 hover:bg-gray-100 w-full"
                                        onClick={() => onAction("disable", row.original)}
                                    >
                                        <CgToggleOff size={19} />
                                        Disable
                                    </button>
                                    <button
                                        className="flex gap-x-2.5 px-5 py-3 text-left font-base leading-5 text-black-300 hover:bg-gray-100 w-full"
                                        onClick={() => onAction("loginDetails", row.original)}
                                    >
                                        <RiLockLine size={19} />
                                        Login Details
                                    </button>
                                    <button
                                        className="flex gap-x-2.5 px-5 py-3 text-left font-base leading-5 text-black-300 hover:bg-gray-100 w-full"
                                        onClick={() => onAction("delete", row.original)}
                                    >
                                        <BsTrash3 size={16} />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        }
    ]

    const [data, setData] = useState(UserList);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
    })

    return(
        <div>
            <h1 className="text-black-default">All Application</h1>
            <table className="table w-full mt-5">
                <thead className="bg-primary-100 text-black-default">
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return(
                                        <th 
                                            className={`text-left py-3 px-4 text-base font-medium text-black-default leading-5 ${header.column.columnDef.accessorKey === 'Actions' ? 'w-[160px]' : ''}`} 
                                            key={header.id}
                                        >
                                            {header.column.columnDef.header}
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return(
                            <tr key={row.id} className="bg-white-default text-black-default text-left border-b">
                                {row.getVisibleCells().map((cell) => {
                                    return(
                                        <td  className={`px-5 py-3.5 ${cell.column.columnDef.accessorKey === 'Actions' ? 'w-[160px]' : ''}`} key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AllApplication