import { fileToArray } from "../utils";

export const d10Part1 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(10, filename);

  var diagramsButtonsJoltages = calculateDiagramsButtonsJoltages(input);

  let totalCombinations = 0;
  for (let i = 0; i < diagramsButtonsJoltages.length; i++) {
    let finishingDiagram = diagramsButtonsJoltages[i][0][0];

    let numberOfChoices = diagramsButtonsJoltages[i][1].length;
    let choiceArray = Array.from({ length: numberOfChoices }, (_, i) => i + 1);

    let finished = false;
    let combinationCount = 1;
    while (finished === false) {
      let allCombination = getCombinationsWithReplacement(
        choiceArray,
        combinationCount
      );
      combinationChecker: for (let j = 0; j < allCombination.length; j++) {
        let testingDiagram = Array(
          diagramsButtonsJoltages[i][0][0].length
        ).fill(0);
        for (let k = 0; k < allCombination[j].length; k++) {
          for (
            let l = 0;
            l < diagramsButtonsJoltages[i][1][allCombination[j][k] - 1].length;
            l++
          ) {
            let buttonPosition =
              diagramsButtonsJoltages[i][1][allCombination[j][k] - 1][l];

            testingDiagram[buttonPosition] = testingDiagram[buttonPosition] + 1;
          }
          let modTestingDiagram = testingDiagram.map((x) => x % 2);

          if (modTestingDiagram.toString() === finishingDiagram.toString()) {
            totalCombinations = totalCombinations + combinationCount;
            finished = true;
            break combinationChecker;
          }
        }
      }
      combinationCount++;
    }
  }
  console.log(`Day 10, Part 1 Solution: ${totalCombinations}`);
};

export const d10Part2 = async (filename: string = ""): Promise<void> => {
  const input = await fileToArray(10, filename);
};

const calculateDiagramsButtonsJoltages = (input: string[]): number[][][][] => {
  let diagramsButtonsJoltages: number[][][][] = [];

  for (const line of input) {
    const diagramParts = line.split(" ")[0].split("").slice(1, -1);
    const joltageParts = line
      .split("{")[1]
      .split("}")[0]
      .split(",")
      .map((btn) => Number(btn.trim()));

    const buttonMatches = line.match(/\(([^)]+)\)/g);
    const buttons =
      buttonMatches?.map((match) => {
        const content = match.slice(1, -1);
        return content.split(",").map((num) => Number(num.trim()));
      }) || [];

    const diagramNumbers = diagramParts.map((char) => (char === "#" ? 1 : 0));
    diagramsButtonsJoltages.push([[diagramNumbers], buttons, [joltageParts]]);
  }

  return diagramsButtonsJoltages;
};

const getCombinationsWithReplacement = (
  arr: number[],
  length: number
): number[][] => {
  if (length === 0) return [[]];
  if (arr.length === 0) return [];

  const result: number[][] = [];

  const buildCombination = (start: number, combo: number[]) => {
    if (combo.length === length) {
      result.push([...combo]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      buildCombination(i, combo);
      combo.pop();
    }
  };

  buildCombination(0, []);
  return result;
};
