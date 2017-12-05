// Classes, Objects.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Person
{
public:
	Person();
	vector<string> names;
	int age;
	void setName(std::string);
	string getInitials();

private:
};

Person::Person()
{
	age = 0;
}

void Person::setName(string fullName) {
	int space = 0;

	for (int i = 0; i < fullName.length(); i++) { //loops through the fullName and cuts out the name at every space
		if (fullName[i] == ' ') {
			names.push_back(fullName.substr(space, i - space));
			space = i + 1;
		}
	}
	names.push_back(fullName.substr(space));
}


string Person::getInitials() {
	string initials;
	initials.push_back(names[0][0]); //pushes back a character
									 //you cannot use initials += names[0][0] as names[0][0] is a character, not a string
	initials += ". "; //this is a string however
	initials.push_back(names[names.size() - 1][0]); //not this
	initials += "."; //this!
	return(initials); //returns the formed string
}


class Family
{
public:
	Family();

private:

};

Family::Family()
{
}

Family::~Family()
{
}

int main()
{
	Person person;
	string inputName = "";
	while (inputName == "") { //waits for the user to actually enter something
		getline(cin, inputName); //gets the entire line
	}
	person.setName(inputName); //calls the setName function, with input as (inputName)

	person.getInitials(); // calls the object method to get initials which returns a str
	int delay;
	cin >> delay;
	return 0;
}