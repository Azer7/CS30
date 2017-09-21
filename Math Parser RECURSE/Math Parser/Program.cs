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

    public enum Operators
    {
        NUL = -99,
        add = 1,//add
        sub = 1,//subtract
        mul = 2,//multiply
        div = 2,//divide
        exp = 3,//exponent
        sqt = 3//square root
    };

    public class MathParse
    {

        private static string expression = "";

        public static void ParseExpression(string expr)
        {

            expression = expr.Replace(" ", String.Empty);

            Console.WriteLine("Input: " + expression);

            if (expression.Except("1234567890+-*/()").Any())
                Console.WriteLine("error");
            else
            { //expression is valid, proceed
                Console.WriteLine("result: " + ParseRecurse(0));
            }
        }
        /// <summary>
        /// parses expression from an index
        /// to a operator of higher importance
        /// </summary>
        /// <param name="position"></param>
        /// <returns>value of given expression portion</returns>


        private static double ParseRecurse(int position)
        {
            bool parsing = true; //as soon as you call ParseRecurse again, do 'parsing = false;'

            bool wasNum = false;
            bool hasOperated = false;
            string currentNum = "";
            int lastSignVal = 0;
            int currentSignVal = -1; //no sign yet
            Operators sign = Operators.NUL;
            double result = 0;

            for (int i = position; i <= expression.Length; i++)
            {
                char currentChar = expression[i];

                if (currentChar >= 48 && currentChar <= 57)
                { //number
                    wasNum = true;
                    currentNum += currentChar;
                }
                else if (wasNum == true)
                { //end of number

                    if (currentChar == 43)
                        sign = Operators.add;
                    else if (currentChar == 45)
                        sign = Operators.sub;
                    else if (currentChar == 42)
                        sign = Operators.mul;
                    else if (currentChar == 47)
                        sign = Operators.div;
                    else if (currentChar == 94)
                        sign = Operators.exp;

                    currentSignVal = (int)sign;

                    if (hasOperated == false)
                    {
                        hasOperated = true;
                        if (sign == Operators.add || sign == Operators.sub)
                        {
                            result = 0;
                        }
                        else if (sign == Operators.mul || sign == Operators.div)
                        {
                            result = 1;
                        }
                    }



                    wasNum = false;
                    currentNum = "";
                    position = i + 1; //start of number for recursion
                    lastSignVal = currentSignVal;
                }
            }
            return result;
        }
    }
}