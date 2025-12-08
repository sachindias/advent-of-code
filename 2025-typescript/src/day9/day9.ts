import { fileToArray } from "../utils";

export const d8Part1 = async (
  filename: string = "",
  connections: number
): Promise<void> => {
  const input = await fileToArray(8, filename);
  var junctionBoxLocations: number[][] = [];

  for (const line of input) {
    const individualChars = line.split(",");
    //const individualNumbers = individualChars.map((char) => Number(char));
    //junctionBoxLocations.push(individualNumbers);
  }

}

export const d8Part2 = async (
  filename: string = "",
  connections: number
): Promise<void> => {
  const input = await fileToArray(8, filename);
  var junctionBoxLocations: number[][] = [];

  for (const line of input) {
    const individualChars = line.split(",");
    //const individualNumbers = individualChars.map((char) => Number(char));
    //junctionBoxLocations.push(individualNumbers);
  }

}