import { fileToArray } from "../utils";

export const part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(1, filename);

  var position = 50;
  var zeroCounter = 0;

  for (var i = 0; i < input.length; i++) {
    const direction = input[i][0];
    var turns = Number(input[i].slice(1));

    const fullTurns = Math.floor(turns / 100);

    if (fullTurns > 0) {
      turns = turns % 100;
    }    

    if (turns > 100) {
      const fullTurns = Math.floor(turns / 100);
      turns = turns % 100;
    }

    switch (direction) {
      case "L":
        position = position - turns;
        if (position < 0) {
          position = 100 + position;
        }
        break;
      case "R":
        position = position + turns;
        if (position > 99) {
          position = position - 100;
        }
        break;
    }

    if (position === 0) {
      zeroCounter++;
    }
  }

  console.log(`Day 1, Part 1 Solution: ${zeroCounter}`);
};

export const part2 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(1, filename);

  var position = 50;
  var zeroCounter = 0;

  for (var i = 0; i < input.length; i++) {
    const direction = input[i][0];
    var turns = Number(input[i].slice(1));

    const fullTurns = Math.floor(turns / 100);

    if (fullTurns > 0) {
      zeroCounter += fullTurns;
      turns = turns % 100;
    }

    switch (direction) {
      case "L":
        if (position === 0) {
          position = position - turns;
          if (position < 0) {
            position = 100 + position;
          }
          break;
        }
        position = position - turns;
        if (position === 0) {
          zeroCounter++;
        } else if (position < 0) {
          position = 100 + position;
          zeroCounter++;
        }
        break;
      case "R":
        if (position === 0) {
          position = position + turns;
          if (position > 99) {
            position = position - 100;
            zeroCounter++;
          }
          break;
        }
        position = position + turns;
        if (position === 0) {
          zeroCounter++;
        } else if (position > 99) {
          position = position - 100;
          zeroCounter++;
        }
        break;
    }
  }

  console.log(`Day 1, Part 2 Solution: ${zeroCounter}`);
};