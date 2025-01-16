import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToCSV = (data, headers) => {
    const csvContent = [
        headers.join(','), // Header row
        ...data.map((row) => headers.map((header) => `"${row[header]}"`).join(',')), // Data rows
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};


export const exportToXML = (data, visibleColumns) => {
    // Function to create valid XML element names
    const makeValidXMLName = (name) => {
        // Replace invalid characters and ensure valid XML element name
        return name
            .replace(/[^a-zA-Z0-9_-]/g, '_')  // Replace invalid chars with underscore
            .replace(/^[^a-zA-Z_]/, '_')      // Ensure first char is letter or underscore
            .replace(/\s+/g, '_');            // Replace spaces with underscore
    };

    // Function to escape special XML characters
    const escapeXML = (str) => {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };

    // Create XML content with proper formatting
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <exportData>
        ${data.map(row => {
            return `    <record>
            ${visibleColumns.map(col => {
                const validXMLName = makeValidXMLName(col);
                const value = escapeXML(row[col]);
                return `        <${validXMLName}>${value}</${validXMLName}>`;
            }).join('\n')}
        </record>`;
        }).join('\n')}
    </exportData>`;

    // Create and download the file
    try {
        const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().split('T')[0];
        
        link.setAttribute('href', url);
        link.setAttribute('download', `export_${timestamp}.xml`);
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    } catch (error) {
        console.error('Error exporting XML:', error);
        throw new Error('Failed to export XML file');
    }
};

export const exportToPDF = (data, visibleColumns) => {
    const doc = new jsPDF();
    const tableData = data.map((row) =>
        visibleColumns.map((col) => row[col])
    );
    const headers = [visibleColumns];

    doc.text("Exported Data", 14, 10);
    doc.autoTable({
        head: headers,
        body: tableData,
    });
    doc.save("export.pdf");
};