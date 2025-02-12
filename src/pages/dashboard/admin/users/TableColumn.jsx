import ToggleButton from "../../../../components/forms/ToggleButton"
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from "../../../../../tailwind.config";
import { IoEyeOutline } from "react-icons/io5";
import { BsTrash3 } from "react-icons/bs";
import moment from 'moment';
import { useState } from "react";

const fullConfig = resolveConfig(tailwindConfig);

const StatusColors = {
    "admin": fullConfig.theme.colors.warning.default,
    "super-admin": fullConfig.theme.colors.info.default,
    "student": fullConfig.theme.colors.success.default,
    "manager": fullConfig.theme.colors.danger.default,
};

const StatusLightColors = {
    "admin": fullConfig.theme.colors.warning['300'],
    "super-admin": fullConfig.theme.colors.info['100'],
    "student": fullConfig.theme.colors.success['300'],
    "manager": fullConfig.theme.colors.danger['300'],
};

const TableColumn = ({ onAction, handleStatusChange }) => [
    {
        Header: 'Name',
        accessor: 'name',
        sortType: "alphanumeric",
        Cell: ({ cell }) => {
            const firstLetter = cell.row.original.name.charAt(0).toUpperCase();
            const colors = ['#3a6052', '#1ABE17', '#48A3D7', '#C95E9E', '#1ABE17'];
            const color = colors[cell.row.index % colors.length];
            return(
                <div className="flex items-center gap-2.5">
                    {cell.row.original.profile_picture_url ?
                            <img
                                src={cell.row.original.profile_picture_url}
                                className="h-10 w-10 rounded-full object-cover"
                                alt={`${cell.row.original.name}`}
                            />
                        :
                        <div className="h-10 w-10 rounded-full flex items-center justify-center text-white-default font-semibold"
                            style={{ backgroundColor: color }}
                        >
                            {firstLetter}
                        </div>
                    }
                    <span>{cell.row.original.name}</span>
                </div>
            )
        },
    },
    {
        Header: 'Role',
        accessor: 'role',
        Cell: ({ cell }) => {
            const role = cell.row.original.role;
            return (
                <div className="rounded-full w-fit" style={{ backgroundColor: StatusLightColors[role] }}>
                    <p className="capitalize text-sm font-medium px-3 py-1" style={{ color: StatusColors[role] }}>
                        {role}
                    </p>
                </div>
            );
        },
    },
    {
        Header: 'Email',
        accessor: 'email'
    },
    {
        Header: 'Created On',
        accessor: 'created_at',
        Cell: ({ cell }) => {
            const formattedDate = moment(cell.value).format('D MMM, YYYY hh:mma');
            return <span>{formattedDate}</span>;
        },
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell }) => {
            const [isEnabled, setEnabled] = useState(cell.row.original.status);
            return (
                <ToggleButton 
                    id={cell.row.original.name} 
                    value={isEnabled}
                    onChange={(newStatus) => {
                        handleStatusChange(cell.row.original.id, newStatus);
                        setEnabled(newStatus);
                    }}
                />
            )
        }
    },
    {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ cell }) => (
            <div className="flex gap-2">
                <button
                    className="text-black-300"
                    onClick={() => onAction('view', cell.row.original)}
                >
                    <IoEyeOutline size={18} />
                </button>
                <button
                    className="text-black-300"
                    onClick={() => onAction('delete', cell.row.original)}
                >
                    <BsTrash3 size={16} />
                </button>
            </div>
        ),
    }
]

export default TableColumn