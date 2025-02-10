import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'
import { UserContext } from "../../../../context/UserContext";
import useAxios from "../../../../hooks/UseAxios";
import TableColumn from "./TableColumn";
import OutlineButton from "../../../../components/ui/OutlineButton";

const RecentApplications = () => {

    const { userData } = useContext(UserContext);
    const navigate  = useNavigate();
    const Applications = useAxios('/applications', 'get', {headers: {Authorization: `Bearer ${userData.token}`}});

    useEffect(() => {
        const fetchData = async () => {
            await Applications.fetchData();
        };
        fetchData();
    }, [])

    const tableData = Applications.data?.data.slice(0, 10) || [];

    const table = useReactTable({
        data: tableData,
        columns: TableColumn,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="recent-applications bg-white-default rounded-[10px] boxShadow-1x mt-5">
            
            <div className="flex justify-between items-center bg-white-default p-5 rounded-lg">
                <h2 className="text-black-default">Recent Applications</h2>
                <OutlineButton
                    onclick={() => navigate('/admin/applications')}
                    text="View All"
                    className="text-primary-default border-primary-default px-6 py-2"
                />
            </div>

            {Applications.loading ? (
                    <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
            ) : 
                <table className="w-full">
                    <thead className="bg-primary-100 text-black-default">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="bg-white-default text-black-default text-left border-b">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            }
        </div>
    );
};
export default RecentApplications;