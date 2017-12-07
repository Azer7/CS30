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
	string getName();

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

	names.push_back(fullName.substr(space)); //adds the last word too
}


string Person::getName() {
	string initials; //creates a string to add to
	if (names.size() > 1) {
		initials.push_back(names[0][0]); //pushes back a character
										 //you cannot use initials += names[0][0] as names[0][0] is a character, not a string
		initials += ". "; //this is a string however
	}
	initials += names[names.size() - 1];
	return(initials); //returns the formed string
}


class Family
{
public:
	vector<Person> members;
	int getTotalAge(); //declares a function

private:

};

int Family::getTotalAge() { //code of function
	int total = 0;
	for (int i = 0; i < members.size(); i++) {
		total += members[i].age; //references the age value of the members at index i
	}
	return total;
}

int main()
{
	string inputName; //initialized to "" automatically
	int inputAge = -1; //initializes to -1, as noone can have a (-) age
	Family family; //creates a new family class
	cout << "Create a Family!" << endl;

	do {
		inputName = "";
		inputAge = -1;
		Person person;
		cout << "What is a person's name my dude?" << endl;
		
		getline(cin, inputName); //get's the line of the player's name
		person.setName(inputName); //calls the setName function, with input as (inputName)

		if (inputName != "") {
			cout << "How about your age?" << endl;
			cin >> inputAge;
			cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); //clears the newline
			person.age = inputAge;

			cout << "Hi " << person.getName() << endl; // calls the object method to get initials which returns a str
			cout << endl;
		}

		if (inputName != "" && inputAge != -1) { //only adds the person if it has valid properties
			family.members.push_back(person);
		}
	} while (inputName != "" || inputAge != -1);  //waits for the user to actually enter something
	//needs to be declared earlier, so that line 95 is defined

	cout << "Quite the family with a total age of " << family.getTotalAge() << "!";


	return 0;
}