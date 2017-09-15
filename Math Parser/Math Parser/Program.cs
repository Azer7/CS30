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

    public class Summand
    {
        private List<double> factorList = new List<double>();
        private string type = "addition"; // add mult expo


        public Summand(string OperatorType) //constructor
        {
            type = OperatorType;                       
        }

        public void AddVal(int factor)
        {
            factorList.Add(factor);
        }
    }

    public class Parser
    {
        private static string expression = "";


        public static void ParseExpression(string expr)
        {

            expression = expr.Replace(" ", String.Empty);

            Console.WriteLine("Input: " + expression);

            if (expression.Except("1234567890+-*/()").Any())
                Console.WriteLine("error");
            else
            { //expression is valid, process

                List<Summand> summands = new List<Summand>();

                //parse

                ///use a parser for each summand has a number of factors
                ///if it runs into a bracket, it adds a pointer to a new summand as a factor
                ///
                ///every time it moves to a new 'level' it adds the pointer to the summand
                ///onto a stack, so when has found the end it can backtrack to the correct
                ///array and index
                /// - this may also be done with a pointer / reference to the correct index
                ///of the proper array as the first item in the array
                /// 
                ///when it finishes going to the lowest bracket level it can parse that expression
                ///and pop the summand off from the summand stack and then go to the previous summand
                ///in the stack, setting/replacing the current index to the value just gotten from solving
                ///the lowest layer.
                ///                

                bool wasSign = false;

                for (int i = 0; i < expression.Length; i++)
                {
                    if (expression[i] <= 47 || expression[i] >= 58)
                    {
                        if (wasSign == true || i == expression.Length - 1)
                        {
                            Console.WriteLine("error");
                            break;
                        } 
                        else
                            wasSign = true;
                    }
                    else
                        wasSign = false;

                }

                for (int i = 0; i < expression.Length; i++)
                {
                    if (i > 0)
                    {
                        if (expression[i] == (char)40 && expression[i - 1] >= 48 && expression[i - 1] <= 57)
                        {
                            expression = expression.Insert(i, "*"); //works?
                        }
                    }
                }

                string parsingNumber = "";
                bool wasNum = false;
                                

                Console.WriteLine("Final Input: " + expression);

                for (int i = 0; i < expression.Length; i++)
                {
                    ParseChar(expression[i], ref parsingNumber, ref wasNum);
                }
                ParseChar(expression[expression.Length - 1], ref parsingNumber, ref wasNum);
            }
        }

        private static void ParseChar(char currentChar, ref string parsingNumber, ref bool wasNum)
        {
            //currentChar has no spaces, 1-9, +-*/, ()


            if (currentChar >= 48 && currentChar <= 57) //NUMBER
            {
                parsingNumber += currentChar;

                wasNum = true;
            }
            else if (wasNum == true) //WAS A NUMBER BUT NOW ISN't
            {
                wasNum = false;
                Console.WriteLine(parsingNumber);
                
                if(currentChar == 40) //BRACKET
                {

                }
                else //MATH SIGN
                {

                }            

                Console.ReadLine();
                parsingNumber = "";
            }

        }
    }
}