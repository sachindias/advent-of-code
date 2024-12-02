using System;
using System.Collections;

namespace Day1;

public class D1_Tasks
{
    public static (List<int>, List<int>) LoadData()
    {
        string lines = File.ReadAllText("C:/Users/dias01s/SafeDownloads/repos/advent-of-code/advent-of-code-2024/Day1/input.txt");
        List<int> columnOne = new List<int>();
        List<int> columnTwo = new List<int>();
        
        foreach (var line in lines.Split('\n'))
        {
            int entryOne = Convert.ToInt32(line.Split("   ")[0]);
            columnOne.Add(entryOne);
            
            int entryTwo = Convert.ToInt32(line.Split("   ")[1]);
            columnTwo.Add(entryTwo);
        } 
        return (columnOne, columnTwo);
    }
    public static void Task1(List<int> columnOne, List<int> columnTwo)
    {
        columnOne.Sort();
        columnTwo.Sort();
        
        int totalDifference = 0;
        
        for (int n = 0; n < columnOne.Count; n++)
        {
            int difference = Math.Abs(columnOne[n] - columnTwo[n]);
            totalDifference += difference;
        }
        
        Console.WriteLine($"The answer to day 1, task 1 is {totalDifference}");
    }

    public static void Task2(List<int> columnOne, List<int> columnTwo)
    {
        int similartiyScore = 0;
        
        for (int n = 0; n < columnOne.Count; n++)
        {
            var multiplier = columnTwo.Where(x => x.Equals(columnOne[n])).Count();
            similartiyScore += columnOne[n] * multiplier;
        }
        
        Console.WriteLine($"The answer to day 1, task 1 is {similartiyScore}");
    }
}