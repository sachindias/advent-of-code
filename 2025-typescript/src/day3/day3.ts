import { fileToArray } from "../utils";

export const d3Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(3, filename);
  var totalJoltage = 0;

  for (let row = 0; row < input.length; row++) {
    const biggestJoltageValue = biggestJoltage(input[row]);
    totalJoltage += biggestJoltageValue;
  }

  console.log(`Day 3, Part 1 Solution: ${totalJoltage}`);
};

const biggestJoltage = (inputArray: string): number => {
  var joltageValues = [];

  for (let firstNumPos = 0; firstNumPos < inputArray.length; firstNumPos++) {
    for (
      let secondNumPos = firstNumPos + 1;
      secondNumPos < inputArray.length;
      secondNumPos++
    ) {
      joltageValues.push(
        Number(inputArray[firstNumPos] + inputArray[secondNumPos])
      );
    }
  }

  return Math.max(...joltageValues);
};
