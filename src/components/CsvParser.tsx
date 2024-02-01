import { Button, Container, Stack, Textarea } from "@chakra-ui/react";

import DataTable from "./DataTable";
import { usePapaParse } from "react-papaparse";
import { useState } from "react";

export default function CsvParser() {
  const [userInput, setUserInput] = useState<string>("");
  const { readString } = usePapaParse();
  const [tableData, setTableData] = useState<any[]>([]);

  const parseText = (text: string, delimitter: string, tolerance: number, numberOfTables: number) => {
    const splitText = text.split("\n")
    const tableList = []

    let tableCounter = 0;
    let i = 0;

    while (tableCounter < numberOfTables) {
      let delimitterCount = 0;
      let headerRowFound = false;
      const newSplitText = []

      while (i < splitText.length) {
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

          i++;
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

        else {
          break
        }

        i++;
      }

      tableList.push(newSplitText.join("\n"))
      tableCounter++;
    }

    return tableList
  }

  // NEED TO FIX, DATA NOT RENDERING
  const handleReadString = () => {
    const tableList = parseText(userInput,"\t",1,2);
    const updatedTableList = [];

    tableList.forEach((data) => {
      readString(data, {
        worker: true,
        complete: (results) => {
          updatedTableList.push(results.data);
          console.log(updatedTableList,0)
        },
      });
    })

    setTableData([...updatedTableList])
  }

    

  const displayTables = () => {
    return (
      tableData.map((data) => {
        return (
          <DataTable data={data} />
        )
      })
    )
  }

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
        {tableData.length !== 0 ? displayTables() : null}
      </Stack>
    </Container>
  );
}
