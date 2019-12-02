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
//heap free will do the following
//if the 
void * heap_free(void *pointer_to_area_to_free)
{
	void * p = pointer_to_area_to_free;
	long int temp[2] , tempo, temp_arr[2][1024];
	int i=0,h=0,curr=0;
	int a = 0 , b = 0;
      		
	while(num_bytes[0][i] != 0)
	{
		if(num_bytes[0][i] == (long int) p)
		{temp[0] = num_bytes[0][i] ,temp[1] == num_bytes[1][i] , b = i;}
		i++;	
	}
	tempo = temp[1] - temp[0];

	num_bytes[0][b] = 0 , num_bytes[1][b] = 0;
	for(int g = 1 ; g < 1024 ; g++)
	{
		curr = g;
		for(int h = g -1 ; h >= 0 ; h-- , curr--)
		{
			if(num_bytes[0][h] < num_bytes[0][curr])
			{
				temp[0] = num_bytes[0][curr] , temp[1] = num_bytes[1][curr];
				num_bytes[0][curr] = num_bytes[0][h] , num_bytes[1][curr] = num_bytes[1][h];
				num_bytes[0][h] = temp[0] , num_bytes[1][h] = temp[1];
			}
		}
	}


	return NULL;
}




