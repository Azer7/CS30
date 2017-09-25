using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Math_Parser
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                string input = "";
                while (input == "")
                    input = Console.ReadLine();

                Tuple<double, bool> answer = MathParser.ParseExpression(input);

                if (answer.Item2)
                {
                    Console.Write("a" + MathParser.Answers.Count + ": ");
                    Console.WriteLine(Math.Round(answer.Item1, 5) + "\n");
                }
                else
                    Console.WriteLine("try again" + "\n");
            }
        }
    }

    public enum Operators
    {
        NUL,
        neg,//negative
        brL,
        brR,
        add,//add
        sub,//subtract
        mul,//multiply
        div,//divide
        exp,//exponent
        sqt//square root
    };

    public class MathParser
    {
        private static string expression = "";
        public static List<double> Answers = new List<double>();

        public static Tuple<double, bool> ParseExpression(string expr)
        {

            expression = expr.Replace(" ", String.Empty);

            bool error = false;
            if (expression.Except("a.1234567890+-*/^()").Any())
            {
                Console.WriteLine("error: invalid character(s)");
                error = true;
            }

            if (expression[0] == 42 || expression[0] == 43 || expression[0] == 47 || expression[0] == 94)
            {
                Console.WriteLine("error: starts with operator");
                error = true;
            }

            if (expression[expression.Length - 1] == 42 || expression[expression.Length - 1] == 43 || expression[expression.Length - 1] == 45 || expression[expression.Length - 1] == 47 || expression[expression.Length - 1] == 94)
            {
                Console.WriteLine("error: ends with operator");
                error = true;
            }

            int nLeft = 0;
            bool bracketsCorrect = true;

            bool a = false;
            bool b = false;
            bool c = false;
            bool d = false;
            for (int i = 0; i < expression.Length; i++)
            {

                //if(expression[i] == a non (-) operator && expression[i - 1] == an operator )

                if (i > 0)
                {
                    if (((expression[i] <= 44 || expression[i] == 47 || expression[i] == 94) && expression[i] != 40) && ((expression[i - 1] <= 45 || expression[i - 1] == 47 || expression[i - 1] == 94) && expression[i] != 41))
                    {
                        if (!a)
                            Console.WriteLine("error: incorrectly placed operators");
                        error = true;
                        a = true;
                    }

                    if (((expression[i] >= 48 && expression[i] <= 57) || expression[i] == 46) && expression[i - 1] == 41)
                    {
                        if (!b)
                            Console.WriteLine("error: right bracket -> number is invalid");
                        error = true;
                        b = true;
                    }

                    if (expression[i] == 41 && expression[i - 1] == 40)
                    {
                        if (!c)
                            Console.WriteLine("error: empty bracket");
                        error = true;
                        c = true;
                    }
                }

                if (i > 1)
                {
                    if ((expression[i] == 45 ? 2 : 0) + (expression[i] == 42 || expression[i] == 43 || expression[i] == 47 ? 1 : 0) +
                        (expression[i - 1] == 45 ? 2 : 0) + (expression[i - 1] == 42 || expression[i - 1] == 43 || expression[i - 1] == 47 ? 1 : 0) +
                        (expression[i - 2] == 45 ? 2 : 0) + (expression[i - 2] == 42 || expression[i - 2] == 43 || expression[i - 2] == 47 ? 1 : 0) > 4)
                    {
                        if (!d)
                            Console.WriteLine("error: too many operators");
                        error = true;
                        d = true;
                    }
                }

                if (expression[i] == 40)
                    nLeft++;
                else if (expression[i] == 41)
                {
                    if (nLeft > 0)
                        nLeft--;
                    else
                        bracketsCorrect = false;
                }
            }

            if (!bracketsCorrect)
            {
                Console.WriteLine("error: bracket mismatch");
                error = true;
            }

            if (!error)
            {
                //expression is valid, proceed
                double result = StackParse();
                Answers.Add(result);
                return new Tuple<double, bool>(result, true);
            }
            else
                return new Tuple<double, bool>(-1, false);
        }

        /// <summary>
        /// parses expression and generates a stack;
        /// when it hits a operator of lower value it processes back
        /// </summary>
        /// <param name="position"></param>
        /// <returns>value of given expression portion</returns>

        private static double StackParse()
        {
            Stack<double> ValueStack = new Stack<double>();
            Stack<Operators> OperatorStack = new Stack<Operators>();

            bool wasVal = false;
            bool wasBracket = false;
            string currentNumStr = "";
            int lastSignVal = 0;
            int currentSignVal = 0; //no sign yet
            Operators sign = Operators.NUL;

            for (int i = 0; i <= expression.Length; i++)
            {
                char currentChar = '\0';
                if (i < expression.Length)
                    currentChar = expression[i];

                if ((currentChar >= 48 && currentChar <= 57) || currentChar == 46 || currentChar == 97)
                { //number 
                    currentNumStr += currentChar;
                    wasVal = true;
                }
                else//number end, operator
                {
                    if (wasVal)
                    {
                        if (currentNumStr[0] == 97)
                        {
                            int index = int.Parse(currentNumStr.Substring(1, currentNumStr.Length - 1)) - 1;
                            if (Regex.IsMatch(currentNumStr, @"[A-z][0-9]{1,}") && Answers.Count >= index + 1)
                                ValueStack.Push(Answers[index]);
                            else
                                ValueStack.Push(0);
                        }
                        else
                            ValueStack.Push(double.Parse(currentNumStr, System.Globalization.CultureInfo.InvariantCulture));
                    }


                    currentNumStr = "";

                    sign = CharToOperator(currentChar); //operator add,sub,mul,div ...

                    if (sign == Operators.brL)
                    {
                        if (wasVal || wasBracket)
                        {
                            sign = Operators.mul;
                            i--;
                        }
                        else
                            lastSignVal = 0;
                    }
                    else if (!wasVal && sign == Operators.sub)
                    {
                        sign = Operators.neg;
                        OperatorStack.Push(Operators.neg);
                        continue;
                    }

                    currentSignVal = OperatorValue(sign);
                    if (currentSignVal < lastSignVal) //process stack before you add the new operator
                    {
                        //process stack 
                        while (OperatorStack.Count > 0)
                        {
                            if (currentSignVal < OperatorValue(OperatorStack.Peek()))
                                if (OperatorStack.Peek() == Operators.neg)
                                {
                                    OperatorStack.Pop();
                                    ValueStack.Push(-1 * ValueStack.Pop());
                                }
                                else
                                    ValueStack.Push(Calculate(ValueStack.Pop(), OperatorStack.Pop(), ValueStack.Pop()));
                            else
                                break;
                        }
                    }

                    if (sign == Operators.brR)
                    {
                        wasBracket = true;
                        while (OperatorStack.Count > 0)
                        {
                            if (OperatorStack.Peek() == Operators.brL)
                            {
                                OperatorStack.Pop();
                                if (OperatorStack.Count > 0)
                                    lastSignVal = OperatorValue(OperatorStack.Peek());
                                break;
                            }
                            else
                            {
                                if (OperatorStack.Peek() == Operators.neg)
                                {
                                    OperatorStack.Pop();
                                    ValueStack.Push(-1 * ValueStack.Pop());
                                }
                                else
                                    ValueStack.Push(Calculate(ValueStack.Pop(), OperatorStack.Pop(), ValueStack.Pop()));
                            }
                        }
                    }
                    else
                    {
                        wasBracket = false;
                        //add to stack
                        OperatorStack.Push(sign);
                        lastSignVal = currentSignVal;
                    }
                    wasVal = false;
                }
            }
            return ValueStack.Peek();
        }

        private static Operators CharToOperator(char charVal)
        {
            switch ((int)charVal)
            {
                case 40: return Operators.brL;
                case 41: return Operators.brR;
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
                case Operators.NUL: return -100;
                case Operators.brL: return 0;
                case Operators.brR: return 99; //greater than everything else, so that it doesn't force a full process
                case Operators.neg: return 5;
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