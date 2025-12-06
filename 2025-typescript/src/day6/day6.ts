import { fileToArray } from "../utils";

export const d6Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(6, filename);
  const allCharacters: string[][] = [];

  for (const line of input) {
    const individualChars = line.split(" ");
    const cleaned = individualChars.filter((item) => item.trim() !== "");
    allCharacters.push(cleaned);
  }

  const totalCount = tallyColumnsNormalMaths(allCharacters);
  console.log(`Day 6, Part 1 Solution: ${totalCount}`);
};

export const d6Part2 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(6, filename);
  const allCharacters: string[][] = [];
  const allCharactersCleaned: string[][] = [];

  // Split each line into individual characters
  for (const line of input) {
    const individualChars = line.split("");
    allCharacters.push(individualChars);
  }

  // Find locations of empty strings in all rows
  let emptyStringLocations: number[] = [];
  let realEmptyStringLocations: number[] = [-1];

  for (let i = 0; i < allCharacters.length - 1; i++) {
    for (let j = 0; j < allCharacters[i].length; j++) {
      if (allCharacters[i][j] === " ") {
        emptyStringLocations.push(j);
      }
    }
  }

  // Determine real empty string locations that are common across rows
  for (let i = 0; i < emptyStringLocations.length; i++) {
    if (
      emptyStringLocations.filter((num) => num === emptyStringLocations[i])
        .length ===
      allCharacters.length - 1
    ) {
      realEmptyStringLocations.push(emptyStringLocations[i]);
    }
  }

  let realEmptyStringLocationsSet = [...new Set(realEmptyStringLocations)];
  realEmptyStringLocationsSet.push(allCharacters[0].length);

  // Clean the allCharacters array based on real empty string locations
  for (let i = 1; i < realEmptyStringLocationsSet.length; i++) {
    let cleanedRow: string[] = [];
    for (let j = 0; j < allCharacters.length; j++) {
      let cleanedValue = "";
      for (let k = 0; k < allCharacters[j].length; k++) {
        if (
          k > realEmptyStringLocationsSet[i - 1] &&
          k < realEmptyStringLocationsSet[i]
        ) {
          cleanedValue += allCharacters[j][k];
        }
      }
      cleanedRow.push(cleanedValue);
    }
    allCharactersCleaned.push(cleanedRow);
  }

  const totalCount = tallyColumnsCephalopodMaths(allCharactersCleaned);
  console.log(`Day 6, Part 2 Solution: ${totalCount}`);
};

const tallyColumnsNormalMaths = (allCharacters: string[][]): number => {
  var totalCount = 0;

  for (let i = 0; i < allCharacters[0].length; i++) {
    const Symbol = allCharacters[allCharacters.length - 1][i];

    let columnValues = Symbol === "*" ? 1 : 0;
    for (let j = 0; j < allCharacters.length - 1; j++) {
      if (Symbol === "*")
        columnValues = Number(allCharacters[j][i]) * columnValues;
      else columnValues = Number(allCharacters[j][i]) + columnValues;
    }
    totalCount += columnValues;
  }
  return totalCount;
};

const tallyColumnsCephalopodMaths = (allCharacters: string[][]): number => {
  var totalCount = 0;

  for (let i = 0; i < allCharacters.length; i++) {
    // Get the operation symbol for the column and set up the initial value
    const Symbol = allCharacters[i][allCharacters[i].length - 1].trim();

    // Find the maximum length of value in the column
    let maxLength = 0;
    for (let j = 0; j < allCharacters[i].length - 1; j++) {
      const valueLength = allCharacters[i][j].length;
      if (valueLength > maxLength) {
        maxLength = valueLength;
      }
    }

    // Build column values by processing each digit position
    let columnValuesArray: number[] = [];

    for (let k = 0; k < maxLength; k++) {
      let CephalopodValue = "";
      for (let j = 0; j < allCharacters[i].length - 1; j++) {
        var valueDigits = allCharacters[i][j][k];
        CephalopodValue += valueDigits ? valueDigits : "";
      }
      columnValuesArray.push(Number(CephalopodValue));
    }

    // Calculate the total for the column based on the operation symbol
    let columnValues = Symbol === "*" ? 1 : 0;
    for (let j = 0; j < columnValuesArray.length; j++) {
      if (Symbol === "*") columnValues = columnValuesArray[j] * columnValues;
      else columnValues = columnValuesArray[j] + columnValues;
    }
    totalCount += columnValues;
  }
  return totalCount;
};
