import { fileToArray } from "../utils";

export const part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(1, filename);

  var position = 50;
  var zeroCounter = 0;

  for (var i = 0; i < input.length; i++) {
    const direction = input[i][0];
    const turns = input[i].slice(1);

    switch (direction) {
      case "L":
        position = position - Number(turns);
        if (position < 0) {
          const modPosition = position % 100;
          if (modPosition === 0) {
            position = 0;
            break;
          }
          position = 100 + modPosition;
        }
        break;
      case "R":
        position = position + Number(turns);
        if (position > 99) {
          const modPosition = position % 100;
          if (modPosition === 0) {
            position = 0;
            break;
          }
          position = modPosition - 100;
        }
        break;
    }

    if (position === 0) {
      zeroCounter++;
    }
  }

  console.log(`Day 1, Part 1 Solution: ${zeroCounter}`);
};
