using System;

namespace Day2;

public class D2_Tasks
{
    public static List<List<int>> Task1()
    {
        string lines =
            File.ReadAllText("C:/Users/dias01s/SafeDownloads/repos/advent-of-code/advent-of-code-2024/Day2/input.txt");

        int count = 0;
        List<List<int>> LineArrays = new List<List<int>>();

        foreach (var line in lines.Split('\n'))
        {
            int[] lineArray = Array.ConvertAll(line.Split(" "), int.Parse);
            LineArrays.Add(lineArray.ToList());

            int countUp = 0;
            for (var n = 0; n < lineArray.Length - 1; n++)
            {
                if (lineArray[n + 1] - lineArray[n] > 0 && lineArray[n + 1] - lineArray[n] < 4)
                {
                    countUp++;
                }
                else if (lineArray[n + 1] - lineArray[n] < 0 && lineArray[n + 1] - lineArray[n] > -4)
                {
                    countUp--;
                }
            }

            if (Math.Abs(countUp) != lineArray.Length - 1) continue;
            count++;
        }

        Console.WriteLine($"The answer to Day 2, Task 1 is {count}");
        return LineArrays;
    }

    public static void Task2(List<List<int>> LineArrays)
    {
        int count = 0;
        for (var j = 0; j < LineArrays.Count; j++)
        {
            int count2 = 0;
            for (var k = 0; k < LineArrays[j].Count; k++)
            {
                List<int> tempArray = new List<int>(LineArrays[j]);
                tempArray.RemoveAt(k);

                int countUp2 = 0;
                for (var n = 0; n < tempArray.Count - 1; n++)
                {
                    if (tempArray[n + 1] - tempArray[n] > 0 && tempArray[n + 1] - tempArray[n] < 4)
                    {
                        countUp2++;
                    }
                    else if (tempArray[n + 1] - tempArray[n] < 0 && tempArray[n + 1] - tempArray[n] > -4)
                    {
                        countUp2--;
                    }
                }

                if (Math.Abs(countUp2) == tempArray.Count - 1)
                {
                    count2++;
                }
                
            }
            
            if (count2 > 0)
            {
                count++;
            }
        }
        
        Console.WriteLine($"The answer to Day 2, Task 2 is {count}");
    }
}

