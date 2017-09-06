using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            string input = "";
            while (input == "")
                input = Console.ReadLine();


            Parser.ParseExpression(input);
            Console.ReadLine();
        }
    }

    public class Parser
    {
        public static void ParseExpression(string expression)
        {
            Console.WriteLine("Input: " + expression);            

            Regex

            if (expression.Except("1234567890+-*/^").Any())
                Console.WriteLine("error");
            else
            { //parser program
                List<int> valueArray = new List<int>();
    
                
                


            }
        }
    }
}
