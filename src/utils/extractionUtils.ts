export const extractTableStrings = (
  text: string,
  delimitter: string,
  tolerance: number
) => {
  const splitText = text.split("\n");
  const tableList = [];

  let i = 0;

  while (i < splitText.length) {
    let delimitterCount = 0;
    let headerRowFound = false;
    const newSplitText = [];

    while (i < splitText.length) {
      if (!headerRowFound) {
        const headerText = splitText[i].split(" ");
        const csvHeaderText = headerText[headerText.length - 1];

        if (csvHeaderText.includes(delimitter)) {
          newSplitText.push(csvHeaderText);
          headerRowFound = true;

          for (let j = 0; j < csvHeaderText.length; j++) {
            if (csvHeaderText[j] === delimitter) {
              delimitterCount++;
            }
          }
        }

        i++;
        continue;
      }

      let innerDelimiterCount = 0;
      for (let j = 0; j < splitText[i].length; j++) {
        if (splitText[i][j] === delimitter) {
          innerDelimiterCount++;
        }
      }

      if (
        innerDelimiterCount >= delimitterCount - tolerance &&
        innerDelimiterCount <= delimitterCount + tolerance
      ) {
        newSplitText.push(splitText[i]);
      } else {
        break;
      }

      i++;
    }

    if (newSplitText.length > 0) {
      tableList.push(newSplitText.join("\n"));
    }
  }

  return tableList;
};

export const extractOnlyTable = (  
  text: string,
  ) => {
    const splitText = text.split("\n");
    const newSplitText = [];
  
    let i = 0;
    

    while (i < splitText.length) {
      newSplitText.push(splitText[i]);

      i++;
    }
  
    return newSplitText;   
}
