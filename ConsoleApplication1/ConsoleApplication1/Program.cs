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

    public class Expression
    {
        public string operation { get; set; }

        public int[] expressionSet { get; set; }

        public Expression(string operation) //constructor
        {
            operation = type;
        }

        public void AddVal(int number, string )
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
            {


                List<Expression> expressions = new List<Expression>();

                //parse expression
                expressions.Add(new Expression("add"));    
                
                expressions[expressions.Count - 1].AddVal("negative")



            }
        }
    }
}


