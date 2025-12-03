import { fileToArray } from "../utils";

export const d3Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(3, filename);
  var totalJoltage = 0;

  for (let row = 0; row < input.length; row++) {
    const biggestJoltageValue = biggestTwoJoltage(input[row]);
    totalJoltage += biggestJoltageValue;
  }

  console.log(`Day 3, Part 1 Solution: ${totalJoltage}`);
};

export const d3Part2 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(3, filename);
  var totalJoltage = 0;

  for (let row = 0; row < input.length; row++) {
    const biggestJoltageValue = biggestTwelveJoltage(input[row]);
    totalJoltage += biggestJoltageValue;
  }

  console.log(`Day 3, Part 2 Solution: ${totalJoltage}`);
};

const biggestTwoJoltage = (input: string): number => {
  var joltageValues = [];

  for (let firstNumPos = 0; firstNumPos < input.length; firstNumPos++) {
    for (
      let secondNumPos = firstNumPos + 1;
      secondNumPos < input.length;
      secondNumPos++
    ) {
      joltageValues.push(Number(input[firstNumPos] + input[secondNumPos]));
    }
  }

  return Math.max(...joltageValues);
};

const biggestTwelveJoltage = (input: string): number => {
  var currentString = input;
  var chosenValues = "";
  var safeString = "";

  for (let remainingLength = 11; remainingLength >= 0; remainingLength--) {
    safeString = currentString.slice(currentString.length - remainingLength);

    var unsafeString = currentString.slice(
      0,
      currentString.length - remainingLength
    );
    var unsafeArray = unsafeString.split("");

    const unsafeArrayNum = unsafeArray.map((str) => Number(str));
    const firstNumPos = unsafeArrayNum.findIndex(
      (val) => val === Math.max(...unsafeArrayNum)
    );

    chosenValues += unsafeArray[firstNumPos];
    currentString = unsafeString.slice(firstNumPos + 1) + safeString;
  }

  return Number(chosenValues);
};
