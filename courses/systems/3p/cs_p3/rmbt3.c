// parallel sum where each thread sums into a local variable,
//     which it then copies to a distinct global array element;
// number of elements must be divisible by number of threads

#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define MAXTHREADS 32    

void *sum_local(void *arg);

long psum[MAXTHREADS];
long nelems_per_thread;

double timestamp();

int main(int argc, char **argv) 
{
    //startup
    long i, nelems, log_nelems, nthreads, myid[MAXTHREADS], exp = 0, result = 0;
    double stime, etime;
    pthread_t tid[MAXTHREADS];
	
    //error catch
    if (argc != 4) { 
        printf("Usage: %s <low> <high> <threads>\n", argv[0]);
        exit(-1);
    }
    
    //read-in
    nthreads   = atoi(argv[1]);
    log_nelems = atoi(argv[2]);
    nelems = (1L << log_nelems);
    printf("nelems %ld\n",nelems);
	
    //error catch
    if  ((nelems % nthreads) != 0) {
        printf("error: invalid nelems\n");
        exit(-1);
    }
    nelems_per_thread = nelems / nthreads;

    // use this slower method of computing exp because using
    //     (nelems * (nelems-1))/2)
    // may result in a negative number if nelems is too large for the multiply              ignore
    for (i=0; i < nelems; i++)
        exp += i;
    printf("expect %ld\n",exp);
    if  (exp <= 0) {
        printf("error: nelems too large\n");
        exit(-1);
    }
	
    //timestamp and thread creation
    stime = timestamp();
    for (i = 0; i < nthreads; i++) {
        myid[i] = i;
        pthread_create(&tid[i], NULL, sum_local, &myid[i]);
    }

    //thread join
    for (i = 0; i < nthreads; i++)
        pthread_join(tid[i], NULL);
    
    // array addidtion
    for (i = 0; i < nthreads; i++)
        result += psum[i];
    //final answer check
    etime = timestamp();
	
    //final printout
    printf("result %ld\n",result);
    if (result != exp)
        printf("error: result=%ld\n", result);

    printf("time %6.4f\n",etime-stime);
    exit(0);
}

void *sum_local(void *arg) 
{
    long myid = *((long *)arg);
    long start = myid * nelems_per_thread;
    long end = start + nelems_per_thread;
    long i, sum = 0;

    for (i = start; i < end; i++) {
        sum += i;
    }

    psum[myid] = sum;
    return NULL;
}

