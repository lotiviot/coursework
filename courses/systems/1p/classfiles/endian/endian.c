#include <stdio.h>

void main(int argc,char *argv[])
{
    union
    {
	int i;
	char c[4];
    } u;

    printf("SZS %d %d %d\n", sizeof(int), sizeof(long int), sizeof(int*));
    u.i=0x12345678;
    printf("%x \n",u.i);
    printf("%x %x %x %x \n",u.c[0],u.c[1],u.c[2],u.c[3]);
    printf("%p %p %p %p \n",&u.c[0],&u.c[1],&u.c[2],&u.c[3]);
    if (u.c[0] == 0x12)
	printf("big endian\n");
    if (u.c[0] == 0x78)
	printf("little endian\n");
}
