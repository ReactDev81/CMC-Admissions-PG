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

const ProgressColors = {
    25: fullConfig.theme.colors.warning.default,
    50: fullConfig.theme.colors.purple.default,
    75: fullConfig.theme.colors.info.default,
    100: fullConfig.theme.colors.success.default,
}

const TableColumn = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const firstLetter = row.original.name.charAt(0).toUpperCase();
            const colors = ['#3a6052', '#1ABE17', '#48A3D7', '#C95E9E', '#1ABE17'];
            const color = colors[row.index % colors.length];
            return(
                <Link to={`/application/${row.original.id}`} className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-white-default font-semibold"
                        style={{ backgroundColor: color }}
                    >
                        {firstLetter}
                    </div>
                    <span>{row.original.name}</span>
                </Link>
            )
        },
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => row.original.email,
    },
    {
        accessorKey: 'steps',
        header: 'Progress',
        cell: ({ row }) => {

            const { steps } = row.original;

             // Calculate the progress based on completed steps
            const totalSteps = 4; 
            const completedSteps = Object.values(steps || {}).filter((status) => status === "complete").length;
            const ProgressValue = (completedSteps / totalSteps) * 100;

            return(
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" 
                        style={{
                            width: `${ProgressValue}%`, 
                            backgroundColor: ProgressColors[ProgressValue] || '#e5e7eb',
                        }}
                    ></div>
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
]

export default TableColumn;