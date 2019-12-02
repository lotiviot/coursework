#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void heap_init(int num_pages_for_heap);
void *heap_alloc(int num_bytes_to_allocate);
void heap_free(void *pointer_to_area_to_free);  // not used in this test

int main(int argc, char *argv[])
{
    char *p1, *p2, *p3, *p4, *p5, *p6;

    if (argc > 1  &&  strcmp(argv[1],"-hw") == 0)
    {
        printf("hello world\n");
        exit(0);
    }

    heap_init(2);

    p1 = (char *) heap_alloc(2000);
    printf("check\n");
    if ((long int)p1 % 16 != 0)
    {
        printf("p1 bad %p  pmod16 %ld\n",p1,((long int)p1)%16);
        exit(-1);
    }
    memset(p1,'X',2000);

    p2 = (char *) heap_alloc(2000);
    if ((long int)p2 % 16 != 0)
    {
        printf("p2 bad %p  pmod16 %ld\n",p2,((long int)p2)%16);
        exit(-1);
    }
    memset(p2,'X',2000);

    heap_free( (void *)p2 );

    printf("DONE\n");

    return 0;
}
