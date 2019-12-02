#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>

int main(int argc , char* argv[])
{
	int rc , piping[3][2] , temp = 1;
	char pack_arr[2];
	pipe(piping[0]);
	pipe(piping[1]);
	pipe(piping[2]);
	//char thing[100]= argv[1];
	int a = strcmp(argv[1], "-hw");

	if(a == 0){
		printf("hello world\n");
		return(0);}


	if ((rc = fork()) == -1)
	{
		printf("failed fork\n");
		exit(-1);
	}	

	else if(rc == 0)
	{
		printf("child here pid=%d rc=%d\n" , getpid() , rc);
	}
	else
	{
		printf("parent here pid=%d rc=%d\n" , getpid() , rc); 	
	}

}

