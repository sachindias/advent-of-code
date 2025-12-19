import { fileToArray } from "../utils";

export const d7Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(7, filename);
  var allCharacters: string[][] = [];

  for (const line of input) {
    const individualChars = line.split("");
    allCharacters.push(individualChars);
  }

  allCharacters = beamSplitter(allCharacters);
  let beamSplitCount = beamSplitCounter(allCharacters);

  console.log(`Day 7, Part 1 Solution: ${beamSplitCount}`);
};

export const d7Part2 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(7, filename);
  var allCharacters: string[][] = [];

  for (const line of input) {
    const individualChars = line.split("");
    allCharacters.push(individualChars);
  }

  allCharacters = beamSplitter(allCharacters);

  // Counting the timelines per beam works similarly to Pascal's Triangle
  allCharacters = initialiseProbablePaths(allCharacters);
  allCharacters = calculateProbablePaths(allCharacters);

  // Counts up the number of timelines at the end of each beam
  let totalTimelineCount = 0;
  for (let i = 0; i < allCharacters[0].length; i++) {
    totalTimelineCount =
      totalTimelineCount + Number(allCharacters[allCharacters.length - 1][i]);
  }

  console.log(`Day 7, Part 2 Solution: ${totalTimelineCount}`);
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
  return beamSplitCount;
};

const initialiseProbablePaths = (allCharacters: string[][]): string[][] => {
  for (let i = 0; i < allCharacters.length; i++) {
    for (let j = 0; j < allCharacters[0].length; j++) {
      if (
        allCharacters[i][j] !== "S" &&
        allCharacters[i][j] !== "^" &&
        allCharacters[i][j] !== "|"
      ) {
        allCharacters[i][j] = "0";
      }

      if (allCharacters[i][j] === "S") {
        allCharacters[i][j] = "1";
      }
    }
  }
  return allCharacters;
};

const calculateProbablePaths = (allCharacters: string[][]): string[][] => {
  for (let i = 1; i < allCharacters.length; i++) {
    for (let j = 0; j < allCharacters[0].length; j++) {
      let timelineValue = 0;

      if (allCharacters[i][j] === "|") {
        timelineValue = timelineValue + Number(allCharacters[i - 1][j]);

        if (allCharacters[i][j + 1] === "^") {
          timelineValue = timelineValue + Number(allCharacters[i - 1][j + 1]);
        }

        if (allCharacters[i][j - 1] === "^") {
          timelineValue = timelineValue + Number(allCharacters[i - 1][j - 1]);
        }

        allCharacters[i][j] = String(timelineValue);
      }
    }
  }
  return allCharacters;
};
