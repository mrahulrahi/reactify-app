#include<stdio.h>
#include<stdarg.h>
double addition(int a,...)
{
	va_list valist;
	double sum = 0.0;
	int i;
	va_start(valist, a);
	for(i=0; i<a; i++)
	{
		sum = sum + va_arg(valist, int);
	}
	va_end(valist);
	return sum/a;
}
void main()
{
	int subject[50], num, i, count = 0;
	double sum = 0;
	system("cls");
	printf("How many subjects are you working with? ");
	scanf("%d",&num);
	system("cls");
	printf("Enter marks obtained in %d subjects, one after the other ",num);
	getch();
	
	for(i=0; i<num; i++)
	{
		scanf("%d", &subject[i]);
		sum = sum + addition(1, subject[i]);
		count++;
		system("cls");
	}
	sum = sum/count;
	
	printf("For the %d subjects that  you entered, the average mark is %f\n", num, sum);
	getch();
	return 0;
}
