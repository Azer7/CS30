// Arrays, Functions, Objects.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <string>
#include <vector> //a dynamic way of creating arrays

using namespace std; //declares that you are using the standard namespace

bool isOdd(int number) { //the compiler needs to know about the function before it is used
	if (number % 2)
		return true;
	else
		return false;
}

int main()
{
	string name; //don't need to use std:: because of "using namespace std;"
	cout << "What's your name?" << endl << ":"; //same thing here	
	getline(cin, name); //using getline, just in case the user enters multiple words separated by a space (cin >> reads up to a space)

	cout << "Hi, " + name + "!" << endl; //here I can concatenate "Hi, ", name and "!" by using the '+' string overload
										 //"<<" would also work, but it would first output "Hi, ", name, and then "!" to the console (same result)	

	int age;
	cout << "How old are you?" << endl << ":";
	cin >> age;
	if (isOdd(age))
		cout << "Your age is odd!" << endl;
	else
		cout << "Your age is even!" << endl;
	cout << endl;

	string friendArr[3]; //declaring an array with 3 value
	cout << "Name 3 friends!" << endl;
	for (int i = 0; i < 3; i++) {
		while (friendArr[i] == "") //keep inputting until they actually enter something
			getline(cin, friendArr[i]);
	}
	cout << "I like " << friendArr[1] << " the most" << endl << endl;

	vector<string> activityArr;
	string activity;
	cout << "What do you like to do?" << endl;
	getline(cin, activity);
	while (activity != "") {
		activityArr.push_back(activity); //same as .push() in javascript
		getline(cin, activity);
	}
	cout << activityArr.size() << " activities!";

	return 0;
}

