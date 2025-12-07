import { fileToArray } from "../utils";

export const d7Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(7, filename);
  var allCharacters: string[][] = [];

  for (const line of input) {
    const individualChars = line.split("");
    allCharacters.push(individualChars);
  }

  allCharacters = beamSplitter(allCharacters)
  let beamSplitCount = beamSplitCounter(allCharacters)


  console.log(`Day 7, Part 1 Solution: ${beamSplitCount}`);
};

const beamSplitter = (allCharacters: string[][]): string[][] => {
  for (let i = 0; i < allCharacters.length - 1; i++) {
    for (let j = 0; j < allCharacters[0].length; j++) {
      if (allCharacters[i][j] === "S" || allCharacters[i][j] === "|") {
        if (allCharacters[i + 1][j] === ".") {
          allCharacters[i + 1][j] = "|";
        } else if (allCharacters[i + 1][j] === "^") {
          if (allCharacters[i + 1][j + 1] != "^")
            allCharacters[i + 1][j + 1] = "|";
          if (allCharacters[i + 1][j + 1] != "^")
            allCharacters[i + 1][j - 1] = "|";
        }
      }
    }
  }

  return allCharacters;
};

const beamSplitCounter = (allCharacters: string[][]): number => {
  let beamSplitCount = 0;
  for (let i = 1; i < allCharacters.length; i++) {
    for (let j = 0; j < allCharacters[0].length; j++) {
      if (
        allCharacters[i][j] === "^" &&
        (allCharacters[i - 1][j] === "|" || allCharacters[i - 1][j] === "S") &&
        allCharacters[i][j + 1] === "|" &&
        allCharacters[i][j - 1] === "|"
      ) {
        beamSplitCount++;
      }
    }
  }
  return beamSplitCount
}