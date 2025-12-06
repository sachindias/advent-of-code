import { fileToArray } from "../utils";

export const d6Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(6, filename);
  const allCharacters: string[][] = [];

  for (const line of input) {
    const individualChars = line.split(" ");
    const cleaned = individualChars.filter((item) => item.trim() !== "");
    allCharacters.push(cleaned);
  }

  const totalCount = tallyColumns(allCharacters);
  console.log(`Day 6, Part 1 Solution: ${totalCount}`);
};

const tallyColumns = (allCharacters: string[][]): number => {
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
