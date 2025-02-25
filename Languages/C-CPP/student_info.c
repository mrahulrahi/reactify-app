#include<stdio.h>
typedef struct _student{
	char name[50];
	unsigned int mark;
} student;
void print_list(student list[], int size);
void read_list(student list[], int size);

void main(){
	const int size = 10;
	student list[size];
	read_list(list,size);
	system("cls");
	print_list(list,size);
}
void read_list(student list[], int size){
int i = size;	
printf("Please enter the students' details':\n");
for(i = 0; i < size;i++){
	printf("\nStudent name:");
	scanf("%s",&list[i].name);
	
	printf("\nAverage mark:");
	scanf("%u",&list[i].mark);
}
}
void print_list(student list[], int size){
	int i = size;
	printf("Students' information:\n");
	for(i = 0; i < size;i++){
		printf("\nName: %s \tAverage mark: %u",list[i].name,list[i].mark);
	}
}
