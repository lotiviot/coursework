#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <time.h>
#include <sys/time.h>
#include <stdlib.h>
#include <pthread.h>

#define MAXTHREADS 5

void *sub(void *arg);

long prefinal[MAXTHREADS], section[2][MAXTHREADS];
pthread_mutex_t mutex; 

double time1();

int main(int argc, char *argv[])
{
	//hello world portion
	alarm(90);
	long final = 0 , length = 0 , nelems_per_thread = 0;
	int c = argc;
	double stime , etime;
	if(c <= 2){printf("hello world\n");return 0;}
	//hello world portion
	
	//read in of arguments
	long low = atol(argv[1]);
	long high = atol(argv[2]);
	int threads = atoi(argv[3]);
	
	//creation of of the pthread information and the id as well
	pthread_t tid[MAXTHREADS];
	long myid[MAXTHREADS];

	// length of section full // portion section // and pthread init
	length = high - low; 
	nelems_per_thread = length / threads;
	pthread_mutex_init(&mutex, NULL);
	
	//section id creation
	long temp = 0;
	for(int i = 0 ; i < threads ; i++)
	{
		myid[i] = i;
		section[0][i] = temp;
		temp = temp + nelems_per_thread;
		temp -= 1;
		section[1][i] = temp;
		temp+=1;
		if(i+1 == threads)
		{
			section[1][i] = temp;
		}
	}
	
	//mutex creation
	//time function and timestamp goes hera
	stime=time1();
	for(int i = 0 ; i < threads ; i++)
	{
		pthread_create(&tid[i], NULL, sub, &myid[i]);
	}
	
	//mutex join
	for(int i = 0; i < threads ; i++)
		pthread_join(tid[i],NULL);
	
	//final add
	for (int i = 0 ; i < threads; i++)
		final+=prefinal[i];
	etime=time1();
	//eind timestamp here
	//final print
	for(int i = 0 ; i < threads ; i++)
		printf("THREAD %d: %ld\n" , i , prefinal[i]);
	printf("TOTAL %ld\n" , final);
	printf("TIME %6.4f\n" , etime - stime);
	return -1;
}

void *sub(void * arg)
{
	
	long myid = *((long*) arg);
	long start = section[0][myid];
	long end = section[1][myid];
	long i , temp = 0;
	for(i = start; i <= end ; i++)
	{
		if(i%97==0)
			temp+=1;
	}
	prefinal[myid] = temp;
	return NULL;

}


double time1()
{
	struct timeval tv;

	gettimeofday( &tv, (struct timezone *) 0);
	return( (double) (tv.tv_sec + (tv.tv_usec / 1000000.0)) );

}
