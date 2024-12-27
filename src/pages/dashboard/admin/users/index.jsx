import { useMemo, useState, useEffect} from "react";
import UserList from "../../../../fake-api/UserList"
import { useTable, useSortBy, usePagination, useGlobalFilter} from "react-table";
import TableColumn from "./TableColumn";
import AddNewUser from "./popup/AddNewUser";
import EditUser from "./popup/EditUser";
import DeleteUser from "./popup/DeleteUser";
import { FaArrowsRotate } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { CgAddR } from "react-icons/cg";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import Button from "../../../../components/ui/Button";
import Searchbar from "../../../../components/ui/Searchbar";
import UseAxios from "../../../../hooks/UseAxios";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";

const Users = () => {

    const{ userData } = useContext(UserContext);
    const Token = userData.token;
    // const {data, loading, error, status, fetchData} = UseAxios('/users', 'get', {headers: {'Authorization': `Bearer ${Token}`}});
    
    // useEffect(() => {
    //     fetchData();
    // }, []);

    // console.log(data?.data)

    // const users = data ? data.data : [];
    // const users = data && data.data ? data.data : [];

    const handleAction = (type, row) => {
        setPopupType(type);
        setPopupData(row);
    };

    const closePopup = () => {
        setPopupType(null);
        setPopupData(null);
    };

    const columns = useMemo(() => TableColumn({ onAction: handleAction }), [])
    const usersList = useMemo(() => UserList, [])
    // const columns = useMemo(() => TableColumn({ onAction: handleAction }), []);
    // const usersList = useMemo(() => users, []);



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
        prepareRow
    } = useTable({
        columns,
        data: usersList,
        initialState: {
            sortBy: [{ id: "name", desc: false }],
        },
    }, useGlobalFilter, useSortBy, usePagination)

    const [popupData, setPopupData] = useState(null);
    const [popupType, setPopupType] = useState(null);
    const [showAddStudents, setShowAddStudents] = useState(false);
    const {pageIndex, pageSize, globalFilter} = state;
    const pageCount = Math.ceil(usersList.length / pageSize);

    return(
        <>
            <div className="flex gap-2.5 justify-end items-center mt-4 mb-9">
                <span className="h-10 w-10 rounded-full bg-white-default flex items-center justify-center">
                    <FaArrowsRotate className="text-black-300" />
                </span>
                <span className="h-10 w-10 rounded-full bg-white-default flex items-center justify-center">
                    <FiPrinter className="text-black-300" />
                </span>
                <Button
                    onclick={() => setShowAddStudents(true)}
                    classname="flex items-center [&]:rounded-full [&]:px-4 w-auto"
                    icon={<CgAddR className="text-xl mr-2" />}
                    text="Add User"
                    className="text-white-default"
                />
            </div>

            <div className="bg-white-default py-5 rounded-lg pb-0">

                <div className="flex justify-between items-center mb-9 px-5">
                    <h2 className="text-black-default capitalize">Users List</h2>
                </div>

                <div className="flex flex-wrap items-center justify-between mb-4 px-5">
                    <div className="flex items-center gap-2.5">
                        <p className="text-black-300 min-w-fit">Row Per Page</p>
                        <select className="w-16 block border rounded-md px-2.5 py-1.5 text-base font-normal text-black-300 relative" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                            {
                                [3,10,15,20].map(pageSize => (
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

                    {showAddStudents && (
                        <div className="fixed top-0 left-0 w-full h-full bg-[#1f1e1e80] flex justify-center items-center">
                            <AddNewUser onClose={setShowAddStudents} />
                        </div>
                    )}

                    {popupType === 'view' && popupData && (
                        <div className="fixed top-0 left-0 w-full h-full bg-[#1f1e1e80] flex justify-center items-center">
                            <EditUser data={popupData} onClose={closePopup} />
                        </div>
                    )}

                    {popupType === 'delete' && popupData && (
                        <div className="fixed top-0 left-0 w-full h-full bg-[#1f1e1e80] flex justify-center items-center">
                            <DeleteUser
                                data={popupData}
                                onClose={closePopup}
                                onConfirm={() => {
                                    closePopup();
                                }}
                            />
                        </div>
                    )}

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
        </>
    )
}

export default Users;