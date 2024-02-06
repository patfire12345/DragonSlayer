import { Button, Container, Heading, VStack, HStack, Textarea, Select } from "@chakra-ui/react";
import DataTable, { TableData } from "./DataTable";

import { extractCsvStrings } from "../utils/extractionUtils";
import { usePapaParse } from "react-papaparse";
import { useEffect, useState } from "react";

export default function CsvParser() {
  const { readString } = usePapaParse();
  const [userInput, setUserInput] = useState<string>("");
  const [tables, setTables] = useState<TableData[]>([]);
  const [delimiter, setDelimiter] = useState<string>("");
  const tab = "\t";

  useEffect(() => {
    console.log(delimiter)
  },[delimiter])

  const handleParseCSV = () => {
    setTables([]);

    const tableList = extractCsvStrings(userInput, delimiter, 1);

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
      <VStack spacing="1rem">
        <HStack>
          <label>Delimiter: </label>
          <Select defaultValue={[","]} name="delimiter" id="delimiter" value={delimiter} onChange={(e) => setDelimiter(e.target.value)}>
            <option value=",">CSV (,)</option>
            <option value={tab}>TSV ("  ")</option>
            <option value="custom">Custom</option>
          </Select>
        </HStack>
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
      </VStack>
    </Container>
  );
}
