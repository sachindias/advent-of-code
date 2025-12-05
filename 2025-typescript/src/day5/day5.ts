import { fileToArray } from "../utils";

export const d5Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(5, filename);

  const { range: ranges, ingredient: ingredients } =
    splitRangesAndIngredients(input);

  const acceptableIngredientsBool = acceptableIngredients(ranges, ingredients);

  const numberAcceptableIngredients =
    acceptableIngredientsBool.filter(Boolean).length;

  console.log(`Day 5, Part 1 Solution: ${numberAcceptableIngredients}`);
};

export const d5Part2 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(5, filename);

  const { range: ranges, ingredient: ingredients } =
    splitRangesAndIngredients(input);

  ranges.sort((a, b) => Number(a[0]) - Number(b[0]));

  // remove truly unique ranges (excluding 0th and last index)
  var uniqueRanges: number[][] = [];
  var updatedRanges = ranges;

  while (updatedRanges.length > 2) {
    var { ranges: updatedRanges, uniqueRanges: updatedUniqueRanges } =
      calculateUniqueRanges(uniqueRanges, updatedRanges);

    updatedRanges = mergeOverlappingRanges(updatedRanges);
    uniqueRanges = updatedUniqueRanges;
  }

  // sort out the 0th and last index ranges
  const firstRange = updatedRanges[0];
  const lastRange = updatedRanges[1];

  if (Number(firstRange[1]) >= uniqueRanges[0][0]) {
    uniqueRanges.splice(0, 1, [Number(firstRange[0]), uniqueRanges[0][1]]);
  } else {
    uniqueRanges.splice(0, 0, [Number(firstRange[0]), Number(firstRange[1])]);
  }

  if (
    Number(uniqueRanges[uniqueRanges.length - 1][1]) >= Number(lastRange[0])
  ) {
    uniqueRanges.splice(uniqueRanges.length - 1, 1, [
      Number(uniqueRanges[uniqueRanges.length - 1][0]),
      Number(lastRange[1]),
    ]);
  } else {
    uniqueRanges.push([Number(lastRange[0]), Number(lastRange[1])]);
  }

  const totalSize = countRangeSize(uniqueRanges);

  console.log(`Day 5, Part 2 Solution: ${totalSize}`);
};

const splitRangesAndIngredients = (
  inputArray: string[]
): { range: string[][]; ingredient: number[] } => {
  var ranges: string[][] = [];
  var ingredients: number[] = [];

  var rangeCheck = 0;
  for (var i = 0; i < inputArray.length; i++) {
    if (inputArray[i] === "") {
      rangeCheck++;
      continue;
    }

    if (rangeCheck === 0) {
      ranges.push(inputArray[i].split("-"));
    } else {
      ingredients.push(Number(inputArray[i]));
    }
  }
  return { range: ranges, ingredient: ingredients };
};

const acceptableIngredients = (
  ranges: string[][],
  ingredients: number[]
): boolean[] => {
  var acceptableIngredientsBool = ingredients.map((char) => char === null);
  for (var j = 0; j < ingredients.length; j++)
    for (var i = 0; i < ranges.length; i++) {
      const lowerLimit = Number(ranges[i][0]);
      const upperLimit = Number(ranges[i][1]);

      if (ingredients[j] >= lowerLimit && ingredients[j] <= upperLimit) {
        acceptableIngredientsBool[j] = true;
      }
    }
  return acceptableIngredientsBool;
};

const calculateUniqueRanges = (
  uniqueRanges: number[][],
  ranges: string[][]
): { ranges: string[][]; uniqueRanges: number[][] } => {
  for (var i = 0; i < ranges.length; i++) {
    if (
      i < ranges.length - 1 &&
      i > 0 &&
      Number(ranges[i][1]) < Number(ranges[i + 1][0]) &&
      Number(ranges[i][0]) > Number(ranges[i - 1][1])
    ) {
      uniqueRanges.push([Number(ranges[i][0]), Number(ranges[i][1])]);
      ranges.splice(i, 1);
      continue;
    }
  }
  return { ranges, uniqueRanges };
};

const mergeOverlappingRanges = (ranges: string[][]): string[][] => {
  for (var i = 0; i < ranges.length; i++) {
    if (
      i < ranges.length - 1 &&
      i > 0 &&
      Number(ranges[i][1]) >= Number(ranges[i + 1][0])
    ) {
      const newLowerLim = ranges[i][0];
      const newUpperLim = String(
        Math.max(Number(ranges[i][1]), Number(ranges[i + 1][1]))
      );

      ranges.splice(i, 2, [newLowerLim, newUpperLim]);
      i--;
      continue;
    }
  }
  return ranges;
};

const countRangeSize = (uniqueRanges: number[][]): number => {
  var totalSize = 0;
  for (var i = 0; i < uniqueRanges.length; i++) {
    totalSize += uniqueRanges[i][1] - uniqueRanges[i][0] + 1;
  }
  return totalSize;
};
