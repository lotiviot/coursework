#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<fcntl.h>
#define LINESIZE 1024
int main()
{
    int pid;
    FILE *data;
    int fd;
    char line[LINESIZE];
    data = fopen("IN1","r");
    
    //the file is opened in the mother process then the fork is created

    switch(pid=fork())
    {
        case -1:
            perror("fork()");
            exit(1);
            break;
	//the program dupes 
        case 0:
            fd = open("IN1",O_WRONLY);
            dup2(fd,1); //output redirection from stdout to results.txt
            execl("/usr/bin/sort",".","a.txt\0",NULL);
            break;
        default:
            sleep(3);
            while(fgets(line,sizeof(line),data) != NULL)
            {
                printf("%s",line);
            }
            printf("arrived at parent");
            break;
    }
    return 0;
}
