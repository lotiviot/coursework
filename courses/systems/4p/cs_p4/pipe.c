#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>



int main(int argc, char **argv)
{
	int pipefd[2];
	int pid;

	char *cat_args[] = {"cat", "scores", NULL};
	char *grep_args[] = {"grep", "Villanova", NULL};

		  // make a pipe (fds go in pipefd[0] and pipefd[1])
		  
	pipe(pipefd);
	pid = fork();
		  //
	if (pid == 0){
		dup2(pipefd[0], 0);
		close(pipefd[1]);
		execvp("grep", grep_args);
	}
	else{
		dup2(pipefd[1], 1);
		close(pipefd[0]);
		execvp("cat", cat_args); 
	}  
}
