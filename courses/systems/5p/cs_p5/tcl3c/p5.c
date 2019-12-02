#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <signal.h>

//int = 2
void do_int();
//usr1 = 10
void do_usr1();
//usr2 = 12
void do_usr2();

int c = 0;

int main(int argc, char * argv[])
{
	alarm(90);
	if(argc == 2)
	{
		if(strcmp(argv[1],"-hw") == 0){
			printf("hello world\n");
			exit(0);
		}
	}
	else
	{
		signal(SIGINT, do_int);
		signal(SIGUSR1, do_usr1);
		signal(SIGUSR2, do_usr2);
		while(1)
			sleep(1);
	}
	exit(0);
}

void do_int()
{
	printf("received SIGINT\n");
}

void do_usr1(){
	printf("received SIGUSR1\n");
	c += 1;
	if(c == 4){
		printf("terminating due to 4 SIGUSR1 signals\n");
		exit(0);
	}
}

void do_usr2(){
	printf("received SIGUSR2");
	exit(0);
}
