using System;
using System.Linq;

namespace Day5;

public class D5_Tasks
{
    public static void Task1N2()
    {
        string[] lines =
            File.ReadAllLines(
                "C:/Users/dias01s/SafeDownloads/repos/advent-of-code-dotnet/advent-of-code-2024/Day5/input.txt");

        int count = 0;
        List<int[]> sectionTwoLines = new List<int[]>();
        List<int> sectionOneLinesA = new List<int>();
        List<int> sectionOneLinesB = new List<int>();

        int section = 1;
        for (int n = 0; n < lines.Length; n++)
        {

            if (section == 2)
            {
                sectionTwoLines.Add(lines[n].Split(',').Select(int.Parse).ToArray());
            }

            if (lines[n] == "")
            {
                section = 2;
            }

            if (section == 1)
            {
                sectionOneLinesA.Add(int.Parse(lines[n].Split('|')[0]));
                sectionOneLinesB.Add(int.Parse(lines[n].Split('|')[1]));
            }

        }

        List<int[]> IncorrectlyOrdered = new List<int[]>();
        for (int n = 0; n < sectionTwoLines.Count; n++)
        {
            int PassFail = 0;
            for (int m = sectionTwoLines[n].Length - 1; m > 0; m--)
            {
                for (int i = m - 1; i > -1; i--)
                {
                    for (int k = 0; k < sectionOneLinesA.Count; k++)
                    {
                        if (sectionOneLinesA[k] == sectionTwoLines[n][m] &&
                            sectionOneLinesB[k] == sectionTwoLines[n][i])
                        {
                            PassFail++;
                        }
                    }
                }
            }

            if (PassFail == 0)
            {
                count += sectionTwoLines[n][(sectionTwoLines[n].Length - 1) / 2];
            }
            else
            {
                IncorrectlyOrdered.Add(sectionTwoLines[n]);
            }

        }

        Console.WriteLine($"\nThe answer to Day 5, Task 1 is {count}");
        Console.WriteLine();
        Console.WriteLine("Processing Task 2...");

        int count2 = 0;
        for (int n = 0; n < IncorrectlyOrdered.Count; n++)
        {
            List<int[]> IncorrectlyOrdered2 = IncorrectlyOrdered;
            int PassFail = 0;
            
            int h = 0;
            int pos1 = 0;
            int pos2 = 0;
            while (h < 1)
            {
                for (int m = IncorrectlyOrdered2[n].Length - 1; m > 0; m--)
                {
                    for (int i = m - 1; i > -1; i--)
                    {
                        for (int k = 0; k < sectionOneLinesA.Count; k++)
                        {
                            if (sectionOneLinesA[k] == IncorrectlyOrdered2[n][m] &&
                                sectionOneLinesB[k] == IncorrectlyOrdered2[n][i])
                            {
                                //Console.WriteLine($"{sectionOneLinesA[k]} | {sectionOneLinesB[k]}");
                                
                                pos1 = m;
                                pos2 = i;
                                PassFail++;
                            }
                        }
                    }
                }

                if (PassFail == 0)
                {
                    h = 1;
                    count2 += IncorrectlyOrdered2[n][(IncorrectlyOrdered2[n].Length - 1) / 2];
                    //Console.WriteLine(n + "|" + string.Join(", ", IncorrectlyOrdered2[n]));
                    //Console.WriteLine(IncorrectlyOrdered2[n][(IncorrectlyOrdered2[n].Length - 1) / 2]);
                    //Console.WriteLine();
                }
                else
                {
                    try
                    {
                        int temp1 = IncorrectlyOrdered2[n][pos1];
                        int temp2 = IncorrectlyOrdered2[n][pos2];
                    
                        IncorrectlyOrdered2[n][pos1] = temp2;
                        IncorrectlyOrdered2[n][pos2] = temp1;
                        PassFail = 0;
                        //Console.WriteLine($"Swapped {temp1} and {temp2}");
                    }
                    catch (Exception e)
                    {
                        // ignored
                    }
                }
            }
        }
        
        Console.WriteLine($"\nThe answer to Day 5, Task 2 is {count2}");
    }
}