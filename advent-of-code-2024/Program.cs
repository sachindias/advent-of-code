using System;
using Day1;
using Day2;

public class Program
{
    public static void Main()
    {
        
        //Day 1
        /*
        var (columnOne, columnTwo) = D1_Tasks.LoadData();
        D1_Tasks.Task1(columnOne, columnTwo);
        D1_Tasks.Task2(columnOne, columnTwo);
        */
        
        //Day 2
        var LineArrays = D2_Tasks.Task1();
        D2_Tasks.Task2(LineArrays);
    }
}