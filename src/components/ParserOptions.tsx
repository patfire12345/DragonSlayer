import {
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  VStack,
} from "@chakra-ui/react";

type Props = {
  delimiter: string;
  setDelimiter: (value: string) => void;
  customDelimiter: string;
  setCustomDelimiter: (value: string) => void;
  tolerance: number;
  setTolerance: (value: number) => void;
};

export const delimiterOptions = [
  { value: ",", text: "CSV (,)" },
  { value: "\t", text: 'TSV ("  ")' },
  { value: "custom", text: "Custom" },
];

export const toleranceOptions = [
  { value: 1, text: 1 },
  { value: 2, text: 2 },
  { value: 3, text: 3 },
];

export default function ParserOptions(props: Props) {
  const {
    delimiter,
    setDelimiter,
    customDelimiter,
    setCustomDelimiter,
    tolerance,
    setTolerance,
  } = props;

  return (
    <VStack spacing="1rem">
      <HStack>
        <label htmlFor="delimiter">Delimiter: </label>
        <Select
          name="delimiter"
          id="delimiter"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
        >
          {delimiterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </Select>
      </HStack>
      {delimiter === "custom" ? (
        <HStack>
          <label htmlFor="custom">Custom Delimiter: </label>
          <Input
            value={customDelimiter}
            placeholder="eg. |"
            name="custom"
            id="custom"
            onChange={(e) => setCustomDelimiter(e.target.value)}
          />
        </HStack>
      ) : null}
      <RadioGroup
        defaultValue={String(tolerance)}
        onChange={(e) => setTolerance(Number(e))}
      >
        <label>
          Tolerance: (Optional: Recommended Value is 1, increment by 1 if not
          parsing correctly)
        </label>
        {toleranceOptions.map((option) => (
          <Radio key={option.value} value={String(option.value)} ml="1rem">
            {option.text}
          </Radio>
        ))}
      </RadioGroup>
    </VStack>
  );
}
