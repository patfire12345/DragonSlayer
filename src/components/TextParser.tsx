import {
  Box,
  Button,
  Heading,
  Textarea,
  VStack,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel
} from "@chakra-ui/react";
import DataTable, { TableData } from "./DataTable";
import { useEffect, useState } from "react";

import ParserOptions from "./ParserOptions";
import { extractTableStrings, extractOnlyTable } from "../utils/extractionUtils";
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

  const handleParseCSV = (onlyTable: boolean) => {
    setTables([]);

    const tableList = onlyTable ? extractOnlyTable(
      userInput,
    ) : extractTableStrings(
      userInput,
      delimiter === "custom" ? customDelimiter : delimiter,
      tolerance
    );

    tableList.forEach((tableString) => {
      readString(tableString, {
        complete: (results) => {
          setTables((prevTables) => [...prevTables, results.data as TableData]);
        },
      });
    });
  };

  return (
    <Tabs>
      <TabList>
        <Tab>With Text</Tab>
        <Tab>Without Text</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <VStack spacing="1rem" padding="1rem" align="flex-start">
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
              variant="filled"
              rows={10}
            />
            <Button onClick={() => handleParseCSV(false)} colorScheme="blue">
              Parse CSV
            </Button>
            {tables.length === 0 ? (
              <Heading as="h2" size="sm">
                No tables detected!
              </Heading>
            ) : (
              tables.map((table, index) => (
                <Box key={index} maxW="100%">
                  <Heading as="h2" size="sm">
                    Table {index + 1}
                  </Heading>
                  <DataTable key={index} data={table} />
                </Box>
              ))
            )}
          </VStack>
        </TabPanel>
        <TabPanel>
          <VStack spacing="1rem" padding="1rem" align="flex-start">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Paste CSV here..."
              variant="filled"
              rows={10}
            />
            <Button onClick={() => handleParseCSV(true)} colorScheme="blue">
              Parse CSV
            </Button>
            {tables.length === 0 ? (
              <Heading as="h2" size="sm">
                No tables detected!
              </Heading>
            ) : (
              tables.map((table, index) => (
                <Box key={index} maxW="100%">
                  <Heading as="h2" size="sm">
                    Table {index + 1}
                  </Heading>
                  <DataTable key={index} data={table} />
                </Box>
              ))
            )}
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
