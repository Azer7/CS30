using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Math_Parser
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
        private enum Operators
        {
            add = 1,
            subtract = 1,
            multiply = 2
        };

        private static string expression = "";

        public static void ParseExpression(string expr)
        {

            expression = expr.Replace(" ", String.Empty);

            Console.WriteLine("Input: " + expression);

            if (expression.Except("1234567890+-*/()").Any())
                Console.WriteLine("error");
            else
            { //expression is valid, process
                Console.WriteLine("result: " + ParseRecurse(0));                           
            }
        }
        /// <summary>
        /// parses expression from an index
        /// to a operator of higher importance
        /// </summary>
        /// <param name="position"></param>
        /// <returns>value of given expression portion</returns>


        private static int ParseRecurse(int position)
        {
            int result = 0;
            for(int i = position; i <= expression.Length; i++)
            {





            }
            return result;
        }
    }
}