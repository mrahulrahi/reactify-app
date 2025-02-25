#include<stdio.h>
int Fibonacci(int limit)
{
	if(limit==0){
		return 0;
		}
	else{
		if(limit==1){
		return 1;
		}
		else{
			return(Fibonacci(limit-1)+ Fibonacci(limit-2));
		}
	}
};
int main()
{
	int limit,i=0,c;
	scanf("%d",&limit);
	printf("Fibonacci series\n");
	for(c=1; c<=limit; c++)
	{
	printf("\t%d\n",Fibonacci(i));
	i++;
	}
	return 0;
}
