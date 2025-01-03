import { useMemo, useState, useEffect } from "react";
import TableColumn from "./TableColumn";
import { useTable, useSortBy, usePagination, useGlobalFilter} from "react-table";
import { FaSortAmountDown } from "react-icons/fa";
import { CiCalendarDate, CiFilter} from "react-icons/ci";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import Searchbar from "../../../../components/ui/Searchbar";

const UserTableContent = ({data, onAction}) => {

    const [hiddenColumns, setHiddenColumns] = useState([]);

    const columns = useMemo(() => TableColumn({ onAction }), [onAction]);
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
            pageSize: 5
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

    return(
        <div className="bg-white-default py-5 rounded-lg pb-0">

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
                            Export
                        </span>
                        <IoIosArrowDown className="text-black-default ml-2" />
                    </div>
                    <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white-300">
                        <FaSortAmountDown className="text-black-300 mr-2" />
                        <span className="text-black-300 capitalize text-base font-normal">
                            Columns
                        </span>
                        <IoIosArrowDown className="text-black-default ml-2" />
                    </div>
                </div>
            </div>

            {/* Column Visibility Controls */}
            <div style={{ marginBottom: "1rem" }}>
                <strong>Toggle Columns: </strong>
                {allColumns.map((column) => (
                    <label key={column.id} style={{ marginRight: "1rem" }}>
                        <input
                            type="checkbox"
                            checked={!hiddenColumns.includes(column.id)}
                            onChange={() => toggleColumnVisibility(column.id)}
                        />
                        {column.Header}
                    </label>
                ))}
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