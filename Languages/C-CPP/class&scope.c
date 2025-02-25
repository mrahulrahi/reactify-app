#include<stdio.h>
void firstFunction(void);
void secondFunction(void);
int firstGlobalVariable = 5;
int main()
{
	printf("\nStorage classes and scope.\n");
	firstGlobalVariable = 10;
	printf("\nThe value of the variable firstGlobalVriable in main() is %d\n", firstGlobalVariable);
	firstFunction();
	printf("\nThe value of the variable firstGlobalVriable in main() is %d\n", firstGlobalVariable);
	secondFunction();
	printf("\nThe value of the variable firstGlobalVriable in main() is %d\n", firstGlobalVariable);
	return 0;
}
int secondGlobalVariable = 15;
void firstFunction(void)
{
	char firstGlobalVariable;
	firstGlobalVariable = 'S';
	secondGlobalVariable = 20;
	printf("\nThe value of the variables in firstFunction() are:\n firstGlobalVariable = %c and secondGlobalVariable = %d\n", firstGlobalVariable, secondGlobalVariable);
}
void secondFunction(void)
{
	double secondGlobalVariable;
	firstGlobalVariable = 25;
	secondGlobalVariable = 5.101520;
	printf("\nThe value of the variables in secondFunction() are:\n firstGlobalVariable = %d and secondGlobalVariable = %.4f\n", firstGlobalVariable, secondGlobalVariable);
}

