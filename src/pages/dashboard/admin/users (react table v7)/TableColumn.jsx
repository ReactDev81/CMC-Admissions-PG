import ToggleButton from "../../../../components/forms/ToggleButton"
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from "../../../../../tailwind.config";
import { IoEyeOutline } from "react-icons/io5";
import { BsTrash3 } from "react-icons/bs";
import moment from 'moment';

const fullConfig = resolveConfig(tailwindConfig);

const StatusColors = {
    admin: fullConfig.theme.colors.warning.default,
    student: fullConfig.theme.colors.success.default,
    manager: fullConfig.theme.colors.danger.default,
};

const StatusLightColors = {
    admin: fullConfig.theme.colors.warning['300'],
    student: fullConfig.theme.colors.success['300'],
    manager: fullConfig.theme.colors.danger['300'],
};

const TableColumn = ({ onAction }) => [
    {
        Header: 'Name',
        accessor: 'name',
        sortType: "alphanumeric",
        Cell: ({ cell }) => (
            <div className="flex items-center gap-2.5">
                <img
                    src={cell.row.original.image}
                    className="h-10 w-10 rounded-full object-cover"
                    alt={`${cell.row.original.name}`}
                />
                <span>{cell.row.original.name}</span>
            </div>
        ),
    },
    {
        Header: 'Roles',
        accessor: 'roles',
        Cell: ({ cell }) => {
            // Check if roles is an array of objects or a single object
            const roles = Array.isArray(cell.row.original.roles)
                ? cell.row.original.roles.map(role => role.name).join(", ")
                : cell.row.original.roles?.name || "N/A";
    
            return (
                <div className="rounded-full w-fit" style={{ backgroundColor: StatusLightColors[roles] }}>
                    <p className="capitalize text-sm font-medium px-3 py-1" style={{ color: StatusColors[roles] }}>
                        {roles}
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
        Cell: ({ cell }) => (
            <ToggleButton id={cell.row.original.name} value={cell.row.original.status === 0 ? false : true} />
        ),
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