#include<stdio.h>
int main(){
	char name[50];
	char surname[50];
	int maths=0;
	int english=0;
	int science=0;
	printf("Enter name\n");
	scanf("%s",name);
	printf("Enter surname\n");
	scanf("%s",surname);
	printf("Enter English mark\n");
	scanf("%d",&english);
	printf("Enter Maths mark\n");
	scanf("%d",&maths);
	printf("Enter Science mark\n");
	scanf("%d",&science);
	float average=(maths+english+science)/3;
	system("cls");
	printf("Student record\n");
	printf("Student Name:\t\t%s\n",name);
	printf("Student Surname:\t%s\n",surname);
	printf("Average Mark:\t\t%f",average);
}

