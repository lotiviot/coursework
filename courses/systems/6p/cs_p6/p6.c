#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <unistd.h>
#include <dlfcn.h>


//nm --dynamic libfuncs.so | grep -v _

int main(int argc, char *argv[])
{
	//basic declarations of library and hello world
	alarm(60);
	if(strcmp(argv[1],"-hw") == 0)
		{printf("hello world\n");exit(0);}
	void *library;
	int(*foobar)(int);
	FILE *things;
	char path[100],*pre , *final;

	char command[200] = "/usr/bin/nm --dynamic ";
	strcat(command, argv[1]);
	strcat(command, " | /bin/grep -v _");

	library = dlopen(argv[1],RTLD_LAZY);
	if((library = dlopen(argv[1],RTLD_LAZY)) == NULL)
		{printf("library error\n");exit(0);}
	
	things = popen(command ,"r");
	if (things == NULL)
		{printf("asdf\n");exit(0);}
	int count;
	while(fgets(path,sizeof(path),things) != NULL) 
	{
		count = 0;
		pre = strdup(path);
		while((final = strsep(&pre, " ")) != NULL)
		{
			if(count == 2)
			{	
				//printf("%s %d\n",final,count);
				strtok(final,"\n");
				foobar = dlsym(library,final);
				int check = foobar(42);
				if(check == 42)
				{
					printf("%s  %d  **\n", final, check);
				}
				else
				{
					printf("%s  %d \n", final, check);
				}
			}
			count+=1;		
		}
	}
	pclose(things);
}
