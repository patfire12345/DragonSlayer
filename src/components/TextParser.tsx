import {
  Box,
  Button,
  Container,
  Heading,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import DataTable, { TableData } from "./DataTable";
import { useEffect, useState } from "react";

import ParserOptions from "./ParserOptions";
import { extractTableStrings } from "../utils/extractionUtils";
import { usePapaParse } from "react-papaparse";

export default function TextParser() {
  const { readString } = usePapaParse();
  const [userInput, setUserInput] = useState<string>("");
  const [tables, setTables] = useState<TableData[]>([]);
  const [delimiter, setDelimiter] = useState<string>(",");
  const [customDelimiter, setCustomDelimiter] = useState<string>("");
  const [tolerance, setTolerance] = useState<number>(1);

  useEffect(() => {
    setCustomDelimiter("");
  }, [delimiter]);

  const handleParseCSV = () => {
    setTables([]);

    const tableList = extractTableStrings(
      userInput,
      delimiter === "custom" ? customDelimiter : delimiter,
      tolerance
    );

    console.log(tableList);
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
        <ParserOptions
          delimiter={delimiter}
          setDelimiter={setDelimiter}
          customDelimiter={customDelimiter}
          setCustomDelimiter={setCustomDelimiter}
          tolerance={tolerance}
          setTolerance={setTolerance}
        />
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Paste CSV here..."
          rows={10}
        />
        <Button onClick={() => handleParseCSV()} colorScheme="blue">
          Parse CSV
        </Button>
        {tables.length === 0 ? (
          <Heading as="h2" size="sm" textAlign="center" mt="1rem">
            No tables detected!
          </Heading>
        ) : (
          tables.map((table, index) => (
            <Box key={index}>
              <Heading as="h2" size="sm" textAlign="center">
                Table {index + 1}
              </Heading>
              <DataTable key={index} data={table} />
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
}
