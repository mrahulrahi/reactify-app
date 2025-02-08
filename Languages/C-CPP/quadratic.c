#include<stdio.h>
#include<math.h>
float x1=0,x2=0,d=0;
int a=0,b=0,c=0;
quadratic(){
d=sqrt(b*b-4*a*c);
x1=(-b+d)/(2*a);
x2=(-b-d)/(2*a);
return;
};
input(){
	printf("Quadrtaic equations are equations that can be expressed in the form\n\t\t ax^2+bx+c=0\n\n");
	printf("please enter the value of a\n");
	scanf("%d",&a);
	system("cls");
	printf("please enter the value of b\n");
	scanf("%d",&b);
	system("cls");
	printf("please enter the value of c\n");
	scanf("%d",&c);
	system("cls");
	return;
};
output(){
	system("cls");
	printf("The value of x is %f or %f",x1,x2);
	return;
};
main(){
	input();
	quadratic();
	output();
}


