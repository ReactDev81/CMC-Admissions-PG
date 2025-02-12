import { IoEyeOutline } from "react-icons/io5";
import { BsThreeDotsVertical, BsTrash3 } from "react-icons/bs";
import { RiDownloadCloudLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import moment from 'moment';
import tailwindConfig from "../../../../../tailwind.config";
import resolveConfig from 'tailwindcss/resolveConfig';
import { Link } from "react-router-dom";

const fullConfig = resolveConfig(tailwindConfig);

const StatusColors = {
    draft: fullConfig.theme.colors.black.default,
    submitted: fullConfig.theme.colors.info.default,
    changes_requested: fullConfig.theme.colors.warning.default,
    approved: fullConfig.theme.colors.success.default,
    rejected: fullConfig.theme.colors.danger.default,
};

const StatusLightColors = {
    draft: fullConfig.theme.colors.black['100'],
    submitted: fullConfig.theme.colors.info['100'],
    changes_requested: fullConfig.theme.colors.warning['300'],
    approved: fullConfig.theme.colors.success['300'],
    rejected: fullConfig.theme.colors.danger['300'],
};

const TableColumn = ({onAction, toggleMenu, menuOpen}) => [
    {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
        cell: ({ row }) => {
            const firstLetter = row.original.name.charAt(0).toUpperCase();
            const colors = ['#3a6052', '#1ABE17', '#48A3D7', '#C95E9E', '#1ABE17'];
            const color = colors[row.index % colors.length];
            return(
                <Link to={`/admin/application/${row.original.id}`} className="flex items-center gap-2.5">
                    {row.original.applicant.profile_picture_url ?
                        <img
                            src={row.original.applicant.profile_picture_url}
                            className="h-10 w-10 rounded-full object-cover"
                            alt={`${row.original.name}`}
                        /> 
                    :
                        <div className="h-10 w-10 rounded-full flex items-center justify-center text-white-default font-semibold"
                            style={{ backgroundColor: color }}
                        >
                            {firstLetter}
                        </div>
                    }
                    <span>{row.original.name}</span>
                </Link>
            )
        },
    },
    {
        accessorKey: 'applicant_number',
        header: 'Application No',
        cell: ({ row }) => {
            return (
                <p className="text-info-default">{row.original.applicant_number}</p>
            )
        }
    },
    {
        accessorKey: 'email',
        header: 'Email',
        Cell: props => props.column.email,
    },
    {
        accessorKey: 'meta.mobile_1',
        header: 'Mobile',
        cell: ({ row }) => {
            return(
                <>{row.original.meta.mobile_1}</>
            ) 
        }
    },
    {
        accessorKey: 'application_type',
        header: 'Applied',
        Cell: props => props.column.applied,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status;
            const StatusText = status
            ? status
                  .split('_') // Split by underscore
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                  .join(' ') // Join words with spaces
            : 'N/A'; // Handle undefined/null status
            return (
                <div className="rounded-full w-fit" style={{ backgroundColor: StatusLightColors[status] }}>
                    <p className="capitalize text-sm font-medium px-3 py-1" style={{ color: StatusColors[status] }}>
                        {StatusText}
                    </p>
                </div>
            )
        },
    },
    {
        accessorKey: 'submitted_at',
        header: 'Submission Date',
        cell: ({ row }) => {
            const formattedDate = row.original.submitted_at ? moment(row.original.submitted_at).format('D MMM, YYYY hh:mma') : 'Not Submitted';
            return <span>{formattedDate}</span>;
        },
    },
    {
        accessorKey: 'Actions',
        header: 'Actions',
        cell: ({ row }) => {
            return(
                <div className="flex justify-between w-full">
                    <div className="flex items-center">
                        <Link to={`/admin/application/${row.original.id}`} className="text-black-300 mr-2">
                            <IoEyeOutline size={18} />
                        </Link>
                        <button
                            className="text-black-300"
                            onClick={() => onAction('download', row.original.id)}
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
                                    onClick={() => onAction("edit", row.original.id)}
                                >
                                    <FiEdit3 size={19} />
                                    Edit
                                </button>
                                <button
                                    className="flex gap-x-2.5 px-5 py-3 text-left font-base leading-5 text-black-300 hover:bg-gray-100 w-full"
                                    onClick={() => onAction("download", row.original.id)}
                                >
                                    <RiDownloadCloudLine size={19} />
                                    Download
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


export default TableColumn