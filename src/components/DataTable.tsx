type Props = {
  data: any[];
};

export default function DataTable({ data }: Props) {
  if (data.length === 0) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          {data[0].map((header: string, index: number) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row: string[], rowIndex: number) => (
          <tr key={rowIndex}>
            {row.map((cell: string, cellIndex: number) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
