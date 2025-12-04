import { fileToArray } from "../utils";

export const d4Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(4, filename);
  const paperLocations: boolean[][] = [];

  for (const line of input) {
    const individual_chars = line.split("");
    const booleans = individual_chars.map((char) => char === "@");
    paperLocations.push(booleans);
  }

  const dimensions = {
    rowLength: paperLocations.length,
    columnLength: paperLocations[0].length,
  };

  var forklistAccessCount = 0;

  for (var row = 0; row < paperLocations.length; row++) {
    for (var col = 0; col < paperLocations[row].length; col++) {
      const currentPos = { row: row, col: col };
      const hasAdjacentUnderFour = checkAdjacents(
        paperLocations,
        currentPos,
        dimensions
      );

      if (hasAdjacentUnderFour) {
        forklistAccessCount++;
      }
    }
  }
  console.log(`Day 4, Part 1 Solution: ${forklistAccessCount}`);
};

export const d4Part2 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(4, filename);

  console.log(`Day 4, Part 2 Solution: `);
};

const checkAdjacents = (
  paperLocations: boolean[][],
  currentPos: { row: number; col: number },
  dimensions: { rowLength: number; columnLength: number }
): boolean => {
  if (paperLocations[currentPos.row][currentPos.col] === false) {
    return false;
  }

  var rollCounter = 0;

  if (
    currentPos.row !== 0 &&
    paperLocations[currentPos.row - 1][currentPos.col] === true
  ) {
    rollCounter++;
  }

  if (
    currentPos.row !== dimensions.rowLength - 1 &&
    paperLocations[currentPos.row + 1][currentPos.col] === true
  ) {
    rollCounter++;
  }

  if (
    currentPos.col !== 0 &&
    paperLocations[currentPos.row][currentPos.col - 1] === true
  ) {
    rollCounter++;
  }

  if (
    currentPos.col !== dimensions.columnLength - 1 &&
    paperLocations[currentPos.row][currentPos.col + 1] === true
  ) {
    rollCounter++;
  }

  if (
    currentPos.row !== 0 &&
    currentPos.col !== 0 &&
    paperLocations[currentPos.row - 1][currentPos.col - 1] === true
  ) {
    rollCounter++;
  }

  if (
    currentPos.row !== 0 &&
    currentPos.col !== dimensions.columnLength - 1 &&
    paperLocations[currentPos.row - 1][currentPos.col + 1] === true
  ) {
    rollCounter++;
  }

  if (
    currentPos.row !== dimensions.rowLength - 1 &&
    currentPos.col !== 0 &&
    paperLocations[currentPos.row + 1][currentPos.col - 1] === true
  ) {
    rollCounter++;
  }

  if (
    currentPos.row !== dimensions.rowLength - 1 &&
    currentPos.col !== dimensions.columnLength - 1 &&
    paperLocations[currentPos.row + 1][currentPos.col + 1] === true
  ) {
    rollCounter++;
  }

  if (rollCounter < 4) {
    return true;
  }

  return false;
};
