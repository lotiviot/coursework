/* $begin dll */
#include <stdio.h>
#include <stdlib.h>
#include <dlfcn.h>

int x[2] = {1, 2};
int y[2] = {3, 4};
int z[2];

int main(int argc, char *argv[]) 
{
    void *handle;
    char *error; 
    void (*whatever)(int *, int *, int *, int);

    /* Dynamically load the shared library that contains addvec() */
    handle = dlopen("./libvector.so", RTLD_LAZY);
    if (!handle) {
	fprintf(stderr, "%s\n", dlerror());
	exit(1);
    }

    /* Get a pointer to the addvec() function we just loaded */
    whatever = dlsym(handle, argv[1]);
    if ((error = dlerror()) != NULL) {
	fprintf(stderr, "%s\n", error);
	exit(1);
    }

    /* Now we can call addvec() just like any other function */
    whatever(x, y, z, 2);
    printf("z = [%d %d]\n", z[0], z[1]);

    /* Unload the shared library */
    if (dlclose(handle) < 0) {
	fprintf(stderr, "%s\n", dlerror());
	exit(1);
    }
    return 0;
}
/* $end dll */

