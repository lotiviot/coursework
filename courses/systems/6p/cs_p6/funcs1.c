
//  cc -shared -fPIC -o libfuncs.so funcs.c

int foobar(int arg)
{
    return 42;
}

int baz(int arg)
{
    return arg + 100;
}

int whatever(int arg)
{
    return arg - 100;
}
