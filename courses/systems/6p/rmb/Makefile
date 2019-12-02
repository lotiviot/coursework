CC = gcc
CFLAGS = -Wall -Og

PROGS = prog\
	prog2c\
	prog2l\
	prog2r\

# Do nothing
all: $(PROGS)

# example program 1 
prog: main.o sum.o
	$(CC) $(CFLAGS) -o prog main.o sum.o

# Static library linked at compile time
prog2c: main2.o addvec.o multvec.o
	## $(CC) $(CFLAGS) -c main2.c addvec.c multvec.c
	ar rcs libvector.a addvec.o multvec.o
	$(CC) $(CFLAGS) -static -o prog2c main2.o libvector.a
	$(CC) $(CFLAGS) -static -o prog2c main2.o -L. -lvector

# Shared library linked at load-time
prog2l: main2.o libvector.so
	$(CC) $(CFLAGS) -o prog2l main2.o ./libvector.so

# Shared library linked at run time
prog2r: dll.c
	$(CC) $(CFLAGS) -rdynamic -o prog2r dll.c -ldl
sillydll: sillydll.c
	$(CC) $(CFLAGS) -rdynamic -o sillydll sillydll.c -ldl

libvector.so: addvec.c multvec.c	
	$(CC) $(CFLAGS) -shared -fpic -o libvector.so addvec.c multvec.c

clean:
	rm -f $(PROGS) *.o *~ *.d *.so *.a *.s





