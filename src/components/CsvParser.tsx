import { Button, Container, Stack, Textarea } from "@chakra-ui/react";

import DataTable from "./DataTable";
import { usePapaParse } from "react-papaparse";
import { useState } from "react";

export default function CsvParser() {
  const [userInput, setUserInput] = useState<string>("");
  const { readString } = usePapaParse();
  const [tableData, setTableData] = useState<any[]>([]);

  const parseText = (text: string, delimitter: string, tolerance: number) => {
    const splitText = text.split("\n")
    const newSplitText = []

    let delimitterCount = 0;
    let headerRowFound = false;

    for (let i = 0; i < splitText.length; i++) {
      if (!headerRowFound) {
        const headerText = splitText[i].split(" ")
        const csvHeaderText = headerText[headerText.length-1]

        if (csvHeaderText.includes(delimitter)) {
          newSplitText.push(csvHeaderText)
          headerRowFound = true
  
          for (let j = 0; j < csvHeaderText.length; j++) {
            if (csvHeaderText[j] === delimitter) {
              delimitterCount++;
            }
          }

          
        }

        continue
      }

      let innerDelimiterCount = 0
      for (let j = 0; j < splitText[i].length; j++) {
        if (splitText[i][j] === delimitter) {
          innerDelimiterCount++;
        }
      }

      if (innerDelimiterCount >= delimitterCount - tolerance && innerDelimiterCount <= delimitterCount + tolerance) {
        newSplitText.push(splitText[i])
      }
    }

    return newSplitText.join("\n")
  }

  const handleReadString = () => {
    readString(parseText(userInput,",",1), {
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
