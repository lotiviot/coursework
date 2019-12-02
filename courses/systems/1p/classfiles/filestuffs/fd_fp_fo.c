/* for file descriptors */
/* for open */
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
/* for write, close, etc. */
#include <unistd.h>

/* for file pointers */
/* for fopen, fread, etc. */
#include <stdio.h>

/* for file objects */
#include <iostream>
#include <fstream>
using namespace std;

#include <string.h>


int main(int argc, char *argv[])
{
    int i = 32;  /* use 0x12345678 for better demo of little-endian */
    int fd;
    char buf[32];
    FILE *fp;
    ofstream fo;    /* need c++ compiler for this */

    fd = open("tempout_fd", O_CREAT|O_WRONLY|O_TRUNC, S_IRUSR|S_IWRITE|S_IRGRP|S_IROTH );
    write(fd,&i,sizeof(int));
    sprintf(buf,"i=%d\n",i);
    write(fd,buf,strlen(buf));
    close(fd);

    fp = fopen("tempout_fp","w");
    fwrite(&i,1,sizeof(int),fp);
    fprintf(fp,"i=%d\n",i);
    fclose(fp);

    /* The stuff below here will require that I use the c++ compiler */
    /* Here is a blurb from the "Teach Yourself C++" book:
       C++ has no input/output operators as intrinsic or integral parts
       of the language.  Just as C relies on function libraries to extend
       the language with input/output functions, C++ depends on class
       libraries for its input and output.
       ...
       C++ streams are implemented as classes.  The cout and cin objects
       are global instances of those classes which derive from a base class
       named fstream ...
    */
    fo.open("tempout_fo", fstream::out | fstream::trunc);
    fo.write((const char *)&i,sizeof(int));
    fo  <<  "i="  <<  i  <<  endl;
    fo.close();
}
