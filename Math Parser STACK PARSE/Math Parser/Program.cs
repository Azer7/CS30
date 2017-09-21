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
        mul = 5,//multiply
        div = 2,//divide
        exp = 3,//exponent
        sqt = 3//square root
    };

    public class MathParse
    {
        private static string expression = "";

        private static Stack<double> ValueStack = new Stack<double>();
        private static Stack<Operators> OperatorStack = new Stack<Operators>();        

        public static void ParseExpression(string expr)
        {

            expression = expr.Replace(" ", String.Empty);
            expression += (char)0;

            Console.WriteLine("Input: " + expression);

            if (expression.Except("1234567890+-*/()\0").Any())
                Console.WriteLine("error");
            else
            { //expression is valid, proceed
                Console.WriteLine("result: " + StackParse());
            }
        }
        
        /// <summary>
        /// parses expression and generates a stack;
        /// when it hits a operator of lower value it processes back
        /// </summary>
        /// <param name="position"></param>
        /// <returns>value of given expression portion</returns>

        private static double StackParse()
        {            
            bool wasNum = false;            
            string currentNumStr = "";
            int lastSignVal = 0;
            int currentSignVal = -99; //no sign yet
            Operators sign = Operators.NUL;
            double result = 0;

            for (int i = 0; i < expression.Length; i++)
            {
                char currentChar = expression[i];

                if ((currentChar >= 48 && currentChar <= 57) || currentChar == 46)
                { //number
                    wasNum = true;
                    currentNumStr += currentChar;
                }
                else if (wasNum == true)
                { //end of number
                    ValueStack.Push(double.Parse(currentNumStr, System.Globalization.CultureInfo.InvariantCulture));

                    sign = Operators.NUL;
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
                    //add to stack

                    if(currentSignVal < lastSignVal)
                    {
                        //process stack

                    }
                    else
                    {
                        // add to stack
                        OperatorStack.Push(sign);


                    }
                    


                    wasNum = false;
                    currentNumStr = "";                    
                    lastSignVal = currentSignVal;
                }
            }
            return result;
        }
    }
}