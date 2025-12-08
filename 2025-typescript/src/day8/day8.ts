import { fileToArray } from "../utils";

export const d8Part1 = async (
  filename: string = "",
  connections: number
): Promise<void> => {
  const input = await fileToArray(8, filename);
  var junctionBoxLocations: number[][] = [];

  for (const line of input) {
    const individualChars = line.split(",");
    const individualNumbers = individualChars.map((char) => Number(char));
    junctionBoxLocations.push(individualNumbers);
  }

  let squareDistancesGrid = calculateSquareDistance(junctionBoxLocations);
  squareDistancesGrid = preProcessSquareDistances(
    squareDistancesGrid,
    connections
  );

  let connectionsArray = removeDistanceInfo(squareDistancesGrid);
  connectionsArray = concatenateArrays(connectionsArray);

  let multiplier = finishUp(connectionsArray);

  console.log(`Day 8, Part 1 Solution: ${multiplier}`);
};

export const d8Part2 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(8, filename);
  var junctionBoxLocations: number[][] = [];

  for (const line of input) {
    const individualChars = line.split(",");
    const individualNumbers = individualChars.map((char) => Number(char));
    junctionBoxLocations.push(individualNumbers);
  }

  let squareDistancesGrid = calculateSquareDistance(junctionBoxLocations);
  squareDistancesGrid = preProcessSquareDistances(squareDistancesGrid);

  let connectionsArray = removeDistanceInfo(squareDistancesGrid);

  const finalConnection = logFinalConnection(
    connectionsArray,
    junctionBoxLocations
  );
  const multiplierX = finalConnection[0][0] * finalConnection[1][0];

  console.log(`Day 8, Part 2 Solution: ${multiplierX}`);
};

const calculateSquareDistance = (junctionBoxLocations: number[][]) => {
  let squareDistancesGrid: number[][][] = [];

  for (let i = 0; i < junctionBoxLocations.length; i++) {
    for (let j = 0; j < junctionBoxLocations.length; j++) {
      if (i !== j) {
        let squareDistance =
          (junctionBoxLocations[i][0] - junctionBoxLocations[j][0]) ** 2 +
          (junctionBoxLocations[i][1] - junctionBoxLocations[j][1]) ** 2 +
          (junctionBoxLocations[i][2] - junctionBoxLocations[j][2]) ** 2;
        squareDistancesGrid.push([
          [
            junctionBoxLocations[i][0],
            junctionBoxLocations[i][1],
            junctionBoxLocations[i][2],
          ],
          [squareDistance],
          [
            junctionBoxLocations[j][0],
            junctionBoxLocations[j][1],
            junctionBoxLocations[j][2],
          ],
        ]);
      }
    }
  }
  return squareDistancesGrid;
};

const preProcessSquareDistances = (
  squareDistancesGrid: number[][][],
  connections?: number
) => {
  squareDistancesGrid.sort((a, b) => a[1][0] - b[1][0]);
  squareDistancesGrid = squareDistancesGrid.filter(
    (item, index, arr) => index === 0 || item[1][0] !== arr[index - 1][1][0]
  );

  if (connections) {
    squareDistancesGrid = squareDistancesGrid.slice(0, connections);
  }

  return squareDistancesGrid;
};

const removeDistanceInfo = (squareDistancesGrid: number[][][]) => {
  let connectionsArray: number[][][] = [];
  for (let i = 0; i < squareDistancesGrid.length; i++) {
    connectionsArray.push([
      squareDistancesGrid[i][0],
      squareDistancesGrid[i][2],
    ]);
  }
  return connectionsArray;
};

const concatenateArrays = (connectionsArray: number[][][]) => {
  let curcuitConnectionsNeeded = 1;
  while (curcuitConnectionsNeeded > 0) {
    circuitCycle: for (let i = 0; i < connectionsArray.length; i++) {
      for (let j = 0; j < connectionsArray.length; j++) {
        if (i !== j) {
          if (
            connectionsArray[i].some((arr1) =>
              connectionsArray[j].some(
                (arr2) => arr1.join(",") === arr2.join(",")
              )
            )
          ) {
            let newConnectionArray = connectionsArray[i].concat(
              connectionsArray[j]
            );
            connectionsArray[i] = newConnectionArray;
            curcuitConnectionsNeeded = 1;
            connectionsArray.splice(j, 1);
            break circuitCycle;
          } else {
            curcuitConnectionsNeeded = 0;
          }
        }
      }
    }
  }
  return connectionsArray;
};

const finishUp = (connectionsArray: number[][][]) => {
  for (let i = 0; i < connectionsArray.length; i++) {
    const duplicateStrings = connectionsArray[i].map((arr) => arr.join(","));
    const uniqueStrings = new Set(duplicateStrings);
    connectionsArray[i] = [...uniqueStrings].map((str) =>
      str.split(",").map(Number)
    );
  }

  connectionsArray.sort((a, b) => b.length - a.length);

  let multiplier = 1;
  for (let i = 0; i < 3; i++) {
    multiplier = multiplier * connectionsArray[i].length;
  }
  return multiplier;
};

const logFinalConnection = (
  connectionsArray: number[][][],
  junctionBoxLocations: number[][]
): number[][] => {
  let curcuitConnectionsNeeded = 1;
  let lastValues: number[][] = [];
  while (curcuitConnectionsNeeded > 0) {
    connectionsArray = removeDuplicateLocations(connectionsArray);
    if (connectionsArray[0].length === junctionBoxLocations.length) {
      break;
    }

    circuitCycle: for (let i = 0; i < connectionsArray.length; i++) {
      for (let j = 0; j < connectionsArray.length; j++) {
        if (i !== j) {
          if (
            connectionsArray[i].some((arr1) =>
              connectionsArray[j].some(
                (arr2) => arr1.join(",") === arr2.join(",")
              )
            )
          ) {
            let newConnectionArray = connectionsArray[i].concat(
              connectionsArray[j]
            );
            lastValues = connectionsArray[j];
            connectionsArray[i] = newConnectionArray;
            curcuitConnectionsNeeded = 1;
            connectionsArray.splice(j, 1);
            break circuitCycle;
          } else {
            curcuitConnectionsNeeded = 0;
          }
        }
      }
    }
  }
  return lastValues;
};

const removeDuplicateLocations = (connectionsArray: number[][][]) => {
  for (let i = 0; i < connectionsArray.length; i++) {
    const duplicateStrings = connectionsArray[i].map((arr) => arr.join(","));
    const uniqueStrings = new Set(duplicateStrings);
    connectionsArray[i] = [...uniqueStrings].map((str) =>
      str.split(",").map(Number)
    );
  }
  return connectionsArray;
};
