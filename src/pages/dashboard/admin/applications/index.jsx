import { useState, useEffect, useContext, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table";
import { RiRefreshLine } from "react-icons/ri";
import { TbFileExport } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { FaSortAmountDown } from "react-icons/fa";
import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";
import { BsCalendar2Check } from "react-icons/bs";
import { CgAddR } from "react-icons/cg";
import "jspdf-autotable";
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import { DateRangePicker } from 'react-date-range';
import { format  } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { UserContext } from "../../../../context/UserContext";
import { exportToCSV, exportToXML, exportToPDF } from "./UsersExportFileTypes";
import useAxios from "../../../../hooks/UseAxios";
import TableColumn from "./TableColumn";
import Searchbar from "../../../../components/ui/Searchbar";
import Iconsbutton from "../../../../components/ui/Iconsbutton";
import Button from "../../../../components/ui/Button";


const Applications = () => {

    const { userData } = useContext(UserContext);
    const getApplications = useAxios('applications', 'get', {headers: {Authorization: `Bearer ${userData.token}`}});
    const ApplciationData = getApplications.data?.data;

    // send Api reuest for delete application
    const {fetchData: handleDeleteApplication, status: deleteStatus} = useAxios(null, 'delete', {headers: {Authorization: `Bearer ${userData.token}`}});

    // send api request for download application pdf
    const {data: applicationPdf, fetchData: getApplicationPdf, status: applicationStatus, loading: applicationLoading} = useAxios(null, 'get', 
        {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${userData.token}`,
                'Accept': 'application/pdf',
            }
        }
    );

    useEffect(() => {
        const fetchData = async () => {
            await getApplications.fetchData();
        };
        fetchData();
    }, [deleteStatus])

    const [menuOpen, setMenuOpen] = useState(null);

    const toggleMenu = (rowIndex) => {
        setMenuOpen(menuOpen === rowIndex ? null : rowIndex);
    };

    const navigate = useNavigate();

    const deletedApplication = (name) => {
        toast.success(name + ' application deleted successfully');
    };

    const onAction = (action, rowData) => {

        console.log(`Action: ${action}`, rowData);

        if(action === 'edit'){
            navigate(`/admin/application/${rowData}`);
        }

        if(action === 'download'){
            getApplicationPdf({
                url: `applications/${rowData}/pdf`,
            })
            setMenuOpen(false);
        }

        if(action === 'delete'){
            handleDeleteApplication({
                url: `applications/${rowData.id}`,
            })
            deletedApplication(rowData.name);
            setMenuOpen(false);
        }
        
    };

    // after geting sucessfully status its dowload the application to your system
    useEffect(() => {
        if(applicationStatus === 200){
            // Convert the PDF data into a Blob
            const file = new Blob([applicationPdf], {type: 'application/pdf'});

            // Create a temporary URL for the Blob
            const fileURL = window.URL.createObjectURL(file);

            // Create a temporary anchor element
            const a = document.createElement("a");
            a.href = fileURL;
            a.download = "application.pdf";

            // Append the anchor to the document body and trigger a click
            document.body.appendChild(a);
            a.click();

            // Clean up the temporary anchor and URL
            document.body.removeChild(a);
            window.URL.revokeObjectURL(fileURL);
        }
    }, [applicationStatus, applicationPdf])


    const [selectedStatuses, setSelectedStatuses] = useState([]);

    const toggleStatus = (status) => {
        setSelectedStatuses((prev) =>
            prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
        );
    };

    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [showRangeDate, setShowRangeDate] = useState(false);

    const byDefaultRangeDate = [
        {
            startDate: new Date('2025-01-01'),
            endDate: new Date(),
            key: 'selection'
        }
    ]

    const [state, setState] = useState(byDefaultRangeDate);

    const filteredData = useMemo(() => {
        if (!ApplciationData) return [];
    
        // Get selected start and end dates
        const startDate = state[0].startDate;
        const endDate = state[0].endDate;
    
        return ApplciationData.filter((app) => {
            const appDate = new Date(app.created_at); // Replace 'created_at' with the relevant date field in your data
            const isWithinDateRange =
                appDate >= startDate && appDate <= endDate;
    
            // Apply status filter along with date filter
            const isStatusMatch =
                selectedStatuses.length === 0 || selectedStatuses.includes(app.status);
    
            return isWithinDateRange && isStatusMatch;
        });
    }, [ApplciationData, selectedStatuses, state]);

    const formattedDateRange = `${format(state[0].startDate, 'MM/dd/yyyy')} - ${format(state[0].endDate, 'MM/dd/yyyy')}`;

    const table = useReactTable({
        data: filteredData,
        columns: TableColumn({ onAction, toggleMenu, menuOpen }),
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        state:{
            globalFilter,
            sorting,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        autoResetPageIndex: false, 
        initialState: {
            pagination: {
                pageIndex: 0, 
                pageSize: 5, 
            },
        },
    })

    const handleExport = (type) => {
        // Get visible columns (excluding hidden ones)
        const visibleColumns = table
            .getAllColumns()
            .filter((column) => column.getIsVisible() && column.id !== "Actions") // Exclude "actions" field
            .map((column) => ({
                id: column.id,
                header: column.columnDef.header,
            }));
    
        // Prepare the export data using the visible columns
        const exportData = table.getRowModel().rows.map((row) => {
            const rowData = {};
            visibleColumns.forEach((column) => {
                let value = row.getValue(column.id);

                // Apply the date formatting for specific columns
                if (column.id === 'submitted_at') {
                    value = value ? moment(value).format('D MMM, YYYY hh:mma') : 'N/A';
                }

                rowData[column.header] = value;
            });
            return rowData;
        });
    
        // Export data based on type
        if (type === "csv") exportToCSV(exportData, visibleColumns.map((col) => col.header));
        if (type === "xml") exportToXML(exportData, visibleColumns.map((col) => col.header));
        if (type === "pdf") exportToPDF(exportData, visibleColumns.map((col) => col.header));
    };      

    // Reset function
    const resetFiltersAndSettings = () => {
        // Reset global filter (search)
        setGlobalFilter("");
        
        // Reset sorting
        setSorting([]);
        
        // Reset selected statuses
        setSelectedStatuses([]);
        
        // Reset date range to initial state
        setState(byDefaultRangeDate);
        
        // Reset pagination to first page
        table.setPageIndex(0);
        
        // Reset page size to default (5)
        table.setPageSize(5);
        
        // Reset any open dropdowns
        setShowRangeDate(false);
        
        // Reset column visibility to show all columns
        table.getAllColumns().forEach(column => {
            if (column.getCanHide()) {
                column.toggleVisibility(true);
            }
        });
    };

    return(
        <div className="applications">

            <div className="flex gap-2.5 justify-end items-center mt-4 mb-9">
                <Button
                    classname="flex items-center [&]:rounded-full [&]:px-4 w-auto"
                    icon={<CgAddR className="text-xl mr-2" />}
                    text="Add Students"
                    className="text-white-default"
                    onclick={() => navigate('/admin/addnew-application')}
                />
            </div>

            <div className="bg-white-default py-5 rounded-lg pb-0">

                <div className="flex justify-between items-center mb-9 px-5">
                    <h2 className="text-black-default capitalize">Applications</h2>

                    <div className="flex items-center gap-2.5">

                        <Iconsbutton 
                            icon={<RiRefreshLine className="text-black-300" size={20} />} 
                            onclick={resetFiltersAndSettings}
                        />

                        {/* Submitted Date Dropdown */}
                        <div className="relative">
                            <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white-300 cursor-pointer" onClick={() => setShowRangeDate(!showRangeDate)}>
                                <BsCalendar2Check className="text-black-300 mr-2" size={15} />
                                <span className="text-black-300 capitalize text-base font-normal">
                                    {formattedDateRange}
                                </span>
                                <IoIosArrowDown className={`text-black-default ml-2 ease-linear duration-300 ${showRangeDate ? 'rotate-180' : 'rotate-0'}`} />
                            </div>
                            <div className={`flex flex-col items-end text-black-default absolute w-max top-12 right-0 bg-white-default shadow-md rounded-md z-50 p-2 ease-linear duration-300
                                ${showRangeDate ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-[30px]'}`}>
                                <DateRangePicker
                                    onChange={item => setState([item.selection])}
                                    showSelectionPreview={true}
                                    moveRangeOnFirstSelection={false}
                                    months={2}
                                    ranges={state}
                                    direction="horizontal"
                                />
                                <Button
                                    classname="[&]:rounded-full [&]:py-2" 
                                    text="Apply"
                                    onclick={() => setShowRangeDate(!showRangeDate)}
                                />
                            </div>
                        </div>

                        {/* Export Dropdown */}
                        <div className="relative group">
                            <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white-300 cursor-pointer">
                                <TbFileExport className="text-black-300 mr-2" size={20} />
                                <span className="text-black-300 capitalize text-base font-normal">
                                    Export
                                </span>
                                <IoIosArrowDown className='text-black-default ml-2 ease-linear duration-300 rotate-0 group-hover:rotate-180' />
                            </div>
                            <div className='absolute top-12 right-0 bg-white-default shadow-md rounded-md z-50 p-2 ease-linear duration-300
                                    invisible opacity-0 translate-y-[30px] group-hover:visible group-hover:opacity-100 group-hover:translate-y-0'>
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
                        
                        {/* Status Dropdown */}
                        <div className="relative group">
                            <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white-300 cursor-pointer">
                                <FiFilter className="text-black-300 mr-2" size={18} />
                                <span className="text-black-300 text-base font-normal">
                                    Status
                                </span>
                                <IoIosArrowDown className='text-black-default ml-2 ease-linear duration-300 rotate-0 group-hover:rotate-180' />
                            </div>
                            <div className='absolute top-12 right-0 bg-white-default shadow-md rounded-md z-50 ease-linear duration-300
                                invisible opacity-0 translate-y-[30px] group-hover:visible group-hover:opacity-100 group-hover:translate-y-0'>
                                {['draft', 'submitted', 'changes_requested', 'completed', 'cancelled'].map((status) => {
                                    return(
                                        <label key={status} className="flex items-center gap-x-2 py-2 px-2.5 cursor-pointer hover:bg-success-300">
                                            <input
                                                className="w-auto sr-only peer"
                                                type="checkbox"
                                                checked={selectedStatuses.includes(status)}
                                                onChange={() => toggleStatus(status)}
                                            />
                                            <div className="peer-checked:bg-success-default bg-transparent w-[18px] h-[18px] border border-solid border-black-300 rounded relative
                                                after:content-['] after:absolute after:top-[3px] after:left-1.5 after:w-1 after:h-2 after:border-r peer-checked:border-success-default
                                                after:border-b after:border-solid after:border-white-default after:rotate-45"></div>
                                            <span className="text-black-300 capitalize text-base font-medium">{status}</span>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Column Visibilty Dropdown */}
                        <div className="relative group">

                            <div className="flex items-center justify-center px-5 py-2.5 rounded-full bg-white-300 cursor-pointer">
                                <FaSortAmountDown className="text-black-300 mr-2" />
                                <span className="text-black-300 capitalize text-base font-normal">
                                    Columns
                                </span>
                                <IoIosArrowDown className='text-black-default ml-2 ease-linear duration-300 group-hover:rotate-180 rotate-0' />
                            </div>

                            {/* Column Visibility Controls */}
                            <div className='flex flex-col w-48 bg-white-default absolute shadow-md top-12 right-0 rounded-md z-50 ease-linear duration-300 
                                border border-solid border-black-100 invisible opacity-0 translate-y-[30px] group-hover:visible group-hover:opacity-100 group-hover:translate-y-0'>
                                {table.getAllColumns().map((column) => (
                                    <label key={column.id} className="flex items-center gap-x-2 py-2 px-2.5 cursor-pointer hover:bg-success-300">
                                        <input
                                            className="w-auto sr-only peer"
                                            type="checkbox"
                                            checked={column.getIsVisible()}
                                            disabled={!column.getCanHide()}
                                            onChange={column.getToggleVisibilityHandler()}
                                        />
                                        <div className="peer-checked:bg-success-default bg-transparent w-[18px] h-[18px] border border-solid border-black-300 rounded relative
                                            after:content-['] after:absolute after:top-[3px] after:left-1.5 after:w-1 after:h-2 after:border-r peer-checked:border-success-default
                                            after:border-b after:border-solid after:border-white-default after:rotate-45"></div>
                                        <span className="text-black-300 capitalize text-base font-medium">{column.columnDef.header}</span>
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
                            value={table.getState().pagination.pageSize}
                            onChange={e => {table.setPageSize(Number(e.target.value))}}
                        >
                            {[5,10,15,20].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Searchbar
                        icon={false}
                        placeholder="Search"
                        className="bg-white-default px-5 py-3 border border-solid border-black-100"
                        value={globalFilter || ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>

                <table className="table w-full mt-5">
                    <thead className="bg-primary-100 text-black-default">
                        {table.getHeaderGroups().map((headerGroup) => {
                            return (
                                <tr key={headerGroup.id} >
                                    {headerGroup.headers.map((header) => {
                                        return(
                                            <th 
                                                key={header.id}
                                                onClick={header.column.getToggleSortingHandler()}
                                                style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                                                className={`text-left py-3 px-4 text-base font-medium text-black-default leading-5 ${header.column.columnDef.accessorKey === 'Actions' ? 'w-[160px]' : ''}`} 
                                            >
                                                <div className="flex items-center justify-between w-full">
                                                    {header.column.columnDef.header}
                                                    <span className="ml-2 flex flex-col items-center">
                                                        <BiCaretUp
                                                            size={14}
                                                            className={header.column.getIsSorted() === "asc" ? "text-black" : "text-black-200"}
                                                        />
                                                        <BiCaretDown
                                                            size={14}
                                                            className={`-mt-1.5 ${header.column.getIsSorted() === "desc" ? "text-black" : "text-black-200"}`}
                                                        />
                                                    </span>
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </thead>
                    <tbody>
                    {getApplications.loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index} className="animate-pulse bg-gray-100">
                                    <td className="px-5 py-3.5" colSpan={table.getAllColumns().length}>
                                        <div className="h-4 bg-gray-300 rounded"></div>
                                    </td>
                                </tr>
                            ))
                        : table.getRowModel().rows.map((row) => (
                                <tr id={row.original.id} key={row.id} className="bg-white-default text-black-default text-left border-b">
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            className={`px-5 py-3.5 ${
                                                cell.column.columnDef.accessorKey === 'Actions' ? 'w-[160px]' : ''
                                            }`}
                                            key={cell.id}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>


                {/* pagination */}
                <div className="text-base flex items-center justify-between p-5">

                    <div className="text-black-default">
                        {`Showing ${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} `}
                        to 
                        {` ${Math.min(
                            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                            filteredData.length
                        )} of ${filteredData.length} entries`}
                    </div>


                    <div className="flex items-center gap-x-4">

                        {/* Previous Button */}
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className={`${
                                table.getCanPreviousPage()
                                    ? "text-black-default"
                                    : "text-black-200 cursor-not-allowed"
                            }`}
                        >
                            Prev
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: table.getPageCount() }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => table.setPageIndex(index)}
                                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                    table.getState().pagination.pageIndex === index
                                        ? 'bg-primary-default text-white-default'
                                        : 'bg-transparent text-black-default'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className={`${
                                table.getCanNextPage()
                                    ? "text-black-default"
                                    : "text-black-200 cursor-not-allowed"
                            }`}
                        >
                            Next
                        </button>

                    </div>


                </div>



            </div>
        </div>
    )
}

export default Applications