import { fileToArray } from "../utils";

export const d9Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(9, filename);
  var tileLocations: number[][] = [];

  for (const line of input) {
    const individualChars = line.split(",");
    const individualNumbers = individualChars.map((char) => Number(char));
    tileLocations.push(individualNumbers);
  }

  let squareDistancesGrid = calculateSquareAreas(tileLocations);
  const largestArea = maxSquareArea(squareDistancesGrid);

  console.log(`Day 9, Part 1 Solution: ${largestArea}`);
};

export const d9Part2 = async (
  filename: string = "",
  connections: number
): Promise<void> => {
  const input = await fileToArray(9, filename);
  var tileLocations: number[][] = [];

  for (const line of input) {
    const individualChars = line.split(",");
    const individualNumbers = individualChars.map((char) => Number(char));
    tileLocations.push(individualNumbers);
  }
};

const calculateSquareAreas = (tileLocations: number[][]) => {
  let squareDistancesGrid: number[][][] = [];

  for (let i = 0; i < tileLocations.length; i++) {
    for (let j = i + 1; j < tileLocations.length; j++) {
      let squareDistance =
        (Math.max(tileLocations[i][0], tileLocations[j][0]) - Math.min(tileLocations[i][0], tileLocations[j][0]) + 1) *
        (Math.max(tileLocations[i][1], tileLocations[j][1]) - Math.min(tileLocations[i][1], tileLocations[j][1]) + 1);
      squareDistancesGrid.push([
        [tileLocations[i][0], tileLocations[i][1]],
        [Math.abs(squareDistance)],
        [tileLocations[j][0], tileLocations[j][1]],
      ]);
    }
  }
  return squareDistancesGrid;
};

const maxSquareArea = (squareDistancesGrid: number[][][]): number => {
  squareDistancesGrid.sort((a, b) => b[1][0] - a[1][0]);
  return squareDistancesGrid[0][1][0];
}
