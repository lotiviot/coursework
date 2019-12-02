//inclusions to run the progrma properly
#include <stdlib.h>
#include <stdio.h>



//main function declaration
int main(int argc, char *argv[])
{
	//primary variable declarations
	//	buf1 and buf2 arrays will contain information from files
	//	fp and fp2 pointers will be the objects that access the files
	//		then read in that information into buf1 and buf2 arrays 
	//		respectively
	char buf1[100];
	char buf2[100];
	FILE *fp , *fp2;
	int count;
	//condition if argument count is less than or equal to 2, we will print hello world and exit
	if(argc <= 2)
	{
		printf("hello world\n");
	}
	
	//else if there are 3 arguments exactly, the file call, and the 2 .txt files
	else if(argc == 3)
	{
		
		//file open for the .txt files in question
		fp = fopen(argv[1], "r");
		fp2 = fopen(argv[2], "r");
		int same = 1;
		//exception if one of the files DNE in the directory
		if(fp == NULL || fp2 == NULL)
		{
			perror("null file\n");
			exit(EXIT_FAILURE);
		}
		
		//practice read into buffer
		buf1[0] = fgetc(fp);
		buf2[0] = fgetc(fp2);
		while(buf1[count] != EOF && buf2[count] != EOF)
		{
			if(buf1[count] != buf2[count] && buf1[count] != '\n' && buf2[count] != '\n') 
			{
				same = 0;
				printf("%d : 0x%c 0x%c\n", count, buf1[count], buf2[count]);
				printf("hello\n");
				break;
			};
			
			count++;
			buf1[count] = fgetc(fp);
			buf2[count] = fgetc(fp2);

		}
		if(buf1[count] == EOF && buf2[count] == EOF && same == 1)
		{
			printf("SAME\n");
		}
		else if(buf1[count] == EOF)
		{	
			printf("%d : EOF 0x%x\n",count ,buf2[count]);
		}
		else if(buf2[count] == EOF)
		{
			printf("%d : 0x%x EOF",count , buf1[count]); 
		}
		
		//print model as to how we will display the location and hex conversions of the character in question

		fclose(fp);
		fclose(fp2);
		return 0;
	}
}
