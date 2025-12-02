public class ReadFiles
{
    public static string[] ReadFile(int day, string filename)
    {
        string[] lines =
            File.ReadAllLines(
                $"C:/Users/dias01s/SafeDownloads/repos/advent-of-code-dotnet/advent-of-code-2024/Day{day.ToString()}/{filename}.txt");
        
        return lines;
    }
}