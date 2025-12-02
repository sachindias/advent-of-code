using System;
using System.Linq;

namespace Day6;

public class D6_Tasks
{
    public static (int, int) InitialPositions(string[] lines)
    {
        int iInitial = 0;
        int jInitial = 0;
        
        for (int i = 0; i < lines.Length; i++)
        {
            for (int j = 0; j < lines[i].Length; j++)
            {
                if (lines[i][j] != '^')
                {
                    continue;
                }

                iInitial = i;
                jInitial = j;
            }
        }
        
        return (iInitial, jInitial);
    }

    public static int UniquePositionCounter(int count, int iCurrent, int jCurrent, List<int[]> positions)
    {
        int check = 0;
        for (int n = 0; n < positions.Count; n++)
        {
            if (positions[n][0] == iCurrent && positions[n][1] == jCurrent)
            {
                check++;
            }
        }
        
        if (check == 0)
        {
            count++;;
        }

        return count;
    }
    
    public static List<int[]> AddPosition(int iCurrent, int jCurrent, List<int[]> positions)
    {
        positions.Add(new int[] { iCurrent, jCurrent });
        return positions;
    }
    
    public static void Task1(string filename)
    {
        string[] lines = ReadFiles.ReadFile(6, filename);
        
        int directionCount = 0;
        string[] directionList = new string[] { "up", "right", "down", "left" };

        int count = 0;
        int exitCase = 0;
        (int iCurrent, int jCurrent) = InitialPositions(lines);
        List<int[]> positions = new List<int[]> { new int[] { iCurrent, jCurrent } };

        while (exitCase == 0)
        {
            try
            {
                string direction = directionList[directionCount];
                if (direction == "up")
                {
                    if (lines[iCurrent-1][jCurrent] == '#')
                    {
                        directionCount++;
                        //Console.WriteLine("OBSTACLE " + (iCurrent-1) + "|" + jCurrent + "|  " + lines[iCurrent-1][jCurrent]);
                    }
                    else
                    {
                        iCurrent--;
                        count = UniquePositionCounter(count, iCurrent, jCurrent, positions);
                        positions = AddPosition(iCurrent, jCurrent, positions);
                        //Console.WriteLine(count + "        " + iCurrent + "|" + jCurrent + "|  " +  lines[iCurrent][jCurrent]);
                    }

                }
                
                else if (direction == "right")
                {
                    if (lines[iCurrent][jCurrent+1] == '#')
                    {
                        directionCount++;
                        //Console.WriteLine("OBSTACLE " + (iCurrent) + "|" + (jCurrent+1) + "|  " + lines[iCurrent][jCurrent+1]);
                    }
                    else
                    {
                        jCurrent++;
                        count = UniquePositionCounter(count, iCurrent, jCurrent, positions);
                        positions = AddPosition(iCurrent, jCurrent, positions);
                        //Console.WriteLine(count + "        " + iCurrent + "|" + jCurrent + "|  " +  lines[iCurrent][jCurrent]);
                    }
                }
                
                else if (direction == "down")
                {
                    if (lines[iCurrent+1][jCurrent] == '#')
                    {
                        directionCount++;
                        //Console.WriteLine("OBSTACLE " + (iCurrent+1) + "|" + (jCurrent) + "|  " + lines[iCurrent+1][jCurrent]);
                    }
                    else
                    {
                        iCurrent++;
                        count = UniquePositionCounter(count, iCurrent, jCurrent, positions);
                        positions = AddPosition(iCurrent, jCurrent, positions);
                        //Console.WriteLine(count + "        " + iCurrent + "|" + jCurrent + "|  " +  lines[iCurrent][jCurrent]);
                    }
                }
                
                else if (direction == "left")
                {
                    if (lines[iCurrent][jCurrent-1] == '#')
                    {
                        directionCount = 0;
                        //Console.WriteLine("OBSTACLE " + (iCurrent) + "|" + (jCurrent-1) + "|  " + lines[iCurrent][jCurrent-1]);
                    }
                    else
                    {
                        jCurrent--;
                        count = UniquePositionCounter(count, iCurrent, jCurrent, positions);
                        positions = AddPosition(iCurrent, jCurrent, positions);
                        //Console.WriteLine(count + "        " + iCurrent + "|" + jCurrent + "|  " +  lines[iCurrent][jCurrent]);
                    }
                }
                
            }
            catch (Exception e)
            {
                //Console.WriteLine(count);
                count++;
                exitCase = 1;
            }
        }
        
        Console.WriteLine($"\nThe answer to Day 6, Task 1 is {count}");
    }
}