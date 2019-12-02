#include <stdio.h>
#include <sys/mman.h>
#include <string.h>
#include <errno.h>
#include <sys/types.h>
#include <unistd.h>
void heap_init(int num_pages_for_heap);
void * heap_alloc(int num_bytes_to_allocate);
void * heap_free(void * pointer_to_area_to_free);

void *region;
long int num_bytes[2][1024] = {0} , size = 0 , region_bounds[2];

void heap_init(int num_pages_for_heap)
{
	int n = num_pages_for_heap;
	int pgsz = getpagesize();
	region = mmap(NULL , pgsz*num_pages_for_heap, PROT_READ|PROT_WRITE, MAP_ANONYMOUS|MAP_PRIVATE , -1 , 0);
	region_bounds[0] = (long int)region;
	region_bounds[1] = (long int)region + (long int)pgsz * (long int)n;
	

}

void * heap_alloc(int num_bytes_to_allocate)
{
	int b = num_bytes_to_allocate , i = 0, ok = 1, count = 0;
	void *temp=region;
	void *temp_end  = temp;
	temp_end = (long int) temp_end + b;
	while((long int)temp_end < region_bounds[1])
	{
		if((long int)temp % 16 == 0)
		{
			i = 0 , ok = 1;
			if(num_bytes[0][0] == 0)
			{
				num_bytes[0][0] = (long int) temp;
				num_bytes[1][0] = (long int) temp_end;
				return temp;
			}
			while(num_bytes[1][i] != 0)
			{
				if(((long int) temp_end >= num_bytes[0][i] && (long int) temp_end <= num_bytes[1][i]) ||
				   ((long int) temp >= num_bytes[0][i] && (long int) temp <= num_bytes[1][i]) ||
				   ((long int) temp >= num_bytes[0][i] && (long int) temp_end <= num_bytes[1][i]) ||
				   ((long int) temp <= num_bytes[0][i] && (long int) temp_end >= num_bytes[1][i]))
				{	
					ok = 0;
				}
				i++;
			}
			if(ok == 1){  
				num_bytes[0][i] = (long int) temp;
				num_bytes[1][i] = (long int) temp_end;
				return temp;
			}	
		}
		(long int)temp++;
		(long int)temp_end++;
		count++;
	}
	return NULL;
}

void * heap_free(void *pointer_to_area_to_free)
{
	void * p = pointer_to_area_to_free;
	return NULL;
}


