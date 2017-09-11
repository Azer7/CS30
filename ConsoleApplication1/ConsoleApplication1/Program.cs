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
        public string type = "addition"; // add mult expo


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

            if (expression.Except("1234567890+-").Any())
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
                string parsingNumber = "";


                bool wasNum = false;


                for (int i = 0; i < expression.Length; i++)
                {
                    char currentChar = expression[i]; //no spaces, 1-9, +-


                    if (wasNum == true)
                    {
                        if (currentChar >= 48 && currentChar <= 57) //number
                        {
                            parsingNumber += currentChar;
                        }
                        else
                        {
                            wasNum = false;
                        }
                    }



                }

            }
        }
    }
}


