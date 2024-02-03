import { Button, Container, Heading, Stack, Textarea } from "@chakra-ui/react";
import DataTable, { TableData } from "./DataTable";

import { extractCsvStrings } from "../utils/extractionUtils";
import { usePapaParse } from "react-papaparse";
import { useState } from "react";

export default function CsvParser() {
  const { readString } = usePapaParse();
  const [userInput, setUserInput] = useState<string>("");
  const [tables, setTables] = useState<TableData[]>([]);

  const handleParseCSV = () => {
    setTables([]);

    const tableList = extractCsvStrings(userInput, ",", 1);

    tableList.forEach((tableString) => {
      readString(tableString, {
        complete: (results) => {
          setTables((prevTables) => [...prevTables, results.data as TableData]);
        },
      });
    });
  };

  return (
    <Container maxW="4xl" p="1rem">
      <Stack spacing="1rem">
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Paste CSV here..."
          rows={10}
        />
        <Button onClick={() => handleParseCSV()}>Parse CSV</Button>
        {tables.map((table, index) => (
          <>
            <Heading
              as="h2"
              size="sm"
              textAlign="center"
              mt="1rem"
              mb="-0.5rem"
            >
              Table {index + 1}
            </Heading>
            <DataTable key={index} data={table} />
          </>
        ))}
      </Stack>
    </Container>
  );
}
