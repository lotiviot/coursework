// parallel sum where each thread sums into a global variable
//     protected by a mutex;
// number of elements must be divisible by number of threads

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define MAXTHREADS 32    

void *sum_mutex(void *arg);

long gsum = 0;
long nelems_per_thread;
pthread_mutex_t mutex;

int main(int argc, char **argv) 
{
    //initialization 
    long i, nelems, log_nelems, nthreads, myid[MAXTHREADS];
    pthread_t tid[MAXTHREADS];

    if (argc != 3) { 
        printf("usage: %s <nthreads> <log_nelems>\n", argv[0]);
        exit(-1);
    }
//initialization of vars into thread count and full log of elements
    nthreads = atoi(argv[1]);
    log_nelems = atoi(argv[2]);
    nelems = (1L << log_nelems);

    if  ((nelems % nthreads) != 0 || (log_nelems > 31)) {
        printf("error: invalid nelems\n");
        exit(-1);
    }
//number of element per thread to be used in the subroutine
    nelems_per_thread = nelems / nthreads;
    pthread_mutex_init(&mutex, NULL);

    //method for thread creation as well as seperate calls for each thread
    for (i = 0; i < nthreads; i++) {
        myid[i] = i;
        pthread_create(&tid[i], NULL, sum_mutex, &myid[i]);
    }
	
    //method that rejoins all the threads 
    for (i = 0; i < nthreads; i++)
        pthread_join(tid[i], NULL);
    
    //error
    if (gsum != (nelems * (nelems-1))/2)
        printf("error: result=%ld\n", gsum);

    exit(0);
}

//
void *sum_mutex(void *arg) 
{
    long myid = *((long *)arg);//the argument passed in is the thread id for that subroutine
    long start = myid * nelems_per_thread;//this is the beginning of the iterations
    long end = start + nelems_per_thread;//this is the end of the iteration
    long i;//then the i for iteration is set
	
    //forloop that iterates through the assigned length until done we also do not have to return anything
    for (i = start; i < end; i++) {
        pthread_mutex_lock(&mutex);
        gsum += i;
        pthread_mutex_unlock(&mutex);
    }
    return NULL;
}
