#include<stdio.h>
#include<math.h>
float x1=0,x2=0,d=0,e=0,f=0;
int i=0,n=0,s=0,a=0,b=0,c=0;
quadratic(){
e=sqrt(d);
x1=(-b+e)/(2*a);
x2=(-b-e)/(2*a);
return;
};
discriminant(){
	d=b*b-4*a*c;
	n=d;
	f=sqrt((double)n);
	i=f;
	if(d>0&&i!=f){
		s=1;
	};
	if(d==0){
		s=2;
	};
	if(d<0){
		s=3;
	};
	if(d>0&&i==f){
		s=4;
	};
	switch(s){
		case 1:
			system("cls");
			printf("roots are real, unequal and might be irrational\n");
			output();
			break;
		case 2:
			system("cls");
			printf("roots are real and equal\n");
			output();
			break;
		case 3:
			system("cls");
			printf("roots are imaginary\n");
			output();
			break;
		case 4:
			system("cls");
			printf("roots are real, unequal and rational\n");
			output();
			break;
		default:
			system("cls");
			printf("Something's not right on the equation, please review it.'\n");
			break;
	};
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
	printf("The value of x is %f or %f",x1,x2);
	return;
};
main(){
	input();
	quadratic();
	discriminant();
	return 0;
}


