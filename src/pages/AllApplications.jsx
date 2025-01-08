import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import { useState } from "react";
import UserList from "../fake-api/UserList";
import { IoEyeOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDownloadCloudLine } from "react-icons/ri";

const AllApplication = () => {

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            cell: ({ row }) => {

                console.log('row', row);
                const firstLetter = row.original.name.charAt(0).toUpperCase();
                const colors = ['#3a6052', '#1ABE17', '#48A3D7', '#C95E9E', '#1ABE17'];
                const color = colors[row.index % colors.length];

                return(
                    <div className="flex items-center gap-2.5">
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
            header: 'actions',
            size: 180,
            cell: ({ row }) => {
                return(
                    <div className="flex justify-between w-full">
                        <div className="flex items-center ">
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
                        <div className="flex items-center">
                            <button
                                className="text-black-300"
                                onClick={() => onAction('edit', cell.row.original)}
                            >
                                <BsThreeDotsVertical size={16} />
                            </button>
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

    console.log(table.getTotalSize());

    return(
        <div>
            <h1 className="text-black-default">All Application</h1>
            <table className="table w-full mt-5" style={{width: table.getTotalSize() + 'px'}}>
                <thead className="bg-primary-100 text-black-default">
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return(
                                        <th style={{width: header.getSize() + 'px'}} className="text-left py-3 px-4 text-base font-medium text-black-default leading-5" key={header.id}>
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
                                        <td style={{width: cell.column.getSize() + 'px'}} className="px-5 py-3.5" key={cell.id}>
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