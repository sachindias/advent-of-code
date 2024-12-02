using System;

namespace Day2;

public class D2_Tasks
{
    public static void Task1()
    {
        string lines = File.ReadAllText("C:/Users/dias01s/SafeDownloads/repos/advent-of-code/advent-of-code-2024/Day2/input.txt");
        
        int count = 0;
        foreach (var line in lines.Split('\n'))
        {
            int[] lineArray = Array.ConvertAll(line.Split(" "), int.Parse);
            
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
            Console.WriteLine(count);
        }
    }
}

