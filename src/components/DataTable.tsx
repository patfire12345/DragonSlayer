import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export type TableData = string[][];

type Props = {
  data: TableData;
};

export default function DataTable({ data }: Props) {
  if (data.length === 0) {
    return null;
  }

  return (
    <Box maxW="100%" overflowX="scroll">
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            {data[0].map((header: string, index: number) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.slice(1).map((row: string[], rowIndex: number) => (
            <Tr key={rowIndex}>
              {row.map((cell: string, cellIndex: number) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
