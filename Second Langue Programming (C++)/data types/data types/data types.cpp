// Data Types, Loops, Scope.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream> //a library for interacting with the console stream
#include <string>//a library to include a non-basic string type

int main()
{
	int a = -1; // this declares a signed 'integer' with 32 bits. meaning it can store values from -2147483648 to 2147483647 (the first bit is used for storing the sign)
	signed int sInt = 1000; // this declares and unsigned int. can store numbers from 0 to 4294967295

	int rInt = 32.2; // turns into 32, as ints cannot store decimals

	unsigned short sh = 30000; // same as an int, but only uses 16 bits +-32768 (unsigned: 0 to 65536)

	long long lo = 0; // declares a signed number with 64 bits. can store +-9.223372e+18~

	float fl = 23423.7234f; // 32 bit floating point value, storing decimal numbers in 32 bits: 1 sign bit, 8 exponent bits and 23 fraction bits +- 3.4*10^38~

	double db = 23423.7234; // 64 bit double precision value, storing decimal numbers in 32 bits: 1 sign bit, 1 exponent bits and 52 fraction bits
							//+- 1.8*10^308~ (this is the number format that javascript uses)


	char ch = 'A'; // characters are 1 byte and store character representations as numbers based on the ASCII standard
	char chLower = ch + 32; //you are able to add characters with numbers, as characters are represented as numbers in memory.
							//since the ASCII value for 'A' is 65, when you add 32 to it, it becomes 97 ('a')

	char castCh = 65; //all this is doing is setting the bits to 65
	char binaryCh = 0b00111011; //by adding a 0b prefix, you can tell the compiler to treat the number as base 2, not base 10
								//similarily a 0x prefix represent a hexadecimal number, 0 for octal

	bool b = 1; //a boolean 1 bit representation of either a true or false value: 0 or 1

	std::string word = ""; //std:: defines the namespace (standard namespace) which groups types, function, etc to prevent name collisions (an example of scope in c++)
						   //you can specify the namespace by going "using namespace std;" at the top of your program
	std::cin >> word; //input from the stream (console) >> is an overload, which is taking in input from the console and inputting it into word
	if (word == "hi")  //if statement same as javascript
	{ //for functions, loops etc braces are put on the next line in c++ usually (does not affect anything)
		int localScope = 0;
		std::cout << "Hi!" << std::endl; //endl is and end of line character or '\n'
	}
	else
	{
		std::cout << "Bye!" << "you entered" + word << std::endl;
	}



	//std::cout << localScope;
	// this would be undefined and out of scope

	for (int i = 0; i < 3; i++)  //you must declare i as an int, otherwise it will be undefinied
	{
		std::cout << "for iteration: " << i << std::endl;
	}

	std::cout << '\n'; //new line character
					   //the previous int i had gone out of scope
	int i = 5;
	std::cout << "while iteration: ";
	while (i > 0) {
		std::cout << i << " ";
		i--;
	}


	return 0; //a c++ standard to have the main function return an integer; a 0 if there are no errors
}

