import DataTable from 'react-data-table-component';
import StudenList from '../../assets/api/StudentList';

const OldApplications = () => {

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Application No',
            selector: row => row.application_no,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Mobile',
            selector: row => row.mobile,
            sortable: true,
        },
        {
            name: 'Applied',
            selector: row => row.applied,
            sortable: true,
        },
        {
            name: 'Created At', 
            selector: row => row.created_at,
            sortable: true,
        },
        {
            name: 'Submission Date', 
            selector: row => row.submission_date,
            sortable: true,
        },
    ];

    return(
        <DataTable
			columns={columns}
			data={StudenList}
		/>
    )
}

export default OldApplications;