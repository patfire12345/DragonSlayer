import DataTable from "./DataTable";
import { usePapaParse } from "react-papaparse";
import { useState } from "react";

export default function CsvParser() {
  const [csvString, setCsvString] = useState<string>("");
  const { readString } = usePapaParse();
  const [tableData, setTableData] = useState<any[]>([]);

  const handleReadString = () => {
    readString(csvString, {
      worker: true,
      complete: (results) => {
        setTableData(results.data);
      },
    });
  };

  return (
    <div>
      <textarea
        value={csvString}
        onChange={(e) => setCsvString(e.target.value)}
        placeholder="Paste CSV here..."
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={() => handleReadString()}>Parse CSV</button>

      <DataTable data={tableData} />
    </div>
  );
}
