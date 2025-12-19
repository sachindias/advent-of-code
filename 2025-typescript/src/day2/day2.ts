import { fileToArray } from "../utils";

export const d2Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(2, filename);
  const ranges = input[0].split(",").map((group) => group.split("-"));

  var numberCount = 0;

  for (var i = 0; i < ranges.length; i++) {
    const lowerLimit = Number(ranges[i][0]);
    const upperLimit = Number(ranges[i][1]);

    for (
      var currentNumber = lowerLimit;
      currentNumber <= upperLimit;
      currentNumber++
    ) {
      const currentString = currentNumber.toString();

      if (currentString.length % 2 === 0) {
        const middleIndex = currentString.length / 2;
        const firstString = currentString.slice(0, middleIndex);
        const secondString = currentString.slice(middleIndex);

        if (firstString === secondString) {
          numberCount += Number(currentNumber);
        }
      }
    }
  }

  console.log(`Day 2, Part 1 Solution: ${numberCount}`);
};

export const d2Part2 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(2, filename);
  const ranges = input[0].split(",").map((group) => group.split("-"));

  var numberCount = 0;

  for (var i = 0; i < ranges.length; i++) {
    const lowerLimit = Number(ranges[i][0]);
    const upperLimit = Number(ranges[i][1]);

    for (
      var currentNumber = lowerLimit;
      currentNumber <= upperLimit;
      currentNumber++
    ) {
      const currentString = currentNumber.toString();

      splitLoop: for (
        var numberSplits = 2;
        numberSplits <= currentString.length;
        numberSplits++
      ) {
        if (currentString.length % numberSplits === 0) {
          var stringSplits = splitString(currentString, numberSplits).filter(
            (string) => string !== ""
          );

          if (new Set(stringSplits).size === 1) {
            numberCount += Number(currentNumber);
            break splitLoop;
          }
        }
      }
    }
  }

  console.log(`Day 2, Part 2 Solution: ${numberCount}`);
};

const splitString = (inputString: string, numberSplits: number): string[] => {
  const choppedString: string[] = [];
  const stringSubLengths = inputString.length / numberSplits;

  for (let n = 0; n <= numberSplits; n++) {
    choppedString.push(
      inputString.substring(stringSubLengths * n, stringSubLengths * (n + 1))
    );
  }

  return choppedString;
};
