import {
  Box,
  Button,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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

  const handleParseCSV = (onlyTable: boolean) => {
    setTables([]);

    if (onlyTable) {
      readString(userInput, {
        complete: (results) => {
          setTables((prevTables) => [...prevTables, results.data as TableData]);
        },
        delimitersToGuess: [",", "	", "|", ";", "\\t", " ", "\\n", "\\r"],
      });
    } else {
      const tableList = extractTableStrings(
        userInput,
        delimiter === "custom" ? customDelimiter : delimiter,
        tolerance
      );

      tableList.forEach((tableString) => {
        readString(tableString, {
          complete: (results) => {
            setTables((prevTables) => [
              ...prevTables,
              results.data as TableData,
            ]);
          },
          delimitersToGuess: [",", "	", "|", ";", "\\t", " ", "\\n", "\\r"],
        });
      });
    }
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Table Extractor</Tab>
        <Tab>Table Only Parser</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <VStack spacing="1rem" padding="1rem" align="flex-start">
            <Heading as="h1">Table Extractor</Heading>
            <Text as="b">
              Use this tab to extract tables from a prompt that may contain
              multiple tables. You can configure the parser options and set the
              delimiter and tolerance level for table extraction.
            </Text>

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
            <Heading as="h1">Table Only Parser</Heading>
            <Text as="b">
              Use this tab if you want to parse a single table from a CSV input.
              This can be more reliable than the Table Extractor if your CSV
              contains only one table, and you want to parse it directly.
            </Text>
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
