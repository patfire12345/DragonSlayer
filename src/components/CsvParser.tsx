import { usePapaParse } from "react-papaparse";

type Props = {
  csvString: string;
};

export default function CsvParser({ csvString }: Props) {
  const { readString } = usePapaParse();

  const handleReadString = () => {
    readString(csvString, {
      worker: true,
      complete: (results) => {
        console.log(results.data);
      },
    });
  };

  return <button onClick={() => handleReadString()}>Parse CSV</button>;
}
