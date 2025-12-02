using System;
using System.Linq;

namespace Day4;

public class D4_Tasks
{
    public static void Task1()
    {
        string[] lines =
            File.ReadAllLines(
                "C:/Users/dias01s/SafeDownloads/repos/advent-of-code-dotnet/advent-of-code-2024/Day4/input.txt");

        int count = 0;
        for (int i = 0; i < lines.Length; i++)
        {
            for (int j = 0; j < lines[i].Length; j++)
            {

                try
                {
                    if (lines[i][j] == 'X' && lines[i][j + 1] == 'M' && lines[i][j + 2] == 'A' &&
                        lines[i][j + 3] == 'S')
                    {
                        count++;
                    }
                }
                catch (Exception)
                {
                    // ignored
                }
                
                try
                {
                    if (lines[i][j] == 'X' && lines[i][j-1] == 'M' && lines[i][j-2] == 'A' && lines[i][j-3] == 'S')
                    {
                        count++;
                    }
                }
                catch (Exception)
                {
                    // ignored
                }
                
                try
                {
                    if (lines[i][j] == 'X' && lines[i+1][j] == 'M' && lines[i+2][j] == 'A' && lines[i+3][j] == 'S')
                    {
                        count++;
                    }
                }
                catch (Exception)
                {
                    // ignored
                }
                
                try
                {
                    if (lines[i][j] == 'X' && lines[i-1][j] == 'M' && lines[i-2][j] == 'A' && lines[i-3][j] == 'S')
                    {
                        count++;
                    }
                }
                catch (Exception)
                {
                    // ignored
                }
                
                try
                {
                    if (lines[i][j] == 'X' && lines[i+1][j+1] == 'M' && lines[i+2][j+2] == 'A' && lines[i+3][j+3] == 'S')
                    {
                        count++;
                    }
                }
                catch (Exception)
                {
                    // ignored
                }
                
                try
                {
                    if (lines[i][j] == 'X' && lines[i+1][j-1] == 'M' && lines[i+2][j-2] == 'A' && lines[i+3][j-3] == 'S')
                    {
                        count++;
                    }
                }
                catch (Exception)
                {
                    // ignored
                }
                
                try
                {
                    if (lines[i][j] == 'X' && lines[i-1][j+1] == 'M' && lines[i-2][j+2] == 'A' && lines[i-3][j+3] == 'S')
                    {
                        count++;
                    }
                }
                catch (Exception)
                {
                    // ignored
                }
                
                try
                {
                    if (lines[i][j] == 'X' && lines[i-1][j-1] == 'M' && lines[i-2][j-2] == 'A' && lines[i-3][j-3] == 'S')
                    {
                        count++;
                    }
                }
                catch (Exception)
                {
                    // ignored
                }
            }
        }
        Console.WriteLine($"\nThe answer to Day 4, Task 1 is {count}");
    }

    public static void Task2()
    {
        string[] lines =
            File.ReadAllLines(
                "C:/Users/dias01s/SafeDownloads/repos/advent-of-code-dotnet/advent-of-code-2024/Day4/input.txt");

        int count = 0;
        for (int i = 0; i < lines.Length; i++)
        {
            for (int j = 0; j < lines[i].Length; j++)
            {

                try
                {
                    if (lines[i][j] == 'A' && lines[i-1][j-1] == 'M' && lines[i-1][j+1] == 'S' && lines[i+1][j-1] == 'M' && lines[i+1][j+1] == 'S')
                    {
                        count++;
                    }
                }
                catch (Exception e)
                {
                    // ignored
                }
                
                try
                {
                    if (lines[i][j] == 'A' && lines[i-1][j-1] == 'S' && lines[i-1][j+1] == 'M' && lines[i+1][j-1] == 'S' && lines[i+1][j+1] == 'M')
                    {
                        count++;
                    }
                }
                catch (Exception e)
                {
                    // ignored
                }
                
                try
                {
                    if (lines[i][j] == 'A' && lines[i-1][j-1] == 'S' && lines[i-1][j+1] == 'S' && lines[i+1][j-1] == 'M' && lines[i+1][j+1] == 'M')
                    {
                        count++;
                    }
                }
                catch (Exception e)
                {
                    // ignored
                }
                
                try
                {
                    if (lines[i][j] == 'A' && lines[i-1][j-1] == 'M' && lines[i-1][j+1] == 'M' && lines[i+1][j-1] == 'S' && lines[i+1][j+1] == 'S')
                    {
                        count++;
                    }
                }
                catch (Exception e)
                {
                    // ignored
                }
                
            }
        }
        
        Console.WriteLine($"\nThe answer to Day 4, Task 2 is {count}");
    }

}