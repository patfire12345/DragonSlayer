import { Button, Container, Stack, Textarea } from "@chakra-ui/react";

import DataTable from "./DataTable";
import { usePapaParse } from "react-papaparse";
import { useState } from "react";

export default function CsvParser() {
  const [userInput, setUserInput] = useState<string>("");
  const { readString } = usePapaParse();
  const [tableData, setTableData] = useState<any[]>([]);

  const handleReadString = () => {
    readString(userInput, {
      worker: true,
      complete: (results) => {
        setTableData(results.data);
      },
    });
  };

  return (
    <Container centerContent>
      <Stack spacing="1rem">
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Paste CSV here..."
          rows={10}
        />
        <Button onClick={() => handleReadString()}>Parse CSV</Button>
        <DataTable data={tableData} />
      </Stack>
    </Container>
  );
}
