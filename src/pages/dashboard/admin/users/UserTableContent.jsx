import { useMemo, useState, useEffect, useContext } from "react";
import TableColumn from "./TableColumn";
import { useTable, useSortBy, usePagination, useGlobalFilter} from "react-table";
import { FaSortAmountDown } from "react-icons/fa";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { TbFileExport } from "react-icons/tb";
import Searchbar from "../../../../components/ui/Searchbar";
import "jspdf-autotable";
import {exportToCSV, exportToXML, exportToPDF} from "./UsersExportFileTypes";
import Iconsbutton from "../../../../components/ui/Iconsbutton" 
import { RiRefreshLine } from "react-icons/ri";
import useAxios from "../../../../hooks/UseAxios";
import { UserContext } from "../../../../context/UserContext";

const UserTableContent = ({data, onAction}) => {

    const { userData } = useContext(UserContext);
    const { fetchData } = useAxios(null, "post", { headers: { Authorization: `Bearer ${userData.token}` }});

    const handleStatusChange = (id, status) => {
        fetchData({url: `/users/${id}/enable`})
        // console.log("Status change triggered for ID:", id, "Status:", status);
    };

    const [hiddenColumns, setHiddenColumns] = useState([]);

    const columns = useMemo(() => TableColumn({ onAction, handleStatusChange }), [onAction]);
    const usersList = useMemo(() => data?.data || [], [data]);

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage, 
        previousPage, 
        canPreviousPage, 
        canNextPage,
        gotoPage,
        setPageSize,
        state,
        setGlobalFilter,
        prepareRow,
        allColumns,
        setHiddenColumns: setTableHiddenColumns,
    } = useTable({
        columns,
        data: usersList,
        initialState: {
            sortBy: [{ id: "name", desc: false }],
            pageSize: 5,
        },
    }, useGlobalFilter, useSortBy, usePagination)

    const {pageIndex, pageSize, globalFilter} = state;
    const pageCount = usersList.length ? Math.ceil(usersList.length / pageSize) : 1;

    // Sync hiddenColumns state with React Table's setHiddenColumns
    useEffect(() => {
        setTableHiddenColumns(hiddenColumns);
    }, [hiddenColumns, setTableHiddenColumns]);

    const toggleColumnVisibility = (columnId) => {
        setHiddenColumns((currentHidden) =>
            currentHidden.includes(columnId)
            ? currentHidden.filter((id) => id !== columnId) // Show column
            : [...currentHidden, columnId] // Hide column
        );
    };

    const [showColumn, setShowColumn] = useState(false);
    const [showExportOptions, setShowExportOptions] = useState(false);

    const handleExport = (type) => {
        // Get visible columns excluding 'actions'
        const visibleColumns = allColumns
            .filter(
                (column) => 
                    !hiddenColumns.includes(column.id) && column.id !== "actions" // Exclude 'actions'
            )
            .map((column) => column.id); // Get visible column IDs
    
        // Prepare export data
        const prepareExportData = (rows) => {
            return rows.map((row) => {
                const { actions, status, ...rest } = row.original; // Exclude 'actions' from row data
        
                // Map status to human-readable format
                const formattedStatus = status === 1 ? "Active" : "Non Active";
        
                return {
                    ...rest,
                    status: formattedStatus, // Replace numeric status with text
                };
            });
        };
        
    
        const exportData = prepareExportData(page); // Use prepareExportData for consistency
    
        // Export data based on type
        if (type === "csv") exportToCSV(exportData, visibleColumns);
        if (type === "xml") exportToXML(exportData, visibleColumns);
        if (type === "pdf") exportToPDF(exportData, visibleColumns);
    };    

    const resetFiltersAndSettings = () => {
        setPageSize(5); // Reset to default page size
        setGlobalFilter(""); // Clear the global filter
        setHiddenColumns([]); // Show all columns (reset visibility)
        gotoPage(0); // Reset to the first page
    };

    return(
        <div className="bg-white-default py-5 rounded-lg pb-0">

            <div className="flex justify-between items-center mb-9 px-5">
                <h2 className="text-black-default capitalize">Users List</h2>
                
                <div className="flex items-center gap-2.5">

                    <Iconsbutton 
                        icon={<RiRefreshLine className="text-black-300" size={20} />} 
                        onclick={resetFiltersAndSettings}
                    />

                    <div className="relative">
                        <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white-300 cursor-pointer" onClick={() => setShowExportOptions(!showExportOptions)}>
                            <TbFileExport className="text-black-300 mr-2" size={20} />
                            <span className="text-black-300 capitalize text-base font-normal">
                                Export
                            </span>
                            <IoIosArrowDown className={`text-black-default ml-2 ease-linear duration-300 ${showExportOptions ? 'rotate-180' : 'rotate-0'}`} />
                        </div>
                        <div className={`absolute top-12 right-0 bg-white-default shadow-md rounded-md z-50 p-2 ease-linear duration-300
                            ${showExportOptions ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-[30px]'}`}>
                            <button
                                onClick={() => handleExport("csv")}
                                className="block w-full text-left px-2 py-1 bg-white-300 hover:bg-gray-200 text-black-300 capitalize text-base font-medium"
                            >
                                Export to CSV
                            </button>
                            <button
                                onClick={() => handleExport("xml")}
                                className="block w-full text-left px-2 py-1 mt-2 bg-white-300 hover:bg-gray-200 text-black-300 capitalize text-base font-medium"
                            >
                                Export to XML
                            </button>
                            <button
                                onClick={() => handleExport("pdf")}
                                className="block w-full text-left px-2 py-1 mt-2 bg-white-300 hover:bg-gray-200 text-black-300 capitalize text-base font-medium"
                            >
                                Export to PDF
                            </button>
                        </div>
                    </div>

                    <div className="relative">

                        <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white-300 cursor-pointer" onClick={() => setShowColumn(!showColumn)}>
                            <FaSortAmountDown className="text-black-300 mr-2" />
                            <span className="text-black-300 capitalize text-base font-normal">
                                Columns
                            </span>
                            <IoIosArrowDown className={`text-black-default ml-2 ease-linear duration-300 ${showColumn ? 'rotate-180' : 'rotate-0'}`} />
                        </div>

                        {/* Column Visibility Controls */}
                        <div className={`flex flex-col bg-white-default w-full absolute shadow-md top-12 right-0 rounded-md z-50 ease-linear duration-300 
                            border border-solid border-black-100 ${showColumn ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-[30px]'}`}>
                            {allColumns.map((column) => (
                                <label className="flex items-center gap-x-2 py-2 px-2.5 cursor-pointer hover:bg-success-300" key={column.id}>
                                    <input
                                        className="w-auto sr-only peer"
                                        type="checkbox"
                                        checked={!hiddenColumns.includes(column.id)}
                                        onChange={() => toggleColumnVisibility(column.id)}
                                    />
                                    <div className="peer-checked:bg-success-default bg-transparent w-[18px] h-[18px] border border-solid border-black-300 rounded relative
                                    after:content-['] after:absolute after:top-[3px] after:left-1.5 after:w-1 after:h-2 after:border-r peer-checked:border-success-default
                                    after:border-b after:border-solid after:border-white-default after:rotate-45"></div>
                                    <span className="text-black-300 capitalize text-base font-medium">{column.Header}</span>
                                </label>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between mb-4 px-5">
                <div className="flex items-center gap-2.5">
                    <p className="text-black-300 min-w-fit">Row Per Page</p>
                    <select 
                        className="w-20 block border rounded-md px-2.5 py-2.5 text-base font-normal text-black-300 relative" 
                        value={pageSize} 
                        onChange={e => setPageSize(Number(e.target.value))}
                    >
                        {
                            [5,10,15,20].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <Searchbar
                    icon={false}
                    placeholder="Search"
                    className="bg-white-default px-5 py-3 border border-solid border-black-100"
                    value={globalFilter || ''} 
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>

            <table className="w-full" {...getTableProps}>

                <thead className="bg-primary-100 text-black-default">
                    {headerGroups.map((headerGroup) => {
                        const { key: groupKey, ...restGroupProps } = headerGroup.getHeaderGroupProps(); // Extract key for the header group
                        return (
                            <tr key={groupKey} {...restGroupProps}>
                                {headerGroup.headers.map((column) => {
                                    const { key: columnKey, ...restColumnProps } = column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    ); // Extract key for each column
                                    return (
                                        <th
                                            key={columnKey}
                                            {...restColumnProps}
                                            className="text-left py-3 px-4 text-base font-medium text-black-default leading-5"
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                {column.render("Header")}
                                                <span className="ml-2 flex flex-col items-center">
                                                    <BiCaretUp
                                                        size={14}
                                                        className={`${
                                                            column.isSorted && !column.isSortedDesc
                                                                ? "text-black"
                                                                : "text-black-200"
                                                        }`}
                                                    />
                                                    <BiCaretDown
                                                        size={14}
                                                        className={`-mt-1.5 ${
                                                            column.isSorted && column.isSortedDesc
                                                                ? "text-black"
                                                                : "text-black-200"
                                                        }`}
                                                    />
                                                </span>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        const { key: rowKey, ...restRowProps } = row.getRowProps(); // Extract key for row
                        return (
                            <tr key={rowKey} {...restRowProps} className="bg-white-default text-black-default text-left border-b">
                                {row.cells.map((cell) => {
                                    const { key: cellKey, ...restCellProps } = cell.getCellProps(); // Extract key for cell
                                    return (
                                        <td key={cellKey} {...restCellProps} className="px-5 py-3.5">
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>

            </table>

            <div className="text-base flex items-center justify-between p-5">
                <div className="text-black-default">
                    <span>
                        Showing {pageIndex * pageSize + 1} to{" "}
                        {Math.min((pageIndex + 1) * pageSize, usersList.length)} of {usersList.length} entries
                    </span>
                </div>
                <div className="flex items-center gap-x-4">
                    <button 
                        className={`${canPreviousPage ? 'text-black-default' : 'text-black-200 cursor-not-allowed'}`} 
                        onClick={() => previousPage()} 
                        disabled={!canPreviousPage}
                    >
                        Prev
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-x-2">
                        {Array.from({ length: pageCount }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => gotoPage(index)}
                                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                    pageIndex === index
                                    ? 'bg-primary-default text-white-default'
                                    : 'bg-transparent text-black-default'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button 
                        className={`${canNextPage ? 'text-black-default' : 'text-black-200 cursor-not-allowed'}`} 
                        onClick={() => nextPage()} 
                        disabled={!canNextPage}
                    >
                        Next
                    </button>
                </div>
                
            </div>

        </div>
    )
}

export default UserTableContent;