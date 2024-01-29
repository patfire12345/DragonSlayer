import CsvParser from "./components/CsvParser";
import { sampleCsvData } from "./utils/sampleData";

function App() {
  return <CsvParser csvString={sampleCsvData} />;
}

export default App;
