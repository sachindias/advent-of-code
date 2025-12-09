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

export const d9Part2 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(9, filename);
  var redTileLocations: number[][] = [];
  console.time("Day 9 Part 2");

  for (const line of input) {
    const individualChars = line.split(",");
    const individualNumbers = individualChars.map((char) => Number(char));
    redTileLocations.push(individualNumbers);
  }

  let squareDistancesGrid = calculateSquareAreas(redTileLocations);
  let perimeterTiles = locatePerimeterTiles(redTileLocations);

  squareDistancesGrid.sort((a, b) => b[1][0] - a[1][0]);

  let largestGreenRedSquareArea = findLargestGreenRedSquare(
    perimeterTiles,
    squareDistancesGrid
  );
  console.log(`Day 9, Part 1 Solution: ${largestGreenRedSquareArea}`);
};

const calculateSquareAreas = (tileLocations: number[][]) => {
  let squareDistancesGrid: number[][][] = [];

  for (let i = 0; i < tileLocations.length; i++) {
    for (let j = i + 1; j < tileLocations.length; j++) {
      let squareDistance =
        (Math.max(tileLocations[i][0], tileLocations[j][0]) -
          Math.min(tileLocations[i][0], tileLocations[j][0]) +
          1) *
        (Math.max(tileLocations[i][1], tileLocations[j][1]) -
          Math.min(tileLocations[i][1], tileLocations[j][1]) +
          1);
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
};

const locatePerimeterTiles = (redTileLocations: number[][]): number[][] => {
  let greenTileLocations: number[][] = [];

  // Add in the perimeter tiles between each pair of red tiles
  for (let i = 0; i < redTileLocations.length - 1; i++) {
    if (redTileLocations[i][0] === redTileLocations[i + 1][0]) {
      let newGreenTiles = [];
      for (
        let y =
          Math.min(redTileLocations[i][1], redTileLocations[i + 1][1]) + 1;
        y < Math.max(redTileLocations[i][1], redTileLocations[i + 1][1]);
        y++
      ) {
        newGreenTiles.push([redTileLocations[i][0], y]);
      }
      greenTileLocations = greenTileLocations.concat(newGreenTiles);
    }

    if (redTileLocations[i][1] === redTileLocations[i + 1][1]) {
      let newGreenTiles = [];
      for (
        let x =
          Math.min(redTileLocations[i][0], redTileLocations[i + 1][0]) + 1;
        x < Math.max(redTileLocations[i][0], redTileLocations[i + 1][0]);
        x++
      ) {
        newGreenTiles.push([x, redTileLocations[i][1]]);
      }
      greenTileLocations = greenTileLocations.concat(newGreenTiles);
    }
  }

  // Add in the perimeter tiles between the last and first red tiles
  if (
    redTileLocations[redTileLocations.length - 1][0] === redTileLocations[0][0]
  ) {
    let newGreenTiles = [];
    for (
      let y =
        Math.min(
          redTileLocations[redTileLocations.length - 1][1],
          redTileLocations[0][1]
        ) + 1;
      y <
      Math.max(
        redTileLocations[redTileLocations.length - 1][1],
        redTileLocations[0][1]
      );
      y++
    ) {
      newGreenTiles.push([redTileLocations[redTileLocations.length - 1][0], y]);
    }
    greenTileLocations = greenTileLocations.concat(newGreenTiles);
  }

  if (
    redTileLocations[0][1] === redTileLocations[redTileLocations.length - 1][1]
  ) {
    let newGreenTiles = [];
    for (
      let x =
        Math.min(
          redTileLocations[0][0],
          redTileLocations[redTileLocations.length - 1][0]
        ) + 1;
      x <
      Math.max(
        redTileLocations[0][0],
        redTileLocations[redTileLocations.length - 1][0]
      );
      x++
    ) {
      newGreenTiles.push([x, redTileLocations[0][1]]);
    }
    greenTileLocations = greenTileLocations.concat(newGreenTiles);
  }

  // tidy everything up
  greenTileLocations.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let perimeterTiles = redTileLocations.concat(greenTileLocations);
  perimeterTiles.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return perimeterTiles;
};

const findLargestGreenRedSquare = (
  perimeterTiles: number[][],
  squareDistancesGrid: number[][][]
): number => {
  const perimeterSet = new Set(perimeterTiles.map((tile) => tile.join(",")));
  var area = 0;

  // define a region inside each square and check if any perimeter tiles exist there
  for (let k = 0; k < squareDistancesGrid.length; k++) {
    const xStart =
      Math.min(squareDistancesGrid[k][0][0], squareDistancesGrid[k][2][0]) + 1;
    const xEnd =
      Math.max(squareDistancesGrid[k][0][0], squareDistancesGrid[k][2][0]) - 1;
    const yStart =
      Math.min(squareDistancesGrid[k][0][1], squareDistancesGrid[k][2][1]) + 1;
    const yEnd =
      Math.max(squareDistancesGrid[k][0][1], squareDistancesGrid[k][2][1]) - 1;

    let hasOverlap = false;

    // check top and bottom edges of the inner region for perimeter tiles
    for (let i = xStart; i < xEnd && !hasOverlap; i++) {
      if (
        perimeterSet.has(`${i},${yStart}`) ||
        perimeterSet.has(`${i},${yEnd}`)
      ) {
        hasOverlap = true;
      }
    }

    // check left and right edges of the inner region for perimeter tiles
    if (!hasOverlap) {
      for (let j = yStart + 1; j < yEnd && !hasOverlap; j++) {
        if (
          perimeterSet.has(`${xStart},${j}`) ||
          perimeterSet.has(`${xEnd},${j}`)
        ) {
          hasOverlap = true;
        }
      }
    }

    // if no perimeter tiles found, get the area and break
    if (!hasOverlap) {
      area = squareDistancesGrid[k][1][0];
      break;
    }
  }
  return area;
};
