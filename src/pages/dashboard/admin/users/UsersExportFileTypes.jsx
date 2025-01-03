import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToCSV = (data, visibleColumns) => {
    const headers = visibleColumns.join(",") + "\n";
    const rows = data
        .map((row) =>
            visibleColumns.map((col) => row[col]).join(",")
        )
        .join("\n");
    const csvContent = headers + rows;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToXML = (data, visibleColumns) => {
    const xmlContent = `
    <rows>
        ${data
            .map(
                (row) =>
                    `<row>
                        ${visibleColumns
                            .map(
                                (col) =>
                                    `<${col}>${row[col]}</${col}>`
                            )
                            .join("\n")}
                    </row>`
            )
            .join("\n")}
    </rows>`;
    const blob = new Blob([xmlContent], { type: "application/xml;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "export.xml");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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