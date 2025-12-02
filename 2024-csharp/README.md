# Advent of Code 2024 - C #

C# solutions for Advent of Code 2024 using .NET 8.0.

## Quick Start

```bash
cd 2024-csharp
dotnet run
```

## Setup

Make sure you have .NET 8.0 SDK installed. You can download it from [dotnet.microsoft.com](https://dotnet.microsoft.com/download).

## Running Solutions

Build the project:

```bash
dotnet build
```

Run the solutions:

```bash
dotnet run
```

## Project Structure

```
2024-csharp/
├── advent-of-code-dotnet.sln          # Solution file
└── advent-of-code-2024/
    ├── advent-of-code-2024.csproj     # Project file
    ├── Program.cs                      # Main entry point
    ├── ReadFiles.cs                    # File reading utilities
    ├── Day1/
    │   ├── Day1.cs
    │   └── input.txt
    ├── Day2/
    │   ├── Day2.cs
    │   └── input.txt
    └── ...
```

## Adding a New Day

1. Create a new folder: `DayN/`
2. Add your solution class: `DayN/DayN.cs`
3. Add your input file: `DayN/input.txt`
4. Add the namespace in `Program.cs`
5. Call your solution method in `Program.cs`

## Editing Program.cs

The `Program.cs` file contains commented-out calls to each day's solutions. Uncomment the day you want to run:

```csharp
// Day 1
D1_Tasks.Task1(columnOne, columnTwo);
D1_Tasks.Task2(columnOne, columnTwo);
```
