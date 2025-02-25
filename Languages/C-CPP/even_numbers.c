#include<stdio.h>
int array[10];
int ArrayIndex=0;
int result=0;
int evenNumbers(){
	while(ArrayIndex<10){
		result=array[ArrayIndex]%2;
		if(result==1){
			array[ArrayIndex]=0;
		};
		ArrayIndex++;
	};
};
int main(){
	result=0;
	while(ArrayIndex<10){
		printf("Enter Number\n");
		scanf("%d",&array[ArrayIndex]);
		ArrayIndex++;
	};
	ArrayIndex=0;
	evenNumbers();
	ArrayIndex=0;
	while(ArrayIndex<10){
		if(array[ArrayIndex]>0){
			printf("%d\t",array[ArrayIndex]);
		};
		ArrayIndex++;
	};
	return 0;
};
