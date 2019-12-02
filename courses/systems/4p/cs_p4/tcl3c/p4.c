#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(int argc , char* argv[])
{
	alarm(60);
	printf("%d\n",argc);
	int rc , pipe_stdin[2] , pipe_stdout[2] , pipe_stderr[2] , status; char file_in[3];
	strcpy(file_in , argv[1]);

	if(argc > 2){
		char args[argc -1][15];
		for(int i = 2 ; i < argc ; i++)
		{
			strcpy(args[i - 2], argv[i]);
		}
	}
	pipe(pipe_stdin);pipe(pipe_stdout);pipe(pipe_stderr);
	//exception handling
	if(argc == 1)
		{printf("wrong usage\n");exit(-1);}
	if(argc == 2)
	{int a = strcmp(argv[1], "-hw");
		if(a == 0){
		printf("hello world\n");return(0);}
		else
		{int d =1;}}
	if ((rc = fork()) == -1)
	{printf("failed fork\n");exit(-1);}	

	//----------------------------------child---------------------------------------
	else if(rc == 0)
	{
		//read in arguments from the pipe to execve
		alarm(60);
		close(pipe_stdin[1]);
		close(pipe_stdout[0]);
		close(pipe_stderr[0]);
		if(argc > 2){
			char child_args[argc - 2][15];
			for (int i = 2 ; i < argc ; i++)
			{
				read(pipe_stdin[0], child_args[i-2],15);
			}
			
		}
		char file_in[50];
		strcpy(file_in, argv[1]);
		printf("%s\n",file_in);
		//where execve goes
		//execve("usr/bin/sort" , , "LC_ALL=C");
		
		//write-back to the parent process
		

		exit(0);
	}

	//-------------------------------parent----------------------------------------------
	else
	{
		//write out to child process
		alarm(60);
		close(pipe_stdin[0]);
		close(pipe_stdout[1]);
		close(pipe_stderr[1]);
		if(argc > 2)
		{
			for(int i = 2 ; i < argc ;i++)
			{
				write(pipe_stdin[1], argv[i], 15);
			}
		}
		//wait for return
		//wait(&status);
		
		//read in from the file
		
		//final print out

		exit(0);
	}
}

