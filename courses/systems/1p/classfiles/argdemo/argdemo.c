#include <stdio.h>

void main(int argc, char *argv[])
{
    int i;

    printf("argc = %d\n",argc);
    for (i=0; i < argc; i++)
    {
        printf("arg %d is :%s:\n",i,argv[i]);
    }
}
