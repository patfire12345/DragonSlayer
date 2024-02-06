import { Button, Container, Heading, VStack, HStack, Textarea, Select, Input, Radio, RadioGroup } from "@chakra-ui/react";
import DataTable, { TableData } from "./DataTable";

import { extractCsvStrings } from "../utils/extractionUtils";
import { usePapaParse } from "react-papaparse";
import { useEffect, useState } from "react";

export default function CsvParser() {
  const { readString } = usePapaParse();
  const [userInput, setUserInput] = useState<string>("");
  const [tables, setTables] = useState<TableData[]>([]);
  const [delimiter, setDelimiter] = useState<string>("");
  const [customDelimiter, setCustomDelimiter] = useState<string>("");
  const [tolerance, setTolerance] = useState<number>(1);
  const tab = "\t";

  useEffect(() => {
    setCustomDelimiter("")
  },[delimiter])

  const handleParseCSV = () => {
    setTables([]);

    const tableList = extractCsvStrings(userInput, delimiter === "custom" ? customDelimiter : delimiter, tolerance);

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
        {
          delimiter === "custom" ?
          <HStack>
            <label>Custom Delimiter: </label>
            <Input value={customDelimiter} placeholder="eg. |" name="custom" id="custom" onChange={(e) => setCustomDelimiter(e.target.value)}/>
          </HStack> : null
        }
        <RadioGroup defaultValue={String(tolerance)} onChange={(e) => setTolerance(Number(e))}>
          <label>Tolerance: (Optional: Recommended Value is 1, increment by 1 if not parsing correctly) </label>
          <Radio value="1">1</Radio>
          <Radio value="2">2</Radio>
          <Radio value="3">3</Radio>
        </RadioGroup>
        <Textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Paste CSV here..."
          rows={10}
        />
        <Button onClick={() => handleParseCSV()} colorScheme="blue">Parse CSV</Button>
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
