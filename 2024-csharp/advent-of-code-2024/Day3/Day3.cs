using System;
using System.Linq;

namespace Day3;

public class D3_Tasks
{
    private static int TempBacketLoc;
    private static int TempCommaLoc;
    private static int TempMulLoc;
    public static void Task1()
    {
        string[] lines = File.ReadAllLines("C:/Users/dias01s/SafeDownloads/repos/advent-of-code-dotnet/advent-of-code-2024/Day3/input.txt");

        string linesTogether = "";
        
        foreach (var line in lines)
        {
            linesTogether += line;
        }
        
        int MulTotal = 0;
        for (var n = 0; n < linesTogether.Length; n ++)
        {
            try 
            {
                if (linesTogether[n] == 'm' && linesTogether[n + 1] == 'u' && linesTogether[n + 2] == 'l' &&
                    linesTogether[n + 3] == '(')
                {
                    TempMulLoc = n + 4;
                    
                    int CommaCheck = 0;
                    int BraketCheck = 0;
                    
                    for (var i = n + 4; i < n + 4 + 10; i++)
                        if (linesTogether[i] == ',' && CommaCheck < 1)
                        {
                            CommaCheck++;
                            TempCommaLoc = i;
                        }
                        else if (linesTogether[i] == ')')
                            if (linesTogether[i] == ')' && BraketCheck < 1)
                            {
                                BraketCheck++;
                                TempBacketLoc = i;

                            }
                    
                    int numberOne = int.Parse(linesTogether.Substring(TempMulLoc, TempCommaLoc - TempMulLoc));
                    int numberTwo = int.Parse(linesTogether.Substring(TempCommaLoc + 1, TempBacketLoc - TempCommaLoc - 1));
                    MulTotal += numberOne * numberTwo;
                }
            }
            catch (Exception)
            {
                // ignored
            }
        }
        Console.WriteLine($"The answer to Day 3, Task 1 is {MulTotal}");
    }

    public static void Task2()
    {
        string[] lines =
            File.ReadAllLines("C:/Users/dias01s/SafeDownloads/repos/advent-of-code/advent-of-code-2024/Day3/input.txt");

        string linesTogether = "";

        foreach (var line in lines)
        {
            linesTogether += line;
        }

        int MulTotal = 0;

        int DoDontCheck = 0;
        for (var n = 0; n < linesTogether.Length; n++)
        {
            
            if (linesTogether[n] == 'd' && linesTogether[n + 1] == 'o' && linesTogether[n + 2] == '(' && linesTogether[n + 3] == ')')
            {
                DoDontCheck = 0;
            }
            
            if (linesTogether[n] == 'd' && linesTogether[n + 1] == 'o' && linesTogether[n + 2] == 'n' && linesTogether[n + 3] == '\'' && linesTogether[n + 4] == 't' && linesTogether[n + 5] == '(' && linesTogether[n + 6] == ')')
            {
                DoDontCheck = 1;
            }

            if (DoDontCheck == 1) continue;
            try
            {
                if (linesTogether[n] == 'm' && linesTogether[n + 1] == 'u' && linesTogether[n + 2] == 'l' &&
                    linesTogether[n + 3] == '(')
                {
                    TempMulLoc = n + 4;

                    int CommaCheck = 0;
                    int BraketCheck = 0;

                    for (var i = n + 4; i < n + 4 + 10; i++)
                        if (linesTogether[i] == ',' && CommaCheck < 1)
                        {
                            CommaCheck++;
                            TempCommaLoc = i;
                        }
                        else if (linesTogether[i] == ')')
                            if (linesTogether[i] == ')' && BraketCheck < 1)
                            {
                                BraketCheck++;
                                TempBacketLoc = i;

                            }

                    int numberOne = int.Parse(linesTogether.Substring(TempMulLoc, TempCommaLoc - TempMulLoc));
                    int numberTwo =
                        int.Parse(linesTogether.Substring(TempCommaLoc + 1, TempBacketLoc - TempCommaLoc - 1));
                    MulTotal += numberOne * numberTwo;
                }
            }
            catch (Exception)
            {
                // ignored
            }
        }

        Console.WriteLine($"The answer to Day 3, Task 2 is {MulTotal}");
    }
}
    