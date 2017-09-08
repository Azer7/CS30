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

    public class Summand
    {
        public List<int> factorList = new List<int>();
        public string type { get; set; } // add mult expo


        public Summand(int factor) //constructor
        {
            factorList.Add(factor);
        }

        public void AddVal(int number, string sign)
        {

        }
    }

    public class Parser
    {
        public static void ParseExpression(string expression)
        {

            expression = expression.Replace(" ", String.Empty);

            Console.WriteLine("Input: " + expression);

            if (expression.Except("1234567890+-*/^").Any())
                Console.WriteLine("error");
            else
            { //expression is valid, process
                int currentSummand = 0;
                string currentSign = "none";
     

                List<Summand> summands = new List<Summand>();

                //parse, on sign change


            }
        }
    }
}


