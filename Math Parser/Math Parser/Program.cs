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

            MathParse.ParseExpression(input);
            Console.ReadLine();
        }
    }

    public class MathParse
    {
        private enum Operators
        {
            add = 1,
            sub = 1,
            mul = 2,
            div = 2,
            exp = 3
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


        private static long ParseRecurse(int position)
        {
            bool wasNum = false;

            string currentNum = "";
            int lastSignVal = 0;
            int currentSignVal = 0;
            string sign = "";
            long result = 0;

            for (int i = position; i <= expression.Length; i++)
            {
                char currentChar = expression[i];

                if (currentChar >= 48 && currentChar <= 57)
                { //number
                    wasNum = true;
                    currentNum += currentChar;
                }
                else if(wasNum == true)
                { //end of number
                    if (currentChar == 43) {
                        sign = "add";
                    } else if (currentChar == 45) {
                        sign = "sub";
                    } else if (currentChar == 42) {
                        sign = "mul";
                    } else if (currentChar == 47) {
                        sign = "div";
                    }

                    lastSignVal = Operators.valueOf();??
                    wasNum = false;
                    currentNum = "";
                }
            }
            return result;
        }
    }
}