#include<stdio.h>
#include<stdlib.h>
int compareIntegers(const void *a, const void *b)
{
	const int *x = a;
	const int *y = b;
	return *x - *y;
}
main(){
	int list[] = {103,549,22,699,1029,9,45,653,22,541,990,149,269,399};
	int numberOfElements = sizeof(list) / sizeof(int);
	int i = numberOfElements;
	printf("Unsorted list: \n");
	for(i = 0; i < numberOfElements; i++)
	printf("%d ", *(list + i));
	qsort(list, numberOfElements, sizeof(int), compareIntegers);
	printf("\n\nSorted list: \n");
	for(i = 0; i < numberOfElements; i++)
	printf("%d ", *(list + i));
}
