#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(int argc , char* argv[])
{
	alarm(60);
	int rc , pipe_1[2] , pipe_2[2] , status;
	char * env[] ={"LC_ALL=C",NULL};
	char * grep[] = {"/bin/grep", "-v", "foobar","IN1" ,NULL};

	if(argc > 2){
		char args[argc -1][15];
		for(int i = 2 ; i < argc ; i++)
		{
			strcpy(args[i - 2], argv[i]);
		}
	}

	pipe(pipe_1);pipe(pipe_2);
	
	//exception handling
	char * test [1024]; 	
	if(argc == 2){
		int a = strcmp(argv[1], "-hw");
		if(a == 0){
			printf("hello world\n");return(0);}
		else{
			char *test[] = {"/usr/bin/sort" , NULL};}
		}
	else if(argc == 3){
		char *test[] = {"/usr/bin/sort" , argv[2]  , NULL};
	}
	else if(argc == 4){
		char *test[] = {"/usr/bin/sort" , argv[2] , argv[3]  , NULL};}
	if ((rc = fork()) == -1)
	{printf("failed fork\n");exit(-1);}	


	//----------------------------------child---------------------------------------
	else if(rc == 0)
	{
		alarm(60);
		close(pipe_1[1]);
		dup2(pipe_1[0], 0);
		execve("/usr/bin/sort" , test , env);
		exit(0);
	}

	//-------------------------------parent----------------------------------------------
	else
	{
		alarm(60);
		close(pipe_1[0]);
		dup2(pipe_1[1], 1);
		execve(grep[0],grep,NULL);
		wait(&status);
	}
}

