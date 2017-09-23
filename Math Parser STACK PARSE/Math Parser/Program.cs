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
        NUL,
        add,//add
        sub,//subtract
        mul,//multiply
        div,//divide
        exp,//exponent
        sqt//square root
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

            if (expression.Except("1234567890+-*/^()\0").Any())
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

                    sign = CharToOperator(currentChar); //operator add,sub,mul,div ...

                    currentSignVal = OperatorValue(sign);

                    if (currentSignVal < lastSignVal) //process stack before you add the new operator
                    {
                        //process stack 
                        for (long j = 0; OperatorStack.Count > 0; j++)
                        {
                            if (currentSignVal < OperatorValue(OperatorStack.Peek()))
                                ValueStack.Push(Calculate(ValueStack.Pop(), OperatorStack.Pop(), ValueStack.Pop()));
                            else
                                break;
                        }
                    }

                    //add to stack
                    OperatorStack.Push(sign);

                    wasNum = false;
                    currentNumStr = "";
                    lastSignVal = currentSignVal;
                }
            }
            return ValueStack.Pop();
        }

        private static Operators CharToOperator(char charVal)
        {
            switch ((int)charVal)
            {
                case 43: return Operators.add;
                case 45: return Operators.sub;
                case 42: return Operators.mul;
                case 47: return Operators.div;
                case 94: return Operators.exp;
                default: return Operators.NUL;
            }
        }

        private static int OperatorValue(Operators oper)
        {
            switch (oper)
            {
                case Operators.add: return 1;
                case Operators.sub: return 1;
                case Operators.mul: return 2;
                case Operators.div: return 2;
                case Operators.exp: return 3;
                case Operators.sqt: return 3;
                default: return 0;
            }
        }

        private static double Calculate(double val2, Operators oper, double val1)
        {
            double result = 0;
            switch (oper)
            {
                case Operators.add: return val1 + val2;
                case Operators.sub: return val1 - val2;
                case Operators.mul: return val1 * val2;
                case Operators.div: return val1 / val2;
                case Operators.exp: return Math.Pow(val1, val2);
            }

            return result;
        }
    }
}