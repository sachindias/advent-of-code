import * as fsPromise from "fs/promises";
import * as path from "path";

export const fileToArray = async (
  day: number,
  filename: string = ""
) => {
  var inputContents = [];

  const filePath = path.resolve(__dirname, "..", "src", `day${day}`, `input${filename}.txt`);
  const file = await fsPromise.open(filePath, "r");
  for await (const line of file.readLines()) {
    inputContents.push(line);
  }

  return inputContents;
};
