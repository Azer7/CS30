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
	void getInitials();

private:
};

Person::Person()
{
	age = 0;
}

void Person::setName(string fullName) {
	int space = 0;

	for (int i = 0; i < fullName.length(); i++) {
		if (fullName[i] == ' ') {
			names.push_back(fullName.substr(space, i));
			space = i;
		}
	}
}

int main()
{
	Person person;
	person.setName("Billy Bob Forest");
	int delay;
	cin >> delay;

    return 0;
}